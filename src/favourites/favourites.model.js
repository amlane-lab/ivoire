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
const products_model_1 = require("../products/products.model");
exports.FavouriteSchema = new mongoose.Schema({
    productId: { type: Array },
    userId: { type: String }
}, {
    timestamps: true
});
class FavouritesDTO {
}
__decorate([
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], FavouritesDTO.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsMongoId(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FavouritesDTO.prototype, "productId", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], FavouritesDTO.prototype, "userId", void 0);
exports.FavouritesDTO = FavouritesDTO;
class FavouritesProductsDTO extends products_model_1.FavourutesResponseDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FavouritesProductsDTO.prototype, "productId", void 0);
exports.FavouritesProductsDTO = FavouritesProductsDTO;
class ResponseFavouritesDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseFavouritesDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", products_model_1.FavourutesResponseDTO)
], ResponseFavouritesDTO.prototype, "response_data", void 0);
exports.ResponseFavouritesDTO = ResponseFavouritesDTO;
//# sourceMappingURL=favourites.model.js.map