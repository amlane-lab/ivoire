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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_model_1 = require("../utils/app.model");
const auth_service_1 = require("../utils/auth.service");
const util_service_1 = require("../utils/util.service");
let UserService = class UserService {
    constructor(userModel, authService, utilService) {
        this.userModel = userModel;
        this.authService = authService;
        this.utilService = utilService;
    }
    async createUser(userData) {
        if (userData.email)
            userData.email = userData.email.toLowerCase();
        const { salt, hashedPassword } = await this.authService.hashPassword(userData.password);
        userData.salt = salt;
        userData.password = hashedPassword;
        userData.emailVerificationId = await this.utilService.getUUID();
        userData.emailVerificationExpiry = await this.utilService.getXminutesAheadTime(120);
        const user = await this.userModel.create(userData);
        return user;
    }
    async regenerateVerificationCode(userId) {
        const emailVerificationId = await this.utilService.getUUID();
        const emailVerificationExpiry = await this.utilService.getXminutesAheadTime(120);
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, { emailVerificationId: emailVerificationId, emailVerificationExpiry: emailVerificationExpiry }, { new: true });
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.userModel.findOne({ email: email });
        return user;
    }
    async updatePlayerId(userId, playerId) {
        const user = await this.userModel.updateOne({ _id: userId }, { playerId: playerId });
        return user;
    }
    async getUserInfo(userId) {
        const user = await this.userModel.findById(userId, 'firstName lastName email imageUrl imageId filePath mobileNumber countryCode countryName language walletAmount orderDelivered');
        return user;
    }
    async getExportedFileInfo(userId) {
        const user = await this.userModel.findById(userId, 'productExportedFile');
        return user;
    }
    async updateMyInfo(userId, userData) {
        const user = await this.userModel.findByIdAndUpdate(userId, userData);
        return user;
    }
    async updateOTP(userId, otp) {
        const otpVerificationExpiry = await this.utilService.getXminutesAheadTime(10);
        const user = await this.userModel.findByIdAndUpdate(userId, { otp: otp, otpVerificationExpiry: otpVerificationExpiry });
        return user;
    }
    async setOTPVerification(userId, otpVerificationId) {
        const user = await this.userModel.findByIdAndUpdate(userId, { otpVerificationId: otpVerificationId });
        return user;
    }
    async getAllUser(page, limit, search) {
        const skip = page * limit;
        let filter = { role: app_model_1.UserRoles.USER };
        if (search)
            filter['firstName'] = { $regex: search, $options: 'i' };
        return await this.userModel.find(filter, 'firstName lastName email mobileNumber countryCode countryName emailVerified language status createdAt').limit(limit).skip(skip).lean();
    }
    async countAllUser(search) {
        let filter = { role: app_model_1.UserRoles.USER };
        if (search)
            filter['firstName'] = { $regex: search, $options: 'i' };
        return await this.userModel.countDocuments(filter);
    }
    async getUserById(userId) {
        const user = await this.userModel.findById(userId);
        return user;
    }
    async updateUserStatus(userId, userStatusData) {
        const user = await this.userModel.findByIdAndUpdate(userId, userStatusData, { new: true });
        return user;
    }
    async updatePassword(userId, salt, password) {
        const user = await this.userModel.findByIdAndUpdate(userId, { salt: salt, password: password });
        return user;
    }
    async setEmailVerified(userId) {
        const user = await this.userModel.findByIdAndUpdate(userId, { emailVerified: true });
        return user;
    }
    async setMobileVerified(mobileNumber) {
        const user = await this.userModel.findOneAndUpdate({ mobileNumber: mobileNumber }, { mobileNumberVerified: true });
        return user;
    }
    async setMobileOTP(mobileNumber, otp, newMobileNumber) {
        let updateData = { otp: otp };
        if (newMobileNumber)
            updateData['newMobileNumber'] = newMobileNumber;
        const user = await this.userModel.findOneAndUpdate({ mobileNumber: mobileNumber }, updateData);
        return user;
    }
    async updateMobileNumber(userId, mobileNumber) {
        const user = await this.userModel.findByIdAndUpdate(userId, { mobileNumber: mobileNumber });
        return user;
    }
    async findUserByEmailOrMobile(email, mobileNumber) {
        if (email)
            email = email.toLowerCase();
        const user = await this.userModel.findOne({ $or: [{ email: email }, { mobileNumber: mobileNumber }] });
        return user;
    }
    async findUserByMobile(mobileNumber) {
        return await this.userModel.findOne({ mobileNumber: mobileNumber });
    }
    async getAllDeliveryBoy(page, limit, search) {
        const skip = page * limit;
        let filter = { role: app_model_1.UserRoles.DELIVERY_BOY };
        if (search)
            filter['firstName'] = { $regex: search, $options: 'i' };
        return await this.userModel.find(filter, 'firstName lastName email mobileNumber countryCode countryName emailVerified language status orderDelivered createdAt').limit(limit).skip(skip);
    }
    async countAllDeliveryBoy(search) {
        let filter = { role: app_model_1.UserRoles.DELIVERY_BOY };
        if (search)
            filter['firstName'] = { $regex: search, $options: 'i' };
        const count = await this.userModel.countDocuments(filter);
        return count;
    }
    async updateMyLanguage(userId, language) {
        const user = await this.userModel.findByIdAndUpdate(userId, { language: language }, { new: true });
        return user;
    }
    async updateWallet(userId, walletAmount) {
        const user = await this.userModel.updateOne({ _id: userId }, { $inc: { walletAmount: walletAmount } });
        return user;
    }
    async increaseOrderDelivered(userId) {
        return await this.userModel.updateOne({ _id: userId }, { $inc: { orderDelivered: 1 } });
    }
    async increaseOrderPurchased(userId) {
        return await this.userModel.updateOne({ _id: userId }, { $inc: { orderPurchased: 1 } });
    }
    async descreaseOrderPurchased(userId) {
        return await this.userModel.updateOne({ _id: userId }, { $inc: { orderPurchased: -1 } });
    }
    async countUserByFilter(startDate, endDate) {
        startDate = startDate.setHours(0, 0, 0, 0);
        console.log("startDate", startDate);
        let filter = { role: app_model_1.UserRoles.USER, createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) } };
        return await this.userModel.countDocuments(filter);
    }
    async userGraph(startDate, endDate, type) {
        let query = { createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) } };
        console.log("user Mode Graph query", query);
        let result;
        if (type === "DAILY") {
            result = await this.userModel.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' }, date: { $dayOfMonth: '$createdAt' } },
                        count: { $sum: 1 }
                    }
                }
            ]);
        }
        else {
            result = await this.userModel.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                        count: { $sum: 1 }
                    }
                }
            ]);
        }
        return result;
    }
    async deleteUserById(userId) {
        const user = await this.userModel.findByIdAndRemove(userId);
        return user;
    }
    async getAllAdmin(page, limit, search) {
        const skip = page * limit;
        let filter = { role: app_model_1.UserRoles.ADMIN, isSuperAdmin: false };
        if (search)
            filter['firstName'] = { $regex: search, $options: 'i' };
        const users = await this.userModel.find(filter, 'firstName lastName email mobileNumber emailVerified language status isSuperAdmin').limit(limit).skip(skip).lean();
        return users;
    }
    async countAllAdmin(search) {
        let filter = { role: app_model_1.UserRoles.ADMIN, isSuperAdmin: false };
        if (search)
            filter['firstName'] = { $regex: search, $options: 'i' };
        const count = await this.userModel.countDocuments(filter);
        return count;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService,
        util_service_1.UtilService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map