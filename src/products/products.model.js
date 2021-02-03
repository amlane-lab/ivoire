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
const decorators_1 = require("class-transformer/decorators");
exports.ProductSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    userId: { type: String },
    categoryId: { type: String },
    categoryName: { type: String },
    sku: { type: String },
    isDealAvailable: { type: Boolean, default: false },
    dealPercent: { type: Number },
    dealId: { type: String },
    dealType: { type: String },
    subCategoryId: { type: String },
    subCategoryName: { type: String },
    type: { type: String },
    variant: [
        {
            productStock: { type: Number },
            unit: { type: String },
            price: { type: Number },
            enable: { type: Boolean, default: true }
        }
    ],
    imageUrl: { type: String },
    imageId: { type: String },
    filePath: { type: String },
    productImages: [{
            imageUrl: { type: String },
            imageId: { type: String },
            filePath: { type: String },
        }
    ],
    status: { type: Boolean, default: true },
    averageRating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    noOfUsersRated: { type: Number, default: 0 },
    keyWords: { type: String }
}, {
    timestamps: true
});
class ProductFilterQuery {
}
exports.ProductFilterQuery = ProductFilterQuery;
class ProductImagesDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductImagesDTO.prototype, "imageUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductImagesDTO.prototype, "imageId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductImagesDTO.prototype, "filePath", void 0);
exports.ProductImagesDTO = ProductImagesDTO;
class VariantDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], VariantDTO.prototype, "productStock", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], VariantDTO.prototype, "unit", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], VariantDTO.prototype, "price", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], VariantDTO.prototype, "enable", void 0);
exports.VariantDTO = VariantDTO;
class ProductsSaveDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsSaveDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ProductsSaveDTO.prototype, "sku", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsSaveDTO.prototype, "description", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsSaveDTO.prototype, "categoryId", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: [VariantDTO] }),
    class_validator_1.ValidateNested({ each: true }),
    class_validator_1.ArrayMinSize(1),
    __metadata("design:type", Array)
], ProductsSaveDTO.prototype, "variant", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsSaveDTO.prototype, "imageUrl", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsSaveDTO.prototype, "filePath", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ProductsSaveDTO.prototype, "imageId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsSaveDTO.prototype, "subCategoryId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty({ type: [ProductImagesDTO] }),
    __metadata("design:type", Array)
], ProductsSaveDTO.prototype, "productImages", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsSaveDTO.prototype, "keyWords", void 0);
exports.ProductsSaveDTO = ProductsSaveDTO;
class ProductsDTO {
}
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "sku", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "title", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsDTO.prototype, "price", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "type", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "categoryId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.ValidateNested({ each: true }),
    class_validator_1.ArrayMinSize(1),
    decorators_1.Type(() => VariantDTO),
    __metadata("design:type", Array)
], ProductsDTO.prototype, "variant", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], ProductsDTO.prototype, "isDealAvailable", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], ProductsDTO.prototype, "dealPercent", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "dealId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "imageUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "filePath", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "unit", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "imageId", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: [ProductImagesDTO] }),
    __metadata("design:type", Array)
], ProductsDTO.prototype, "productImages", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "subCategoryId", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ProductsDTO.prototype, "status", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], ProductsDTO.prototype, "averageRating", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], ProductsDTO.prototype, "totalRating", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], ProductsDTO.prototype, "noOfUsersRated", void 0);
exports.ProductsDTO = ProductsDTO;
class VariantData {
}
exports.VariantData = VariantData;
class PuductStatusDTO {
}
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], PuductStatusDTO.prototype, "status", void 0);
exports.PuductStatusDTO = PuductStatusDTO;
class DealProductDTO {
}
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], DealProductDTO.prototype, "dealPercent", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], DealProductDTO.prototype, "isDealAvailable", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], DealProductDTO.prototype, "dealId", void 0);
exports.DealProductDTO = DealProductDTO;
class ProductFilterDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ProductFilterDTO.prototype, "category", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ProductFilterDTO.prototype, "subCategory", void 0);
exports.ProductFilterDTO = ProductFilterDTO;
class ProductCategoryDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ProductCategoryDTO.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ProductCategoryDTO.prototype, "category", void 0);
exports.ProductCategoryDTO = ProductCategoryDTO;
class ProductListAdminDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListAdminDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListAdminDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListAdminDTO.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListAdminDTO.prototype, "filePath", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ProductListAdminDTO.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ProductListAdminDTO.prototype, "isDealAvailable", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductListAdminDTO.prototype, "dealPercent", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListAdminDTO.prototype, "dealId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListAdminDTO.prototype, "subcategory", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListAdminDTO.prototype, "category", void 0);
exports.ProductListAdminDTO = ProductListAdminDTO;
class ProductTitleListAdminDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductTitleListAdminDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductTitleListAdminDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductTitleListAdminDTO.prototype, "status", void 0);
exports.ProductTitleListAdminDTO = ProductTitleListAdminDTO;
class FavourutesResponseDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FavourutesResponseDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FavourutesResponseDTO.prototype, "sku", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FavourutesResponseDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FavourutesResponseDTO.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], FavourutesResponseDTO.prototype, "price", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.ValidateNested({ each: true }),
    class_validator_1.ArrayMinSize(1),
    decorators_1.Type(() => VariantDTO),
    __metadata("design:type", Array)
], FavourutesResponseDTO.prototype, "variant", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], FavourutesResponseDTO.prototype, "isDealAvailable", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FavourutesResponseDTO.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FavourutesResponseDTO.prototype, "filePath", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FavourutesResponseDTO.prototype, "imageId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], FavourutesResponseDTO.prototype, "averageRating", void 0);
exports.FavourutesResponseDTO = FavourutesResponseDTO;
class ProductListResponseDTO extends PuductStatusDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListResponseDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListResponseDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListResponseDTO.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListResponseDTO.prototype, "filePath", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ProductListResponseDTO.prototype, "isDealAvailable", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductListResponseDTO.prototype, "dealPercent", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: [VariantDTO] }),
    class_validator_1.ValidateNested({ each: true }),
    decorators_1.Type(() => VariantDTO),
    __metadata("design:type", Array)
], ProductListResponseDTO.prototype, "variant", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductListResponseDTO.prototype, "categoryName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductListResponseDTO.prototype, "averageRating", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductListResponseDTO.prototype, "unitInCart", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ProductListResponseDTO.prototype, "quantityToCart", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ProductListResponseDTO.prototype, "categories", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ProductListResponseDTO.prototype, "dealsOfDay", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ProductListResponseDTO.prototype, "topDeals", void 0);
exports.ProductListResponseDTO = ProductListResponseDTO;
class ProductResponseDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ProductResponseDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ProductListResponseDTO)
], ProductResponseDTO.prototype, "response_data", void 0);
exports.ProductResponseDTO = ProductResponseDTO;
class ResponseListDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseListDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseListDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseListDTO.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseListDTO.prototype, "filePath", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ResponseListDTO.prototype, "isDealAvailable", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseListDTO.prototype, "dealPercent", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.ValidateNested({ each: true }),
    decorators_1.Type(() => VariantDTO),
    __metadata("design:type", Array)
], ResponseListDTO.prototype, "variant", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseListDTO.prototype, "categoryName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseListDTO.prototype, "averageRating", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseListDTO.prototype, "unitInCart", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ResponseListDTO.prototype, "quantityToCart", void 0);
exports.ResponseListDTO = ResponseListDTO;
class ProductResponseUserDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductResponseUserDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResponseListDTO)
], ProductResponseUserDTO.prototype, "response_data", void 0);
exports.ProductResponseUserDTO = ProductResponseUserDTO;
class ProductsResponsePaginationDTO extends ProductResponseUserDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsResponsePaginationDTO.prototype, "total", void 0);
exports.ProductsResponsePaginationDTO = ProductsResponsePaginationDTO;
class ProductsResponseByIdDTO extends ProductsSaveDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsResponseByIdDTO.prototype, "averageRating", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsResponseByIdDTO.prototype, "totalRating", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsResponseByIdDTO.prototype, "noOfUsersRated", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsResponseByIdDTO.prototype, "quantityToCart", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ProductsResponseByIdDTO.prototype, "isAddedToCart", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsResponseByIdDTO.prototype, "subCategoryName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ProductsResponseByIdDTO.prototype, "isFavourite", void 0);
exports.ProductsResponseByIdDTO = ProductsResponseByIdDTO;
class ProductDetailsByIdDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductDetailsByIdDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ProductsResponseByIdDTO)
], ProductDetailsByIdDTO.prototype, "response_data", void 0);
exports.ProductDetailsByIdDTO = ProductDetailsByIdDTO;
class ProductsDetailsResponseDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ProductsDetailsResponseDTO.prototype, "isDealAvailable", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsDetailsResponseDTO.prototype, "averageRating", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetailsResponseDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetailsResponseDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.ValidateNested({ each: true }),
    decorators_1.Type(() => VariantDTO),
    __metadata("design:type", Array)
], ProductsDetailsResponseDTO.prototype, "variant", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetailsResponseDTO.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetailsResponseDTO.prototype, "filePath", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ProductTitleListAdminDTO)
], ProductsDetailsResponseDTO.prototype, "subCategories", void 0);
exports.ProductsDetailsResponseDTO = ProductsDetailsResponseDTO;
class ProductResponseByCategoryIdDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductResponseByCategoryIdDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ProductsDetailsResponseDTO)
], ProductResponseByCategoryIdDTO.prototype, "response_data", void 0);
exports.ProductResponseByCategoryIdDTO = ProductResponseByCategoryIdDTO;
class ProductResponseBySubCategoryIdDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductResponseBySubCategoryIdDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResponseListDTO)
], ProductResponseBySubCategoryIdDTO.prototype, "response_data", void 0);
exports.ProductResponseBySubCategoryIdDTO = ProductResponseBySubCategoryIdDTO;
class ProductAdminResponseDTO extends PuductStatusDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ProductAdminResponseDTO.prototype, "isDealAvailable", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductAdminResponseDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductAdminResponseDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductAdminResponseDTO.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductAdminResponseDTO.prototype, "subCategoryName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductAdminResponseDTO.prototype, "dealPercent", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: [ProductImagesDTO] }),
    __metadata("design:type", Array)
], ProductAdminResponseDTO.prototype, "productImages", void 0);
exports.ProductAdminResponseDTO = ProductAdminResponseDTO;
class AdminProdutsResponseDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AdminProdutsResponseDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ProductAdminResponseDTO)
], AdminProdutsResponseDTO.prototype, "response_data", void 0);
exports.AdminProdutsResponseDTO = AdminProdutsResponseDTO;
class ProductsAdminResponse extends AdminProdutsResponseDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsAdminResponse.prototype, "tolal", void 0);
exports.ProductsAdminResponse = ProductsAdminResponse;
class ProductsDropDownResponse {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDropDownResponse.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ProductTitleListAdminDTO)
], ProductsDropDownResponse.prototype, "response_data", void 0);
exports.ProductsDropDownResponse = ProductsDropDownResponse;
class ProductsDetalsForAdmin extends ProductListAdminDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetalsForAdmin.prototype, "averageRating", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsDetalsForAdmin.prototype, "totalRating", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsDetalsForAdmin.prototype, "noOfUsersRated", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetalsForAdmin.prototype, "categoryId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetalsForAdmin.prototype, "imageId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetalsForAdmin.prototype, "subCategoryId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetalsForAdmin.prototype, "categoryName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetalsForAdmin.prototype, "subCategoryName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetalsForAdmin.prototype, "dealId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsDetalsForAdmin.prototype, "dealPercent", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetalsForAdmin.prototype, "dealType", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductsDetalsForAdmin.prototype, "userId", void 0);
exports.ProductsDetalsForAdmin = ProductsDetalsForAdmin;
class ResponseProductsDetailsDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseProductsDetailsDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ProductsDetalsForAdmin)
], ResponseProductsDetailsDTO.prototype, "response_data", void 0);
exports.ResponseProductsDetailsDTO = ResponseProductsDetailsDTO;
class ResponseDataForCategoryAndProducts extends PuductStatusDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ResponseDataForCategoryAndProducts.prototype, "isDealAvailable", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDataForCategoryAndProducts.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDataForCategoryAndProducts.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDataForCategoryAndProducts.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDataForCategoryAndProducts.prototype, "categoryName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDataForCategoryAndProducts.prototype, "subCategoryName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseDataForCategoryAndProducts.prototype, "dealPercent", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty({ type: [ProductImagesDTO] }),
    __metadata("design:type", Array)
], ResponseDataForCategoryAndProducts.prototype, "productImages", void 0);
exports.ResponseDataForCategoryAndProducts = ResponseDataForCategoryAndProducts;
class ResponseCategoryAndProductDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseCategoryAndProductDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResponseDataForCategoryAndProducts)
], ResponseCategoryAndProductDTO.prototype, "response_data", void 0);
exports.ResponseCategoryAndProductDTO = ResponseCategoryAndProductDTO;
class ResponseCategoryAndProductDTOPagenation extends ResponseCategoryAndProductDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseCategoryAndProductDTOPagenation.prototype, "total", void 0);
exports.ResponseCategoryAndProductDTOPagenation = ResponseCategoryAndProductDTOPagenation;
class ImportProductDTO {
}
exports.ImportProductDTO = ImportProductDTO;
class ResponseCategoryByIdProductDTOPagenation extends ProductResponseByCategoryIdDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseCategoryByIdProductDTOPagenation.prototype, "total", void 0);
exports.ResponseCategoryByIdProductDTOPagenation = ResponseCategoryByIdProductDTOPagenation;
class ProductsResponseBySubCategoryIdPagination extends ProductResponseBySubCategoryIdDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ProductsResponseBySubCategoryIdPagination.prototype, "total", void 0);
exports.ProductsResponseBySubCategoryIdPagination = ProductsResponseBySubCategoryIdPagination;
//# sourceMappingURL=products.model.js.map