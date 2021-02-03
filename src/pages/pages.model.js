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
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var PageType;
(function (PageType) {
    PageType["ABOUT_US"] = "ABOUT_US";
    PageType["TERMS_AND_CONDITIONS"] = "TERMS_AND_CONDITIONS";
    PageType["PRIVACY_POLICY"] = "PRIVACY_POLICY";
})(PageType = exports.PageType || (exports.PageType = {}));
exports.PageSchema = new mongoose.Schema({
    pageType: { type: PageType },
    title: { type: String },
    description: { type: String },
    status: { type: Boolean, default: true }
}, {
    timestamps: true
});
class PageSaveDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty({ enum: Object.keys(PageType) }),
    class_validator_1.IsEnum(PageType, { message: 'pageType must be one of these ' + Object.keys(PageType) }),
    __metadata("design:type", String)
], PageSaveDTO.prototype, "pageType", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], PageSaveDTO.prototype, "title", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], PageSaveDTO.prototype, "description", void 0);
exports.PageSaveDTO = PageSaveDTO;
class PageDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], PageDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], PageDTO.prototype, "description", void 0);
exports.PageDTO = PageDTO;
class ResponsePageDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponsePageDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", PageDTO)
], ResponsePageDTO.prototype, "response_data", void 0);
exports.ResponsePageDTO = ResponsePageDTO;
class ResponseAdminDTO extends PageDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ResponseAdminDTO.prototype, "status", void 0);
exports.ResponseAdminDTO = ResponseAdminDTO;
class ResponseAdminPageDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseAdminPageDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseAdminDTO)
], ResponseAdminPageDTO.prototype, "response_data", void 0);
exports.ResponseAdminPageDTO = ResponseAdminPageDTO;
//# sourceMappingURL=pages.model.js.map