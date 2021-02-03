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
exports.CategorySchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    subCategoryCount: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
    imageId: { type: String, required: false },
    filePath: { type: String },
    isDealAvailable: { type: Boolean, default: false },
    dealPercent: { type: Number },
    dealId: { type: String },
    userId: { type: String },
    status: { type: Boolean, default: true }
}, {
    timestamps: true
});
class CategorySaveDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategorySaveDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategorySaveDTO.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CategorySaveDTO.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CategorySaveDTO.prototype, "imageId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CategorySaveDTO.prototype, "filePath", void 0);
exports.CategorySaveDTO = CategorySaveDTO;
class CategoryListDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryListDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryListDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryListDTO.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CategoryListDTO.prototype, "filePath", void 0);
exports.CategoryListDTO = CategoryListDTO;
class CategoryAdminListDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryAdminListDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryAdminListDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryAdminListDTO.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryAdminListDTO.prototype, "filePath", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CategoryAdminListDTO.prototype, "subCategoryCount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CategoryAdminListDTO.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CategoryAdminListDTO.prototype, "isDealAvailable", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CategoryAdminListDTO.prototype, "dealPercent", void 0);
exports.CategoryAdminListDTO = CategoryAdminListDTO;
class CategoryAdminDetailDTO extends CategoryAdminListDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryAdminDetailDTO.prototype, "description", void 0);
exports.CategoryAdminDetailDTO = CategoryAdminDetailDTO;
class CategoryStatusUpdateDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CategoryStatusUpdateDTO.prototype, "status", void 0);
exports.CategoryStatusUpdateDTO = CategoryStatusUpdateDTO;
class DropDownDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DropDownDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DropDownDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DropDownDTO.prototype, "status", void 0);
exports.DropDownDTO = DropDownDTO;
class ResponseUserCategoryList {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseUserCategoryList.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", CategorySaveDTO)
], ResponseUserCategoryList.prototype, "response_data", void 0);
exports.ResponseUserCategoryList = ResponseUserCategoryList;
class ResponseCategoryAdmin {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseCategoryAdmin.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", CategoryAdminListDTO)
], ResponseCategoryAdmin.prototype, "response_data", void 0);
exports.ResponseCategoryAdmin = ResponseCategoryAdmin;
class ResponseDropDown {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseDropDown.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", DropDownDTO)
], ResponseDropDown.prototype, "response_data", void 0);
exports.ResponseDropDown = ResponseDropDown;
//# sourceMappingURL=categories.model.js.map