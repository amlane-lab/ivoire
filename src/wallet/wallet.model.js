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
var WalletTransactionType;
(function (WalletTransactionType) {
    WalletTransactionType["ORDER_CANCELLED"] = "ORDER_CANCELLED";
    WalletTransactionType["ORDER_PAYMENT"] = "ORDER_PAYMENT";
    WalletTransactionType["ORDER_MODIFIED"] = "ORDER_MODIFIED";
})(WalletTransactionType = exports.WalletTransactionType || (exports.WalletTransactionType = {}));
exports.WalletSchema = new mongoose.Schema({
    userId: { type: String },
    amount: { type: Number, default: 0 },
    transactionType: { type: WalletTransactionType },
    description: { type: String },
    isCredited: { type: Boolean, default: true },
    orderId: { type: String },
    orderID: { type: Number }
}, {
    timestamps: true
});
class WalletSaveDTO {
}
exports.WalletSaveDTO = WalletSaveDTO;
class WalletDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], WalletDTO.prototype, "amount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], WalletDTO.prototype, "transactionType", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], WalletDTO.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], WalletDTO.prototype, "isCredit", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], WalletDTO.prototype, "orderId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], WalletDTO.prototype, "orderID", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], WalletDTO.prototype, "userId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], WalletDTO.prototype, "createdAt", void 0);
exports.WalletDTO = WalletDTO;
class ResponseWalletHistory {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseWalletHistory.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", WalletDTO)
], ResponseWalletHistory.prototype, "response_data", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ResponseWalletHistory.prototype, "total", void 0);
exports.ResponseWalletHistory = ResponseWalletHistory;
//# sourceMappingURL=wallet.model.js.map