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
exports.LanguageSchema = new mongoose.Schema({
    languageCode: { type: String },
    languageName: { type: String },
    status: { type: Number, default: 1 },
    isDefault: { type: Number, default: 0 },
    webJson: { type: Object },
    deliveyAppJson: { type: Object },
    mobAppJson: { type: Object },
    cmsJson: { type: Object },
    backendJson: { type: Object }
}, { timestamps: true });
class LanguageDTO {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], LanguageDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LanguageDTO.prototype, "languageCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LanguageDTO.prototype, "languageName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], LanguageDTO.prototype, "webJson", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], LanguageDTO.prototype, "deliveyAppJson", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], LanguageDTO.prototype, "mobAppJson", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], LanguageDTO.prototype, "cmsJson", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], LanguageDTO.prototype, "backendJson", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], LanguageDTO.prototype, "isDefault", void 0);
exports.LanguageDTO = LanguageDTO;
class LanguageStatusUpdateDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], LanguageStatusUpdateDTO.prototype, "status", void 0);
exports.LanguageStatusUpdateDTO = LanguageStatusUpdateDTO;
class SetDefaultLanguageDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], SetDefaultLanguageDTO.prototype, "isDefault", void 0);
exports.SetDefaultLanguageDTO = SetDefaultLanguageDTO;
class ResponseLanguageDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseLanguageDTO.prototype, "isDefault", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseLanguageDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseLanguageDTO.prototype, "languageCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseLanguageDTO.prototype, "languageName", void 0);
exports.ResponseLanguageDTO = ResponseLanguageDTO;
class ResponseFavouritesDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseFavouritesDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResponseLanguageDTO)
], ResponseFavouritesDTO.prototype, "response_data", void 0);
exports.ResponseFavouritesDTO = ResponseFavouritesDTO;
class ResponseLanguageDetailsDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ResponseLanguageDetailsDTO.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseLanguageDetailsDTO.prototype, "isDefault", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseLanguageDetailsDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseLanguageDetailsDTO.prototype, "languageCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseLanguageDetailsDTO.prototype, "languageName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], ResponseLanguageDetailsDTO.prototype, "webJson", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], ResponseLanguageDetailsDTO.prototype, "mobAppJson", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], ResponseLanguageDetailsDTO.prototype, "cmsJson", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], ResponseLanguageDetailsDTO.prototype, "backendJson", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], ResponseLanguageDetailsDTO.prototype, "deliveyAppJson", void 0);
exports.ResponseLanguageDetailsDTO = ResponseLanguageDetailsDTO;
class ResponseLanguageDetails {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseLanguageDetails.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseLanguageDetailsDTO)
], ResponseLanguageDetails.prototype, "response_data", void 0);
exports.ResponseLanguageDetails = ResponseLanguageDetails;
class ResponseLanguageCMSDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], ResponseLanguageCMSDTO.prototype, "en", void 0);
exports.ResponseLanguageCMSDTO = ResponseLanguageCMSDTO;
class ResponseLanguageCMSDetailsDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseLanguageCMSDetailsDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseLanguageCMSDTO)
], ResponseLanguageCMSDetailsDTO.prototype, "response_data", void 0);
exports.ResponseLanguageCMSDetailsDTO = ResponseLanguageCMSDetailsDTO;
//# sourceMappingURL=language.model.js.map