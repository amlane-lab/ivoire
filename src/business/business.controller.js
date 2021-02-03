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
const business_service_1 = require("./business.service");
const business_model_1 = require("./business.model");
const users_model_1 = require("../users/users.model");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const app_model_1 = require("../utils/app.model");
const util_service_1 = require("../utils/util.service");
const jwt_strategy_1 = require("../utils/jwt.strategy");
let BusinessController = class BusinessController {
    constructor(businessService, utilService) {
        this.businessService = businessService;
        this.utilService = utilService;
    }
    async getBussinessDetailUser() {
        try {
            const business = await this.businessService.getBussinessDetailForUser();
            return this.utilService.successResponseData(business);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getBusinessinfomation(user) {
        this.utilService.validateAdminRole(user);
        try {
            const business = await this.businessService.getBusinessDetail();
            return this.utilService.successResponseData(business);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateBusiness(user, businesData) {
        this.utilService.validateAdminRole(user);
        try {
            const business = await this.businessService.updateBusiness(businesData);
            if (business)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.BUSINESS_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/detail'),
    swagger_1.ApiOperation({ title: 'Get business detail for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'return business detail', type: business_model_1.ResponseBusinessUser }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "getBussinessDetailUser", null);
__decorate([
    common_1.Get('/admin/detail'),
    swagger_1.ApiOperation({ title: 'Get business detail for admin' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return business detail', type: business_model_1.ResponseBusinessDetailAdmin }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "getBusinessinfomation", null);
__decorate([
    common_1.Put('/admin/update'),
    swagger_1.ApiOperation({ title: 'Update business detail' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, business_model_1.BusinessSaveDTO]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "updateBusiness", null);
BusinessController = __decorate([
    common_1.Controller('business'),
    swagger_1.ApiUseTags('Business'),
    __metadata("design:paramtypes", [business_service_1.BusinessService,
        util_service_1.UtilService])
], BusinessController);
exports.BusinessController = BusinessController;
//# sourceMappingURL=business.controller.js.map