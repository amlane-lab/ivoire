"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const coupons_controller_1 = require("./coupons.controller");
const coupons_model_1 = require("./coupons.model");
const coupons_service_1 = require("./coupons.service");
let CouponsModule = class CouponsModule {
};
CouponsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Coupon', schema: coupons_model_1.CouponSchema }])
        ],
        controllers: [coupons_controller_1.CouponController],
        providers: [coupons_service_1.CouponService],
        exports: [coupons_service_1.CouponService, mongoose_1.MongooseModule]
    })
], CouponsModule);
exports.CouponsModule = CouponsModule;
//# sourceMappingURL=coupons.module.js.map