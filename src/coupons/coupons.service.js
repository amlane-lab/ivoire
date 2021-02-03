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
let CouponService = class CouponService {
    constructor(couponsModel) {
        this.couponsModel = couponsModel;
    }
    async getAllCoupon(page, limit, search) {
        const skip = page * limit;
        let filter = {};
        if (search)
            filter = { couponCode: { $regex: search, $options: 'i' } };
        const coupons = await this.couponsModel.find(filter, 'couponType offerValue description startDate expiryDate couponCode status').limit(limit).skip(skip);
        return coupons;
    }
    async countAllCoupon(search) {
        let filter = {};
        if (search)
            filter = { couponCode: { $regex: search, $options: 'i' } };
        return await this.couponsModel.countDocuments(filter);
    }
    async getCouponDetail(couponId) {
        const coupon = await this.couponsModel.findById(couponId, 'title couponType offerValue description startDate expiryDate couponCode');
        return coupon;
    }
    async findCouponByCode(code) {
        const coupon = await this.couponsModel.findOne({ couponCode: code }, 'couponCode offerValue couponType');
        return coupon;
    }
    async getCouponDetailByCode(code) {
        const coupon = await this.couponsModel.findOne({ couponCode: code, status: true });
        return coupon;
    }
    async createCoupon(couponData) {
        const coupon = await this.couponsModel.create(couponData);
        return coupon;
    }
    async updateCoupon(couponId, couponData) {
        const coupon = await this.couponsModel.findByIdAndUpdate(couponId, couponData, { new: true });
        return coupon;
    }
    async deleteCoupon(couponId) {
        const coupon = await this.couponsModel.findByIdAndDelete(couponId);
        return coupon;
    }
    async couponStatusUpdate(id, couponStatusData) {
        const coupon = await this.couponsModel.findByIdAndUpdate(id, couponStatusData, { new: true });
        return coupon;
    }
};
CouponService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Coupon')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CouponService);
exports.CouponService = CouponService;
//# sourceMappingURL=coupons.service.js.map