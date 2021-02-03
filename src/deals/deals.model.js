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
var DealType;
(function (DealType) {
    DealType["CATEGORY"] = "CATEGORY";
    DealType["PRODUCT"] = "PRODUCT";
})(DealType = exports.DealType || (exports.DealType = {}));
exports.DealSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    dealPercent: { type: Number },
    categoryId: { type: String },
    categoryName: { type: String },
    productId: { type: String },
    productName: { type: String },
    dealType: { type: DealType },
    imageUrl: { type: String, required: true },
    imageId: { type: String, required: true },
    filePath: { type: String },
    topDeal: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    products: [{
            productId: { type: String },
            productName: { type: String },
        }]
}, {
    timestamps: true
});
class ProductsDTO {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "productId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "productName", void 0);
exports.ProductsDTO = ProductsDTO;
class DealSaveDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealSaveDTO.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealSaveDTO.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    class_validator_1.Max(100),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], DealSaveDTO.prototype, "dealPercent", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty({ enum: Object.keys(DealType) }),
    class_validator_1.IsEnum(DealType, { message: 'Deal type must be one of these ' + Object.keys(DealType) }),
    __metadata("design:type", String)
], DealSaveDTO.prototype, "dealType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealSaveDTO.prototype, "categoryId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealSaveDTO.prototype, "productId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealSaveDTO.prototype, "imageUrl", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealSaveDTO.prototype, "imageId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealSaveDTO.prototype, "filePath", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], DealSaveDTO.prototype, "topDeal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], DealSaveDTO.prototype, "products", void 0);
exports.DealSaveDTO = DealSaveDTO;
class DealsDTO {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DealsDTO.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealsDTO.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealsDTO.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], DealsDTO.prototype, "dealPercent", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty({ enum: Object.keys(DealType) }),
    class_validator_1.IsEnum(DealType, { message: 'Deal type must be one of these ' + Object.keys(DealType) }),
    __metadata("design:type", String)
], DealsDTO.prototype, "dealType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DealsDTO.prototype, "categoryId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealsDTO.prototype, "productId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealsDTO.prototype, "imageUrl", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealsDTO.prototype, "imageId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DealsDTO.prototype, "filePath", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], DealsDTO.prototype, "topDeal", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], DealsDTO.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], DealsDTO.prototype, "products", void 0);
exports.DealsDTO = DealsDTO;
class DealStatusDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], DealStatusDTO.prototype, "status", void 0);
exports.DealStatusDTO = DealStatusDTO;
class FindDealDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FindDealDTO.prototype, "title", void 0);
exports.FindDealDTO = FindDealDTO;
//# sourceMappingURL=deals.model.js.map