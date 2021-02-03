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
const banner_model_1 = require("./banner.model");
let BannerService = class BannerService {
    constructor(bannerModel) {
        this.bannerModel = bannerModel;
    }
    async getAllEnabledBanners() {
        return await this.bannerModel.find({ status: true }, 'title bannerType filePath imageUrl categoryId productId description');
    }
    async getAllBanner(page, limit, search) {
        const skip = page * limit;
        let filter = {};
        if (search)
            filter = { title: { $regex: search, $options: 'i' } };
        return await this.bannerModel.find(filter, 'title bannerType filePath imageUrl categoryId categoryName productId productName description status').limit(limit).skip(skip);
    }
    async getBannerDetail(bannerId) {
        return await this.bannerModel.findOne({ _id: bannerId }, 'title bannerType filePath imageUrl categoryId categoryName productId productName description');
    }
    async countAllBanner(search) {
        let filter = {};
        if (search)
            filter = { title: { $regex: search, $options: 'i' } };
        return await this.bannerModel.countDocuments(filter);
    }
    async createBanner(bannerData) {
        return await this.bannerModel.create(bannerData);
    }
    async updateBanner(bannerId, bannerData) {
        return await this.bannerModel.findByIdAndUpdate(bannerId, bannerData);
    }
    async deleteBanner(bannerId) {
        return await this.bannerModel.findByIdAndRemove(bannerId);
    }
    async countBannerByCategoryId(categoryId) {
        return await this.bannerModel.countDocuments({ categoryId: categoryId });
    }
    async countBannerByProductId(productId) {
        return await this.bannerModel.countDocuments({ productId: productId });
    }
    async getBannerTypeList() {
        const list = {};
        for (var key in banner_model_1.BannerType) {
            const val = banner_model_1.BannerType[key];
            list[val] = val;
        }
        return list;
    }
};
BannerService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Banner')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BannerService);
exports.BannerService = BannerService;
//# sourceMappingURL=banner.service.js.map