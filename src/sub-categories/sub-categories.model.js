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
exports.SubCategorySchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    categoryId: { type: String },
    categoryName: { type: String },
    userId: { type: String },
    status: { type: Boolean, default: true },
}, {
    timestamps: true
});
class SubCategorySaveDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SubCategorySaveDTO.prototype, "title", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SubCategorySaveDTO.prototype, "description", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SubCategorySaveDTO.prototype, "categoryId", void 0);
exports.SubCategorySaveDTO = SubCategorySaveDTO;
class SubCategoryUserDTO extends SubCategorySaveDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SubCategoryUserDTO.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SubCategoryUserDTO.prototype, "categoryName", void 0);
exports.SubCategoryUserDTO = SubCategoryUserDTO;
class SubCategoryDTO extends SubCategoryUserDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SubCategoryDTO.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SubCategoryDTO.prototype, "categoryName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], SubCategoryDTO.prototype, "status", void 0);
exports.SubCategoryDTO = SubCategoryDTO;
class SubCategoryStatusDTO {
}
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], SubCategoryStatusDTO.prototype, "status", void 0);
exports.SubCategoryStatusDTO = SubCategoryStatusDTO;
class SubCategoryDropdownDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SubCategoryDropdownDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SubCategoryDropdownDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SubCategoryDropdownDTO.prototype, "status", void 0);
exports.SubCategoryDropdownDTO = SubCategoryDropdownDTO;
class ResponseSubCategoryUserListDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSubCategoryUserListDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", SubCategoryUserDTO)
], ResponseSubCategoryUserListDTO.prototype, "response_data", void 0);
exports.ResponseSubCategoryUserListDTO = ResponseSubCategoryUserListDTO;
class ResponseSubCategoryListDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSubCategoryListDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", SubCategoryDTO)
], ResponseSubCategoryListDTO.prototype, "response_data", void 0);
exports.ResponseSubCategoryListDTO = ResponseSubCategoryListDTO;
class ResponseSubCategoryDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSubCategoryDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", SubCategoryDTO)
], ResponseSubCategoryDTO.prototype, "response_data", void 0);
exports.ResponseSubCategoryDTO = ResponseSubCategoryDTO;
class ResponseSubCategoryDetailDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSubCategoryDetailDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", SubCategoryDTO)
], ResponseSubCategoryDetailDTO.prototype, "response_data", void 0);
exports.ResponseSubCategoryDetailDTO = ResponseSubCategoryDetailDTO;
class ResponseSubCategoryDrpodownDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSubCategoryDrpodownDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", SubCategoryDropdownDTO)
], ResponseSubCategoryDrpodownDTO.prototype, "response_data", void 0);
exports.ResponseSubCategoryDrpodownDTO = ResponseSubCategoryDrpodownDTO;
//# sourceMappingURL=sub-categories.model.js.map