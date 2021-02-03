"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_model_1 = require("./users.model");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const util_service_1 = require("../utils/util.service");
const app_model_1 = require("../utils/app.model");
const multer_1 = require("@nestjs/platform-express/multer");
const upload_service_1 = require("../utils/upload.service");
const auth_service_1 = require("../utils/auth.service");
const email_service_1 = require("../utils/email.service");
const jwt_strategy_1 = require("../utils/jwt.strategy");
const otp_service_1 = require("../utils/otp.service");
const order_service_1 = require("../order/order.service");
let UserController = class UserController {
    constructor(userService, authService, utilService, emailService, uploadService, otpService, orderService) {
        this.userService = userService;
        this.authService = authService;
        this.utilService = utilService;
        this.emailService = emailService;
        this.uploadService = uploadService;
        this.otpService = otpService;
        this.orderService = orderService;
    }
    async registerNewUser(userData) {
        try {
            const mobileNumber = this.utilService.convertToNumber(userData.mobileNumber);
            if (mobileNumber == 0)
                this.utilService.badRequest(app_model_1.ResponseMessage.REQUIRED_VALID_MOBILE_NUMBER);
            const checkUser = await this.userService.findUserByEmailOrMobile(userData.email, userData.mobileNumber);
            if (checkUser && checkUser.email == userData.email)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_ALREADY_EXIST);
            if (checkUser && checkUser.mobileNumber == userData.mobileNumber)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_MOBILE_ALREADY_EXIST);
            userData.role = app_model_1.UserRoles.USER;
            const user = await this.userService.createUser(userData);
            if (user) {
                const emailRes = await this.emailService.sendEmailForVerification(user.firstName, user.email, user.emailVerificationId);
                if (emailRes)
                    return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_EMAIL_VERIFY_SENT);
                else
                    this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_VERIFY_NOT_SENT);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async validateUser(credential) {
        try {
            const user = await this.userService.getUserByEmail(credential.email);
            if (!user)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_NOT_FOUND);
            if (!user.status)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_ACCOUNT_BLOCKED);
            if (!user.emailVerified)
                return this.utilService.resetContentResponseMsg(app_model_1.ResponseMessage.USER_EMAIL_NOT_VERIFIED);
            const isValid = await this.authService.verifyPassword(credential.password, user.password);
            if (!isValid)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_OR_PASSWORD_INVALID);
            await this.userService.updatePlayerId(user._id, credential.playerId);
            const token = await this.authService.generateAccessToken(user._id, user.role);
            return this.utilService.successResponseData({ token: token, role: user.role, id: user._id, language: user.language, isSuperAdmin: user.isSuperAdmin });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async forgotPassword(emailData) {
        try {
            const checkEmail = await this.userService.getUserByEmail(emailData.email);
            if (!checkEmail)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_INVALID);
            const otp = Math.floor(9000 * Math.random()) + 1000;
            const user = await this.userService.updateOTP(checkEmail._id, otp);
            const emailRes = await this.emailService.sendEmailForForgotPassword(user.firstName, user.email, otp);
            if (emailRes)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_FORGOT_PASSWORD_OTP_SENT_EMAIL);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_FORGOT_PASSWORD_OTP_NOT_SENT_EMAIL);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async resendVerifyUserEmail(email) {
        try {
            const user = await this.userService.getUserByEmail(email);
            if (!user)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_NOT_FOUND);
            const resend = await this.userService.regenerateVerificationCode(user._id);
            if (resend) {
                const emailRes = await this.emailService.sendEmailForVerification(user.firstName, user.email, resend.emailVerificationId);
                if (emailRes)
                    return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_EMAIL_VERIFY_SENT);
                else
                    this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_VERIFY_NOT_SENT);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async verifyUserEmail(verificationId, email, res) {
        try {
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                const message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.USER_EMAIL_NOT_FOUND);
                return res.send(message);
            }
            if (user.emailVerified) {
                const message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.USER_EMAIL_VERIFIED_ALREADY);
                return res.send(message);
            }
            if (user.emailVerificationId !== verificationId) {
                const message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.USER_EMAIL_VERIFICATION_CODE_INVALID);
                return res.send(message);
            }
            const currentTime = (new Date()).getTime();
            if (currentTime > user.emailVerificationExpiry) {
                const message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.USER_EMAIL_VERIFY_EXPIRED);
                return res.send(message);
            }
            const isVerified = await this.userService.setEmailVerified(user._id);
            if (isVerified) {
                const message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.USER_EMAIL_VERIFIED_SUCCESSFULLY);
                return res.send(message);
            }
            else {
                const message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
                return res.send(message);
            }
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async verifyOtpEmail(otp, email) {
        try {
            const user = await this.userService.getUserByEmail(email);
            if (!user)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_NOT_FOUND);
            if (user.otp != otp)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_FORGOT_PASSWORD_OTP_INVALID);
            const currentTime = (new Date()).getTime();
            if (currentTime > user.otpVerificationExpiry)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_FORGOT_PASSWORD_OTP_EXPIRED);
            const otpVerificationId = await this.utilService.getUUID();
            const isVerified = await this.userService.setOTPVerification(user._id, otpVerificationId);
            const message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.USER_FORGOT_PASSWORD_OTP_VERIFIED);
            if (isVerified)
                return this.utilService.successResponseData({ verificationToken: otpVerificationId, message: message });
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async resetPassword(passwordData) {
        try {
            const user = await this.userService.getUserByEmail(passwordData.email);
            if (!user)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_NOT_FOUND);
            if (user.otpVerificationId !== passwordData.verificationToken)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_RESET_PASSWORD_INVALID_TOKEN);
            const { salt, hashedPassword } = await this.authService.hashPassword(passwordData.newPassword);
            const newPaswword = await this.userService.updatePassword(user._id, salt, hashedPassword);
            if (newPaswword)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_PASSWORD_CHANGED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async changePassword(user, passwordData) {
        try {
            const userInfo = await this.userService.getUserById(user._id);
            const isPasswordMatch = await this.authService.verifyPassword(passwordData.currentPassword, userInfo.password);
            if (!isPasswordMatch)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_CURRENT_PASSWORD_INCORRECT);
            const { salt, hashedPassword } = await this.authService.hashPassword(passwordData.newPassword);
            const newPaswword = await this.userService.updatePassword(user._id, salt, hashedPassword);
            if (newPaswword)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_PASSWORD_CHANGED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async GetUserInfo(user) {
        try {
            const me = await this.userService.getUserInfo(user._id);
            if (me) {
                me['walletAmount'] = me['walletAmount'] || 0;
                return this.utilService.successResponseData(me);
            }
            else
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_PROFILE_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateProfile(user, userInfo) {
        try {
            if (userInfo.email && userInfo.email !== user.email) {
                let user = await this.userService.getUserByEmail(userInfo.email);
                if (user)
                    this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_ALREADY_EXIST);
            }
            if (userInfo.mobileNumber) {
                userInfo.mobileNumber = user.mobileNumber;
            }
            const response = await this.userService.updateMyInfo(user._id, userInfo);
            if (response)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_PROFILE_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async logout(user) {
        try {
            const response = await this.userService.updateMyInfo(user._id, { playerId: null });
            if (response)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_LOGOUT);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAllUserList(user, adminQuery) {
        this.utilService.validateAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const users = await Promise.all([
                this.userService.getAllUser(pagination.page - 1, pagination.limit, pagination.q),
                this.userService.countAllUser(pagination.q)
            ]);
            return this.utilService.successResponseData(users[0], { total: users[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateUserStatus(user, userId, userStatusData) {
        this.utilService.validateAdminRole(user);
        try {
            const userExist = await this.userService.getUserById(userId);
            if (!userExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_NOT_FOUND);
            const userStatus = await this.userService.updateUserStatus(userId, userStatusData);
            if (userStatus)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_STATUS_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async createDeliveryBoy(user, userData) {
        this.utilService.validateAdminRole(user);
        try {
            const mobileNumber = this.utilService.convertToNumber(userData.mobileNumber);
            if (mobileNumber == 0)
                this.utilService.badRequest(app_model_1.ResponseMessage.REQUIRED_VALID_MOBILE_NUMBER);
            const checkUser = await this.userService.findUserByEmailOrMobile(userData.email, userData.mobileNumber);
            if (checkUser && checkUser.email == userData.email)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_ALREADY_EXIST);
            if (checkUser && checkUser.mobileNumber == userData.mobileNumber)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_MOBILE_ALREADY_EXIST);
            userData.role = app_model_1.UserRoles.DELIVERY_BOY;
            userData.emailVerified = true;
            userData['mobileNumberVerified'] = true;
            const user = await this.userService.createUser(userData);
            if (user) {
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.DELIVERY_BOY_CREATED_SUCCESSFULLY);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAllDeliveryBoy(user, adminQuery) {
        this.utilService.validateAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const users = await Promise.all([
                this.userService.getAllDeliveryBoy(pagination.page - 1, pagination.limit, pagination.q),
                this.userService.countAllDeliveryBoy(pagination.q)
            ]);
            return this.utilService.successResponseData(users[0], { total: users[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateDeliveryBoyStatus(user, deliveryBoyId, userStatusData) {
        this.utilService.validateAdminRole(user);
        try {
            const userExist = await this.userService.getUserById(deliveryBoyId);
            if (!userExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_NOT_FOUND);
            const userStatus = await this.userService.updateUserStatus(deliveryBoyId, userStatusData);
            if (userStatus)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.DELIVERY_BOY_STATUS_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateLanguage(user, updateData) {
        this.utilService.validateUserRole(user);
        try {
            const resData = await this.userService.updateMyLanguage(user._id, updateData.language);
            if (resData)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_LANGUAGE_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async userImageUpload(user, file, image) {
        try {
            const uploadedImage = await this.uploadService.uploadImage(file, image.type);
            if (uploadedImage.url)
                return this.utilService.successResponseData(uploadedImage);
            this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteImage(user) {
        try {
            const userInfo = await this.userService.getUserInfo(user._id);
            const deleteImage = await this.uploadService.deleteImage(userInfo.imageId);
            if (deleteImage) {
                let removeImageDetail = { imageUrl: null, imageId: null, filePath: null };
                const UpdatedUseer = await this.userService.updateMyInfo(user._id, removeImageDetail);
                if (UpdatedUseer)
                    return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_PROFILE_IMAGE_DELETED);
                else
                    this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async registerMobileNumber(userData) {
        try {
            const mobileNum = this.utilService.convertToNumber(userData.mobileNumber);
            if (mobileNum == 0)
                this.utilService.badRequest(app_model_1.ResponseMessage.REQUIRED_VALID_MOBILE_NUMBER);
            if (userData.email) {
                const isEmail = await this.userService.getUserByEmail(userData.email);
                if (isEmail)
                    this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_ALREADY_EXIST);
            }
            const checkUser = await this.userService.findUserByMobile(userData.mobileNumber);
            if (checkUser && checkUser.mobileNumber == userData.mobileNumber)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_MOBILE_ALREADY_EXIST);
            userData.role = app_model_1.UserRoles.USER;
            const randomNumber = (Math.floor(900000 * Math.random()) + 100000).toString();
            userData.otp = randomNumber;
            const user = await this.userService.createUser(userData);
            let mobileNumber = user.countryCode ? user.countryCode + user.mobileNumber : process.env.COUNTRY_CODE + user.mobileNumber;
            if (user) {
                if (process.env.USE_SENDINBLUE_OTP === 'true') {
                    let isSent = await this.otpService.sendOTP(mobileNumber, userData.otp.toString());
                    if (isSent.isError == true)
                        this.utilService.badRequest(app_model_1.ResponseMessage.UNABLE_TO_SEND_OTP);
                    else
                        return this.utilService.successResponseMsg(app_model_1.ResponseMessage.VERIFICATION_SENT_TO_MOBILE_NUMBER);
                }
                else {
                    let isSent = await this.otpService.sendOTP(mobileNumber);
                    if (isSent.isError == true)
                        this.utilService.badRequest(app_model_1.ResponseMessage.UNABLE_TO_SEND_OTP);
                    else {
                        let message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.VERIFICATION_SENT_TO_MOBILE_NUMBER);
                        return this.utilService.successResponseData(message, { sId: isSent.data });
                    }
                }
            }
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async verifyOTPTwilio(otpData) {
        try {
            if (process.env.USE_SENDINBLUE_OTP === 'true') {
                var criteria = (otpData.mobileNumber.indexOf('@') === -1) ? { mobileNumber: otpData.mobileNumber } : { email: otpData.mobileNumber };
                if (Number(criteria.mobileNumber) == 0)
                    this.utilService.badRequest(app_model_1.ResponseMessage.REQUIRED_VALID_MOBILE_NUMBER);
                let user;
                if (criteria.mobileNumber)
                    user = await this.userService.findUserByMobile(criteria.mobileNumber);
                else
                    user = await this.userService.getUserByEmail(criteria.email);
                if (!user)
                    this.utilService.badRequest(app_model_1.ResponseMessage.USER_NOT_FOUND);
                if (user.otp.toString() == otpData.otp) {
                    const otpVerified = await this.userService.setMobileVerified(user.mobileNumber);
                    const otpVerificationId = await this.utilService.getUUID();
                    const isVerified = await this.userService.setOTPVerification(otpVerified._id, otpVerificationId);
                    if (otpVerified && isVerified) {
                        let message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.MOBILE_NUMBER_SUCCESSFULLY_VERIFIED);
                        return this.utilService.successResponseData(message, { verificationToken: otpVerificationId });
                    }
                }
                else
                    this.utilService.badRequest(app_model_1.ResponseMessage.WRONG_OTP);
            }
            else {
                let verified = await this.otpService.verifyOTP(otpData.otp, otpData.sId);
                if (verified.isError == true)
                    this.utilService.badRequest(app_model_1.ResponseMessage.WRONG_OTP);
                var criteria = (otpData.mobileNumber.indexOf('@') === -1) ? { mobileNumber: otpData.mobileNumber } : { email: otpData.mobileNumber };
                if (Number(criteria.mobileNumber) == 0)
                    this.utilService.badRequest(app_model_1.ResponseMessage.REQUIRED_VALID_MOBILE_NUMBER);
                let user;
                if (criteria.mobileNumber)
                    user = await this.userService.findUserByMobile(criteria.mobileNumber);
                else
                    user = await this.userService.getUserByEmail(criteria.email);
                if (!user)
                    this.utilService.badRequest(app_model_1.ResponseMessage.USER_NOT_FOUND);
                let userVerified = await this.userService.setMobileVerified(user.mobileNumber);
                const userForToken = await this.userService.findUserByMobile(user.mobileNumber);
                const otpVerificationId = await this.utilService.getUUID();
                const isVerified = await this.userService.setOTPVerification(userForToken._id, otpVerificationId);
                if (userVerified && isVerified) {
                    let message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.MOBILE_NUMBER_SUCCESSFULLY_VERIFIED);
                    return this.utilService.successResponseData(message, { verificationToken: otpVerificationId });
                }
            }
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async sendOTPTwilio(credentials) {
        try {
            var criteria = (credentials.mobileNumber.indexOf('@') === -1) ? { mobileNumber: credentials.mobileNumber } : { email: credentials.mobileNumber };
            if (Number(criteria.mobileNumber) == 0)
                this.utilService.badRequest(app_model_1.ResponseMessage.REQUIRED_VALID_MOBILE_NUMBER);
            let user;
            if (criteria.mobileNumber)
                user = await this.userService.findUserByMobile(criteria.mobileNumber);
            else
                user = await this.userService.getUserByEmail(criteria.email);
            if (!user)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_NOT_FOUND);
            let mobileNumber = user.countryCode ? user.countryCode + user.mobileNumber : process.env.COUNTRY_CODE + user.mobileNumber;
            if (process.env.USE_SENDINBLUE_OTP === 'true') {
                const randomNumber = (Math.floor(900000 * Math.random()) + 100000).toString();
                user.otp = randomNumber;
                const updateOtp = await this.userService.setMobileOTP(user.mobileNumber, user.otp.toString());
                let isSent = await this.otpService.sendOTP(mobileNumber, user.otp.toString());
                if (isSent.isError == true)
                    this.utilService.badRequest(app_model_1.ResponseMessage.UNABLE_TO_SEND_OTP);
                else
                    return this.utilService.successResponseMsg(app_model_1.ResponseMessage.OTP_SENT_TO_REGISTERED_MOBILE_NUMBER);
            }
            else {
                let isSent = await this.otpService.sendOTP(mobileNumber, user.otp.toString());
                if (isSent.isError == true)
                    this.utilService.badRequest(app_model_1.ResponseMessage.UNABLE_TO_SEND_OTP);
                else {
                    let message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.OTP_SENT_TO_REGISTERED_MOBILE_NUMBER);
                    return this.utilService.successResponseData(message, { sId: isSent.data });
                }
            }
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async loginPhone(credentials) {
        try {
            var criteria = (credentials.userName.indexOf('@') === -1) ? { mobileNumber: credentials.userName } : { email: credentials.userName };
            if (Number(criteria.mobileNumber) == 0)
                this.utilService.badRequest(app_model_1.ResponseMessage.REQUIRED_VALID_MOBILE_NUMBER);
            let user;
            if (criteria.mobileNumber)
                user = await this.userService.findUserByMobile(criteria.mobileNumber);
            else
                user = await this.userService.getUserByEmail(criteria.email);
            if (!user)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_NOT_FOUND);
            if (!user.mobileNumberVerified)
                return this.utilService.resetContentResponseMsg(app_model_1.ResponseMessage.MOBILE_NUMBER_NOT_VERIFIED);
            if (!user.status)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_ACCOUNT_BLOCKED);
            const isValid = await this.authService.verifyPassword(credentials.password, user.password);
            if (!isValid)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_PASSWORD_INVALID);
            await this.userService.updatePlayerId(user._id, credentials.playerId);
            const token = await this.authService.generateAccessToken(user._id, user.role);
            return this.utilService.successResponseData({ token: token, role: user.role, id: user._id, language: user.language, isSuperAdmin: user.isSuperAdmin });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async resetPasswordNumber(passwordData) {
        try {
            const number = this.utilService.convertToNumber(passwordData.mobileNumber);
            if (number == 0)
                this.utilService.badRequest(app_model_1.ResponseMessage.REQUIRED_VALID_MOBILE_NUMBER);
            const user = await this.userService.findUserByMobile(passwordData.mobileNumber);
            if (!user)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_NOT_FOUND);
            if (user.otpVerificationId !== passwordData.verificationToken)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_RESET_PASSWORD_INVALID_TOKEN);
            const { salt, hashedPassword } = await this.authService.hashPassword(passwordData.newPassword);
            const newPaswword = await this.userService.updatePassword(user._id, salt, hashedPassword);
            if (newPaswword)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_PASSWORD_CHANGED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateMobileVerify(user, userInfo) {
        try {
            if (userInfo.mobileNumber) {
                const mobileNumber = this.utilService.convertToNumber(userInfo.mobileNumber);
                if (mobileNumber == 0)
                    this.utilService.badRequest(app_model_1.ResponseMessage.REQUIRED_VALID_MOBILE_NUMBER);
                if (user.mobileNumber != userInfo.mobileNumber) {
                    const checkUser = await this.userService.findUserByMobile(userInfo.mobileNumber);
                    if (checkUser)
                        this.utilService.badRequest(app_model_1.ResponseMessage.USER_MOBILE_ALREADY_EXIST);
                }
                else {
                    this.utilService.badRequest(app_model_1.ResponseMessage.USER_MOBILE_SAME);
                }
            }
            const randomNumber = (Math.floor(900000 * Math.random()) + 100000).toString();
            user.otp = randomNumber;
            user.newMobileNumber = userInfo.mobileNumber;
            let mobileNumber = user.countryCode ? user.countryCode + user.newMobileNumber : process.env.COUNTRY_CODE + user.newMobileNumber;
            const updateOtp = await this.userService.setMobileOTP(user.mobileNumber, user.otp.toString(), user.newMobileNumber);
            if (process.env.USE_SENDINBLUE_OTP === 'true') {
                let isSent = await this.otpService.sendOTP(mobileNumber, user.otp.toString());
                if (isSent.isError == true)
                    this.utilService.badRequest(app_model_1.ResponseMessage.UNABLE_TO_SEND_OTP);
                else
                    return this.utilService.successResponseMsg(app_model_1.ResponseMessage.OTP_SENT_TO_NEW_MOBILE_NUMBER);
            }
            else {
                let isSent = await this.otpService.sendOTP(mobileNumber, user.otp.toString());
                if (isSent.isError == true)
                    this.utilService.badRequest(app_model_1.ResponseMessage.UNABLE_TO_SEND_OTP);
                else {
                    let message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.OTP_SENT_TO_NEW_MOBILE_NUMBER);
                    return this.utilService.successResponseData(message, { sId: isSent.data });
                }
            }
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateMobile(user, otpData) {
        try {
            if (process.env.USE_SENDINBLUE_OTP === 'true') {
                if (user.otp.toString() !== otpData.otp)
                    this.utilService.badRequest(app_model_1.ResponseMessage.WRONG_OTP);
            }
            else {
                let verified = await this.otpService.verifyOTP(otpData.otp, otpData.sId);
                if (verified.isError == true)
                    this.utilService.badRequest(app_model_1.ResponseMessage.WRONG_OTP);
            }
            const updatedData = await this.userService.updateMobileNumber(user._id, user.newMobileNumber);
            if (updatedData)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.MOBILE_NUMBER_UPDATED_SUCCESSFULLY);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async registerNewAdmin(user, userData) {
        this.utilService.validateSuperAdminRole(user);
        try {
            const mobileNum = this.utilService.convertToNumber(userData.mobileNumber);
            if (mobileNum == 0)
                this.utilService.badRequest(app_model_1.ResponseMessage.REQUIRED_VALID_MOBILE_NUMBER);
            if (userData.email) {
                const isEmail = await this.userService.getUserByEmail(userData.email);
                if (isEmail)
                    this.utilService.badRequest(app_model_1.ResponseMessage.USER_EMAIL_ALREADY_EXIST);
            }
            const checkUser = await this.userService.findUserByMobile(userData.mobileNumber);
            if (checkUser && checkUser.mobileNumber == userData.mobileNumber)
                this.utilService.badRequest(app_model_1.ResponseMessage.USER_MOBILE_ALREADY_EXIST);
            userData.role = app_model_1.UserRoles.ADMIN;
            userData.emailVerified = true;
            userData.mobileNumberVerified = true;
            const user = await this.userService.createUser(userData);
            if (user)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.ADMIN_CREATED);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteAdmin(user, userId) {
        this.utilService.validateSuperAdminRole(user);
        try {
            const userExist = await this.userService.getUserById(userId);
            if (!userExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.ADMIN_NOT_FOUND);
            if (userExist.role !== app_model_1.UserRoles.ADMIN)
                this.utilService.badRequest(app_model_1.ResponseMessage.ADMIN_ROLE_MUST);
            const user = await this.userService.deleteUserById(userId);
            if (user)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.ADMIN_DELETED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateAdminStatus(user, userId, userStatusData) {
        this.utilService.validateSuperAdminRole(user);
        try {
            const userExist = await this.userService.getUserById(userId);
            if (!userExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.ADMIN_NOT_FOUND);
            if (userExist.role !== app_model_1.UserRoles.ADMIN)
                this.utilService.badRequest(app_model_1.ResponseMessage.ADMIN_ROLE_MUST);
            const userStatus = await this.userService.updateUserStatus(userId, userStatusData);
            if (userStatus)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.ADMIN_STATUS_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAllAdminList(user, adminQuery) {
        this.utilService.validateSuperAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const admins = await Promise.all([
                this.userService.getAllAdmin(pagination.page - 1, pagination.limit, pagination.q),
                this.userService.countAllAdmin(pagination.q)
            ]);
            return this.utilService.successResponseData(admins[0], { total: admins[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteUser(user, userId) {
        this.utilService.validateAdminRole(user);
        try {
            const userExist = await this.userService.getUserById(userId);
            if (!userExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.ADMIN_NOT_FOUND);
            const checkOrderToUser = await this.orderService.getAllOrderForUser(userExist._id, null, null);
            if (checkOrderToUser.length > 0)
                this.utilService.badRequest(app_model_1.ResponseMessage.CANT_DELETED_THIS_USER);
            const user = await this.userService.deleteUserById(userId);
            if (user)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.USER_DELETED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Post('/register'),
    swagger_1.ApiOperation({ title: 'Register user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserCreateDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerNewUser", null);
__decorate([
    common_1.Post('/login'),
    swagger_1.ApiOperation({ title: 'Log in user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return user info', type: users_model_1.ResponseLogin }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateUser", null);
__decorate([
    common_1.Post('/forgot-password'),
    swagger_1.ApiOperation({ title: 'Forgot password' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.ForgotPasswordDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    common_1.Get('/resend-verify-email'),
    swagger_1.ApiOperation({ title: 'Resend email verification to email' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Query('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resendVerifyUserEmail", null);
__decorate([
    common_1.Get('/verify-email'),
    swagger_1.ApiOperation({ title: 'Verify email verification to email' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Query('verificationId')), __param(1, common_1.Query('email')), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyUserEmail", null);
__decorate([
    common_1.Get('/verify-otp'),
    swagger_1.ApiOperation({ title: 'Verify OTP for reset password' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Query('otp')), __param(1, common_1.Query('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyOtpEmail", null);
__decorate([
    common_1.Post('/reset-password'),
    swagger_1.ApiOperation({ title: 'Reset password' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.ResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    common_1.Post('/change-password'),
    swagger_1.ApiOperation({ title: 'Change password' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, users_model_1.ChangePasswordDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    common_1.Get('/me'),
    swagger_1.ApiOperation({ title: 'Get logged-in user info' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return user info', type: users_model_1.ResponseMe }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetUserInfo", null);
__decorate([
    common_1.Put('/update/profile'),
    swagger_1.ApiOperation({ title: 'Update profile' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, users_model_1.UsersUpdateDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    common_1.Get('/logout'),
    swagger_1.ApiOperation({ title: 'Logout profile' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    common_1.Get('/admin/list'),
    swagger_1.ApiOperation({ title: 'Get all users' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of user', type: users_model_1.ResponseAdminUserList }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUserList", null);
__decorate([
    common_1.Put('/admin/status-update/:userId'),
    swagger_1.ApiOperation({ title: 'Update user status by userId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('userId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, users_model_1.UserStatusDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserStatus", null);
__decorate([
    common_1.Post('/admin/delivery-boy/create'),
    swagger_1.ApiOperation({ title: 'Create Delivery boy' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, users_model_1.AdminDeliveryDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createDeliveryBoy", null);
__decorate([
    common_1.Get('/admin/delivery-boy/list'),
    swagger_1.ApiOperation({ title: 'Get all delivery boys' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of delivery boys', type: users_model_1.ResponseAdminDeliveryList }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllDeliveryBoy", null);
__decorate([
    common_1.Put('/admin/delivery-boy/status-update/:deliveryBoyId'),
    swagger_1.ApiOperation({ title: 'Update delivery boy status by deliveryBoyId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('deliveryBoyId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, users_model_1.UserStatusDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateDeliveryBoyStatus", null);
__decorate([
    common_1.Put('/language/update'),
    swagger_1.ApiOperation({ title: 'Update user preferred language' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, users_model_1.LanguageUpdateDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateLanguage", null);
__decorate([
    common_1.Post('/upload/image'),
    swagger_1.ApiOperation({ title: 'User profile image upload' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return image detail', type: app_model_1.UploadImageResponseDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseInterceptors(multer_1.FileInterceptor('file')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiImplicitFile({ name: 'file', required: true, description: 'Profile image upload' }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.UploadedFile()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, Object, app_model_1.UploadImageDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userImageUpload", null);
__decorate([
    common_1.Delete('/delete/image'),
    swagger_1.ApiOperation({ title: 'Delete user profile image' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return image detail', type: app_model_1.UploadImageResponseDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteImage", null);
__decorate([
    common_1.Post('/register-phone'),
    swagger_1.ApiOperation({ title: 'Register user Phone' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserCreateMobileDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerMobileNumber", null);
__decorate([
    common_1.Post('/verify-otp/number'),
    swagger_1.ApiOperation({ title: 'Verify OTP sent to Phone' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return verified detail', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.OTPVerifyDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyOTPTwilio", null);
__decorate([
    common_1.Post('/send-otp-phone'),
    swagger_1.ApiOperation({ title: 'Send OTP to Phone' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return verified detail', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.OTPSendDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendOTPTwilio", null);
__decorate([
    common_1.Post('/login-phone'),
    swagger_1.ApiOperation({ title: 'Login with email or mobile number' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return verified detail', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 205, description: 'Mobile Number is not Verified', type: app_model_1.ResponseBadRequestMessage }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.LogInMobileDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginPhone", null);
__decorate([
    common_1.Post('/reset-password-number'),
    swagger_1.ApiOperation({ title: 'Reset password (Number)' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.ResetNumberPasswordDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPasswordNumber", null);
__decorate([
    common_1.Put('/update/mobile-verify'),
    swagger_1.ApiOperation({ title: 'Send otp for mobile number updation' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, users_model_1.OTPSendDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateMobileVerify", null);
__decorate([
    common_1.Put('/update/mobile'),
    swagger_1.ApiOperation({ title: 'Update mobile number' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, users_model_1.OTPVerifyDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateMobile", null);
__decorate([
    common_1.Post('super-admin/create/admin'),
    swagger_1.ApiOperation({ title: 'Register Admin' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, users_model_1.UserCreateDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerNewAdmin", null);
__decorate([
    common_1.Delete('/super-admin/delete/:userId'),
    swagger_1.ApiOperation({ title: 'Delete admin by superAdmin by userid' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteAdmin", null);
__decorate([
    common_1.Put('/super-admin/status-update/:userId'),
    swagger_1.ApiOperation({ title: 'Update Admin status by userId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('userId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, users_model_1.UserStatusDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateAdminStatus", null);
__decorate([
    common_1.Get('/super-admin/list-admin'),
    swagger_1.ApiOperation({ title: 'Get all admins' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "q", description: "search according to first Name", required: false, type: String }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of admins', type: users_model_1.ResponseAdminUserList }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllAdminList", null);
__decorate([
    common_1.Delete('/admin/delete/:userId'),
    swagger_1.ApiOperation({ title: 'Delete admin by superAdmin by userid' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    common_1.Controller('users'),
    swagger_1.ApiUseTags('Users'),
    __metadata("design:paramtypes", [users_service_1.UserService,
        auth_service_1.AuthService,
        util_service_1.UtilService,
        email_service_1.EmailService,
        upload_service_1.UploadService,
        otp_service_1.OtpService,
        order_service_1.OrderService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map