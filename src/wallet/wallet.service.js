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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const wallet_model_1 = require("./wallet.model");
let WalletService = class WalletService {
    constructor(walletModel) {
        this.walletModel = walletModel;
    }
    async walletHistory(userId, page, limit) {
        const skip = page * limit;
        let wallets = await this.walletModel.find({ userId: userId }).sort({ createdAt: -1 }).limit(limit).skip(skip);
        ;
        return wallets;
    }
    async countWalletHistory(userId) {
        return await this.walletModel.countDocuments({ userId: userId });
    }
    async cancelOrder(walletData) {
        walletData.isCredited = true;
        walletData.transactionType = wallet_model_1.WalletTransactionType.ORDER_CANCELLED;
        let wallet = await this.walletModel.create(walletData);
        return wallet;
    }
    async orderModified(walletData) {
        walletData.isCredited = true;
        walletData.transactionType = wallet_model_1.WalletTransactionType.ORDER_MODIFIED;
        let wallet = await this.walletModel.create(walletData);
        return wallet;
    }
    async madeOrder(walletData) {
        walletData.isCredited = false;
        walletData.transactionType = wallet_model_1.WalletTransactionType.ORDER_PAYMENT;
        let wallet = await this.walletModel.create(walletData);
        return wallet;
    }
};
WalletService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Wallet')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map