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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const app_model_1 = require("../utils/app.model");
exports.UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, trim: true, lowercase: true, sparse: true },
    password: { type: String },
    salt: { type: String },
    role: { type: String },
    imageUrl: { type: String },
    imageId: { type: String },
    filePath: { type: String },
    isSuperAdmin: { type: Boolean, default: false },
    mobileNumber: { type: String, unique: true },
    newMobileNumber: { type: String },
    countryCode: { type: String },
    countryName: { type: String },
    otp: { type: String },
    otpVerificationId: { type: String },
    otpVerificationExpiry: { type: Number },
    playerId: { type: String },
    mobileNumberVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    emailVerificationId: { type: String },
    emailVerificationExpiry: { type: Number },
    location: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
    },
    status: { type: Boolean, default: true },
    productExportedFile: { type: Object },
    language: { type: String },
    walletAmount: { type: Number },
    orderDelivered: { type: Number, default: 0 },
    orderPurchased: { type: Number, default: 0 },
}, {
    timestamps: true
});
class LLLocationDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], LLLocationDTO.prototype, "latitude", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], LLLocationDTO.prototype, "longitude", void 0);
exports.LLLocationDTO = LLLocationDTO;
class UserCreateDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 35),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "mobileNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => LLLocationDTO),
    __metadata("design:type", LLLocationDTO)
], UserCreateDTO.prototype, "location", void 0);
exports.UserCreateDTO = UserCreateDTO;
class UserCreateMobileDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserCreateMobileDTO.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserCreateMobileDTO.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserCreateMobileDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 35),
    __metadata("design:type", String)
], UserCreateMobileDTO.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.Length(8, 15),
    __metadata("design:type", String)
], UserCreateMobileDTO.prototype, "mobileNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserCreateMobileDTO.prototype, "countryCode", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserCreateMobileDTO.prototype, "countryName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => LLLocationDTO),
    __metadata("design:type", LLLocationDTO)
], UserCreateMobileDTO.prototype, "location", void 0);
exports.UserCreateMobileDTO = UserCreateMobileDTO;
class LoginDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LoginDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 35),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], LoginDTO.prototype, "playerId", void 0);
exports.LoginDTO = LoginDTO;
class LogInMobileDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], LogInMobileDTO.prototype, "userName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 35),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LogInMobileDTO.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], LogInMobileDTO.prototype, "playerId", void 0);
exports.LogInMobileDTO = LogInMobileDTO;
class CoOridnatesDTO {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Equals('Point'),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CoOridnatesDTO.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CoOridnatesDTO.prototype, "coordinates", void 0);
exports.CoOridnatesDTO = CoOridnatesDTO;
class UsersDTO {
}
__decorate([
    class_validator_1.IsEmpty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(5, 35),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "mobileNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "newMobileNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "countryCode", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "countryName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEmpty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "salt", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "filePath", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UsersDTO.prototype, "playerId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty({ enum: Object.keys(app_model_1.UserRoles) }),
    class_validator_1.IsEnum(app_model_1.UserRoles, { message: 'Role type must be one of these ' + Object.keys(app_model_1.UserRoles) }),
    __metadata("design:type", String)
], UsersDTO.prototype, "role", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UsersDTO.prototype, "otp", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "imageUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "imageId", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UsersDTO.prototype, "registrationDate", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], UsersDTO.prototype, "emailVerified", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], UsersDTO.prototype, "mobileNumberVerified", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UsersDTO.prototype, "verificationId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => CoOridnatesDTO),
    __metadata("design:type", CoOridnatesDTO)
], UsersDTO.prototype, "location", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UsersDTO.prototype, "deliveryCharge", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersDTO.prototype, "deliveryDistanceUnit", void 0);
exports.UsersDTO = UsersDTO;
class UsersUpdateDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersUpdateDTO.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersUpdateDTO.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersUpdateDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersUpdateDTO.prototype, "mobileNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersUpdateDTO.prototype, "imageUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersUpdateDTO.prototype, "imageId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UsersUpdateDTO.prototype, "filePath", void 0);
exports.UsersUpdateDTO = UsersUpdateDTO;
class CredentialsDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CredentialsDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CredentialsDTO.prototype, "playerId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(5, 35),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CredentialsDTO.prototype, "password", void 0);
exports.CredentialsDTO = CredentialsDTO;
class ForgotPasswordDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ForgotPasswordDTO.prototype, "email", void 0);
exports.ForgotPasswordDTO = ForgotPasswordDTO;
class ResetPasswordDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 35),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "newPassword", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "verificationToken", void 0);
exports.ResetPasswordDTO = ResetPasswordDTO;
class ResetNumberPasswordDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 35),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResetNumberPasswordDTO.prototype, "newPassword", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResetNumberPasswordDTO.prototype, "mobileNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResetNumberPasswordDTO.prototype, "verificationToken", void 0);
exports.ResetNumberPasswordDTO = ResetNumberPasswordDTO;
class ChangePasswordDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 35),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "currentPassword", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(6, 35),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "newPassword", void 0);
exports.ChangePasswordDTO = ChangePasswordDTO;
class UserStatusDTO {
}
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], UserStatusDTO.prototype, "status", void 0);
exports.UserStatusDTO = UserStatusDTO;
class LanguageUpdateDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], LanguageUpdateDTO.prototype, "language", void 0);
exports.LanguageUpdateDTO = LanguageUpdateDTO;
class ExportedFileDTO {
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], ExportedFileDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], ExportedFileDTO.prototype, "productExportedFile", void 0);
exports.ExportedFileDTO = ExportedFileDTO;
class AdminDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminDTO.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminDTO.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminDTO.prototype, "mobileNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => CoOridnatesDTO),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", CoOridnatesDTO)
], AdminDTO.prototype, "location", void 0);
exports.AdminDTO = AdminDTO;
class AdminDeliveryDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminDeliveryDTO.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminDeliveryDTO.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminDeliveryDTO.prototype, "mobileNumber", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminDeliveryDTO.prototype, "countryCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminDeliveryDTO.prototype, "countryName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminDeliveryDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminDeliveryDTO.prototype, "password", void 0);
exports.AdminDeliveryDTO = AdminDeliveryDTO;
class LoginResponseDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], LoginResponseDTO.prototype, "token", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], LoginResponseDTO.prototype, "role", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], LoginResponseDTO.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], LoginResponseDTO.prototype, "language", void 0);
exports.LoginResponseDTO = LoginResponseDTO;
class ResponseLogin {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseLogin.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", LoginResponseDTO)
], ResponseLogin.prototype, "response_data", void 0);
exports.ResponseLogin = ResponseLogin;
class UserMeDTO extends UsersUpdateDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserMeDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserMeDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserMeDTO.prototype, "language", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UserMeDTO.prototype, "walletAmount", void 0);
exports.UserMeDTO = UserMeDTO;
class ResponseMe {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseMe.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", UserMeDTO)
], ResponseMe.prototype, "response_data", void 0);
exports.ResponseMe = ResponseMe;
class AdminUserDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminUserDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], AdminUserDTO.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminUserDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminUserDTO.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminUserDTO.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminUserDTO.prototype, "mobileNumber", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminUserDTO.prototype, "language", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminUserDTO.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], AdminUserDTO.prototype, "emailVerified", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], AdminUserDTO.prototype, "orderDelivered", void 0);
exports.AdminUserDTO = AdminUserDTO;
class ResponseAdminUserList {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseAdminUserList.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", AdminUserDTO)
], ResponseAdminUserList.prototype, "response_data", void 0);
exports.ResponseAdminUserList = ResponseAdminUserList;
class ResponseAdminDeliveryList {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseAdminDeliveryList.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", AdminUserDTO)
], ResponseAdminDeliveryList.prototype, "response_data", void 0);
exports.ResponseAdminDeliveryList = ResponseAdminDeliveryList;
class OTPVerifyDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OTPVerifyDTO.prototype, "mobileNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OTPVerifyDTO.prototype, "otp", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OTPVerifyDTO.prototype, "sId", void 0);
exports.OTPVerifyDTO = OTPVerifyDTO;
class OTPSendDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OTPSendDTO.prototype, "mobileNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OTPSendDTO.prototype, "countryCode", void 0);
exports.OTPSendDTO = OTPSendDTO;
//# sourceMappingURL=users.model.js.map