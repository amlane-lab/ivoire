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
const deals_model_1 = require("./deals.model");
let DealService = class DealService {
    constructor(dealsModel) {
        this.dealsModel = dealsModel;
    }
    async getAllDeal(page, limit, search) {
        const skip = page * limit;
        let filter = {};
        if (search)
            filter = { title: { $regex: search, $options: 'i' } };
        return await this.dealsModel.find(filter).limit(limit).skip(skip);
    }
    async countAllDeal(search) {
        let filter = {};
        if (search)
            filter = { title: { $regex: search, $options: 'i' } };
        return await this.dealsModel.countDocuments(filter);
    }
    async getDealDetail(dealId) {
        return await this.dealsModel.findById(dealId);
    }
    async getDealByCategoryId(categoryId) {
        return await this.dealsModel.findOne({ categoryId: categoryId });
    }
    async getDealByProductId(productId) {
        return await this.dealsModel.findOne({ productId: productId });
    }
    async countDealByCategoryId(categoryId) {
        return await this.dealsModel.countDocuments({ categoryId: categoryId });
    }
    async countDealByProductId(productId) {
        return await this.dealsModel.countDocuments({ productId: productId });
    }
    async createDeal(dealData) {
        return await this.dealsModel.create(dealData);
    }
    async updateDeal(dealId, dealData) {
        return await this.dealsModel.findByIdAndUpdate(dealId, dealData, { new: true });
    }
    async deleteDeal(dealId) {
        return await this.dealsModel.findByIdAndRemove(dealId);
    }
    async updateDealStatus(dealId, dealStatusData) {
        return await this.dealsModel.findByIdAndUpdate(dealId, dealStatusData, { new: true });
    }
    async topDeals() {
        return await this.dealsModel.find({ status: true, topDeal: true }, 'title imageUrl filePath dealPercent dealType categoryId productId products').sort({ createdAt: -1 });
    }
    async topDealsForHome(limit) {
        limit = limit || 10;
        return await this.dealsModel.find({ status: true, topDeal: true }, 'title imageUrl filePath dealPercent dealType categoryId productId products').limit(limit).sort({ createdAt: -1 });
    }
    async dealOfTheDay() {
        return await this.dealsModel.find({ status: true }, 'title imageUrl filePath dealPercent dealType categoryId productId products').sort({ createdAt: -1 });
    }
    async dealOfTheDayForHome(limit) {
        limit = limit || 10;
        return await this.dealsModel.find({ status: true }, 'title imageUrl filePath dealPercent dealType categoryId productId products').limit(limit).sort({ createdAt: -1 });
    }
    async getDealTypeList() {
        const list = {};
        for (var key in deals_model_1.DealType) {
            const val = deals_model_1.DealType[key];
            list[val] = val;
        }
        return list;
    }
};
DealService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Deal')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DealService);
exports.DealService = DealService;
//# sourceMappingURL=deals.service.js.map