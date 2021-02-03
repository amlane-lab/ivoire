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
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const coupons_service_1 = require("./coupons.service");
const users_model_1 = require("../users/users.model");
const coupons_model_1 = require("./coupons.model");
const util_service_1 = require("../utils/util.service");
const app_model_1 = require("../utils/app.model");
const jwt_strategy_1 = require("../utils/jwt.strategy");
let CouponController = class CouponController {
    constructor(couponService, utilService) {
        this.couponService = couponService;
        this.utilService = utilService;
    }
    async getAllBanner(user, adminQuery) {
        this.utilService.validateAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const coupons = await Promise.all([
                this.couponService.getAllCoupon(pagination.page - 1, pagination.limit, pagination.q),
                this.couponService.countAllCoupon(pagination.q)
            ]);
            return this.utilService.successResponseData(coupons[0], { total: coupons[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async couponDetailAdmin(user, couponId) {
        this.utilService.validateAdminRole(user);
        try {
            const coupon = await this.couponService.getCouponDetail(couponId);
            if (coupon)
                return this.utilService.successResponseData(coupon);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.COUPON_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async createCoupon(user, couponData) {
        this.utilService.validateAdminRole(user);
        try {
            const couponExist = await this.couponService.findCouponByCode(couponData.couponCode);
            if (couponExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.COUPON_ALREADY_EXIST);
            couponData.couponCode = couponData.couponCode.trim();
            const coupon = await this.couponService.createCoupon(couponData);
            if (coupon)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.COUPON_SAVED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateCoupon(user, couponId, couponData) {
        this.utilService.validateAdminRole(user);
        try {
            const couponExist = await this.couponService.getCouponDetail(couponId.trim());
            if (!couponExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.COUPON_NOT_FOUND);
            couponData.couponCode = couponData.couponCode.trim();
            const codeExist = await this.couponService.findCouponByCode(couponData.couponCode);
            const coupon = await this.couponService.updateCoupon(couponId, couponData);
            if (coupon)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.COUPON_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteCoupon(user, couponId) {
        this.utilService.validateAdminRole(user);
        try {
            const couponExist = await this.couponService.getCouponDetail(couponId);
            if (!couponExist)
                return this.utilService.badRequest(app_model_1.ResponseMessage.COUPON_NOT_FOUND);
            const coupon = await this.couponService.deleteCoupon(couponId);
            if (coupon)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.COUPON_DELETED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateCouponStatus(user, couponId, couponStatusData) {
        this.utilService.validateAdminRole(user);
        try {
            const couponExist = await this.couponService.getCouponDetail(couponId);
            if (!couponExist)
                return this.utilService.badRequest(app_model_1.ResponseMessage.COUPON_NOT_FOUND);
            const coupon = await this.couponService.couponStatusUpdate(couponId, couponStatusData);
            if (coupon)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.COUPON_STATUS_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/admin/list'),
    swagger_1.ApiOperation({ title: 'Get List of Coupon' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of banners', type: coupons_model_1.ResponseCouponsListData }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getAllBanner", null);
__decorate([
    common_1.Get('/admin/detail/:couponId'),
    swagger_1.ApiOperation({ title: 'Get List of Coupon by couponId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return coupon detail by couponId', type: coupons_model_1.ResponseCouponsData }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('couponId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "couponDetailAdmin", null);
__decorate([
    common_1.Post('/admin/create'),
    swagger_1.ApiOperation({ title: 'Create Coupon' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, coupons_model_1.CouponsDTO]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "createCoupon", null);
__decorate([
    common_1.Put('/admin/update/:couponId'),
    swagger_1.ApiOperation({ title: 'update coupon by couponId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('couponId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, coupons_model_1.CouponsDTO]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "updateCoupon", null);
__decorate([
    common_1.Delete('/admin/delete/:couponId'),
    swagger_1.ApiOperation({ title: 'delete coupon by couponId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('couponId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "deleteCoupon", null);
__decorate([
    common_1.Put('/admin/status-update/:couponId'),
    swagger_1.ApiOperation({ title: 'update Coupon status  by couponId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('couponId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, coupons_model_1.CouponStatusDTO]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "updateCouponStatus", null);
CouponController = __decorate([
    common_1.Controller('coupons'),
    swagger_1.ApiUseTags('Coupons'),
    __metadata("design:paramtypes", [coupons_service_1.CouponService,
        util_service_1.UtilService])
], CouponController);
exports.CouponController = CouponController;
//# sourceMappingURL=coupons.controller.js.map