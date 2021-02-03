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
const Product = {
    productId: { type: String },
    productName: { type: String },
    unit: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    productTotal: { type: Number },
    imageUrl: { type: String },
    filePath: { type: String },
    dealAmount: { type: Number },
    dealPercent: { type: Number },
    dealTotalAmount: { type: Number },
    isDealAvailable: { type: Boolean },
    productImages: { type: Array },
    categoryId: { type: String },
    subCategoryId: { type: String },
};
exports.CartSchema = new mongoose.Schema({
    products: [Product],
    productIds: [{ type: String }],
    subTotal: { type: Number },
    grandTotal: { type: Number },
    tax: { type: Number },
    taxInfo: { type: Object },
    deliveryCharges: { type: Number },
    deliveryAddress: { type: String },
    userId: { type: String },
    couponCode: { type: String },
    couponAmount: { type: Number, default: 0 },
    walletAmount: { type: Number, default: 0 },
    isOrderLinked: { type: Boolean, default: false },
}, {
    timestamps: true
});
exports.ProductOrderUserSchema = new mongoose.Schema({
    userId: { type: String },
    productId: { type: String },
    isRated: { type: Boolean, default: false },
    rating: { type: Number, default: 0 }
}, {
    timestamps: true
});
class CartModelDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CartModelDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CartModelDTO.prototype, "products", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CartModelDTO.prototype, "productIds", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CartModelDTO.prototype, "subTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CartModelDTO.prototype, "tax", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CartModelDTO.prototype, "isFreeDelivery", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CartModelDTO.prototype, "grandTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CartModelDTO.prototype, "deliveryCharges", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CartModelDTO.prototype, "user", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CartModelDTO.prototype, "deliveryAddress", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CartModelDTO.prototype, "isOrderLinked", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CartModelDTO.prototype, "coupon", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], CartModelDTO.prototype, "couponInfo", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], CartModelDTO.prototype, "taxInfo", void 0);
exports.CartModelDTO = CartModelDTO;
class DeleteCartProductDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsMongoId(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DeleteCartProductDTO.prototype, "cartId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsMongoId(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DeleteCartProductDTO.prototype, "productId", void 0);
exports.DeleteCartProductDTO = DeleteCartProductDTO;
class CartUpdateDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CartUpdateDTO.prototype, "productId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CartUpdateDTO.prototype, "unit", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CartUpdateDTO.prototype, "quantity", void 0);
exports.CartUpdateDTO = CartUpdateDTO;
class UpdateCartDTO {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateCartDTO.prototype, "cartId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsMongoId(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateCartDTO.prototype, "productId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    class_validator_1.Min(1),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UpdateCartDTO.prototype, "quantity", void 0);
exports.UpdateCartDTO = UpdateCartDTO;
class CartProductDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CartProductDTO.prototype, "productId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CartProductDTO.prototype, "productName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CartProductDTO.prototype, "unit", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CartProductDTO.prototype, "price", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CartProductDTO.prototype, "quantity", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CartProductDTO.prototype, "productTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CartProductDTO.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CartProductDTO.prototype, "filePath", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CartProductDTO.prototype, "dealAmount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CartProductDTO.prototype, "dealPercent", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CartProductDTO.prototype, "dealTotalAmount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CartProductDTO.prototype, "isDealAvailable", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: [products_model_1.ProductImagesDTO] }),
    __metadata("design:type", Array)
], CartProductDTO.prototype, "productImages", void 0);
exports.CartProductDTO = CartProductDTO;
class TaxDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TaxDTO.prototype, "taxName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TaxDTO.prototype, "amount", void 0);
exports.TaxDTO = TaxDTO;
class UserCartDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserCartDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: CartProductDTO }),
    __metadata("design:type", Array)
], UserCartDTO.prototype, "products", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], UserCartDTO.prototype, "productIds", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UserCartDTO.prototype, "couponAmount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UserCartDTO.prototype, "walletAmount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], UserCartDTO.prototype, "isOrderLinked", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UserCartDTO.prototype, "subTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UserCartDTO.prototype, "tax", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UserCartDTO.prototype, "grandTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UserCartDTO.prototype, "deliveryCharges", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", TaxDTO)
], UserCartDTO.prototype, "taxInfo", void 0);
exports.UserCartDTO = UserCartDTO;
class ResponseMyCartDetail {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseMyCartDetail.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", UserCartDTO)
], ResponseMyCartDetail.prototype, "response_data", void 0);
exports.ResponseMyCartDetail = ResponseMyCartDetail;
class UpdateAddressDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateAddressDTO.prototype, "deliveryAddress", void 0);
exports.UpdateAddressDTO = UpdateAddressDTO;
//# sourceMappingURL=cart.model.js.map