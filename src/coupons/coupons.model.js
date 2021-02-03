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
var CouponType;
(function (CouponType) {
    CouponType["PERCENTAGE"] = "PERCENTAGE";
    CouponType["AMOUNT"] = "AMOUNT";
})(CouponType = exports.CouponType || (exports.CouponType = {}));
exports.CouponSchema = new mongoose.Schema({
    couponCode: { type: String },
    description: { type: String },
    offerValue: { type: Number },
    startDate: { type: Number },
    expiryDate: { type: Number },
    couponType: { type: CouponType },
    status: { type: Boolean, default: true }
}, {
    timestamps: true
});
class CouponsDTO {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CouponsDTO.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CouponsDTO.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CouponsDTO.prototype, "couponCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    class_validator_1.Max(100),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], CouponsDTO.prototype, "offerValue", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CouponsDTO.prototype, "startDate", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CouponsDTO.prototype, "expiryDate", void 0);
__decorate([
    swagger_1.ApiModelProperty({ enum: Object.keys(CouponType) }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(CouponType, { message: 'Coupon discount type must be one of these ' + Object.keys(CouponType) }),
    __metadata("design:type", String)
], CouponsDTO.prototype, "couponType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CouponsDTO.prototype, "status", void 0);
exports.CouponsDTO = CouponsDTO;
class ResponseCouponsDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseCouponsDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseCouponsDTO.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseCouponsDTO.prototype, "couponCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseCouponsDTO.prototype, "offerValue", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseCouponsDTO.prototype, "startDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseCouponsDTO.prototype, "expiryDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseCouponsDTO.prototype, "couponType", void 0);
exports.ResponseCouponsDTO = ResponseCouponsDTO;
class CouponStatusDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CouponStatusDTO.prototype, "status", void 0);
exports.CouponStatusDTO = CouponStatusDTO;
class CouponCodeDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CouponCodeDTO.prototype, "couponCode", void 0);
exports.CouponCodeDTO = CouponCodeDTO;
class ResponseCouponsList {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseCouponsList.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", CouponsDTO)
], ResponseCouponsList.prototype, "response_data", void 0);
exports.ResponseCouponsList = ResponseCouponsList;
class ResponseCouponsListData extends ResponseCouponsList {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseCouponsListData.prototype, "total", void 0);
exports.ResponseCouponsListData = ResponseCouponsListData;
class ResponseCouponsData {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseCouponsData.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseCouponsDTO)
], ResponseCouponsData.prototype, "response_data", void 0);
exports.ResponseCouponsData = ResponseCouponsData;
//# sourceMappingURL=coupons.model.js.map