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
const users_model_1 = require("../users/users.model");
const pages_service_1 = require("./pages.service");
const pages_model_1 = require("./pages.model");
const util_service_1 = require("../utils/util.service");
const app_model_1 = require("../utils/app.model");
const jwt_strategy_1 = require("../utils/jwt.strategy");
let PageController = class PageController {
    constructor(pageService, utilService) {
        this.pageService = pageService;
        this.utilService = utilService;
    }
    async getAboutUs() {
        try {
            const page = await this.pageService.getPage(pages_model_1.PageType.ABOUT_US);
            if (page)
                return this.utilService.successResponseData(page);
            else
                this.utilService.pageNotFound();
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getTermsConditions() {
        try {
            const page = await this.pageService.getPage(pages_model_1.PageType.TERMS_AND_CONDITIONS);
            if (page)
                return this.utilService.successResponseData(page);
            else
                this.utilService.pageNotFound();
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getPrivacyPage() {
        try {
            const page = await this.pageService.getPage(pages_model_1.PageType.PRIVACY_POLICY);
            if (page)
                return this.utilService.successResponseData(page);
            else
                this.utilService.pageNotFound();
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAboutUsForAdmin(user) {
        try {
            this.utilService.validateAdminRole(user);
            const page = await this.pageService.getPageForAdmin(pages_model_1.PageType.ABOUT_US);
            if (page)
                return this.utilService.successResponseData(page);
            else
                this.utilService.pageNotFound();
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getTermsConditionsForAdmin(user) {
        try {
            this.utilService.validateAdminRole(user);
            const page = await this.pageService.getPageForAdmin(pages_model_1.PageType.TERMS_AND_CONDITIONS);
            if (page)
                return this.utilService.successResponseData(page);
            else
                this.utilService.pageNotFound();
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getPrivacyPageForAdmin(user) {
        try {
            this.utilService.validateAdminRole(user);
            const page = await this.pageService.getPageForAdmin(pages_model_1.PageType.PRIVACY_POLICY);
            if (page)
                return this.utilService.successResponseData(page);
            else
                this.utilService.pageNotFound();
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updatePage(user, pageData) {
        this.utilService.validateAdminRole(user);
        try {
            const page = await this.pageService.updatePage(pageData.pageType, pageData);
            if (page)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.PAGE_UPADTED);
            else
                this.utilService.pageNotFound();
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/about-us'),
    swagger_1.ApiOperation({ title: 'Get About us page for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return about us page detail', type: pages_model_1.ResponsePageDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PageController.prototype, "getAboutUs", null);
__decorate([
    common_1.Get('/terms-and-conditions'),
    swagger_1.ApiOperation({ title: 'Get terms and conditions page for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return terms and conditions page detail', type: pages_model_1.ResponsePageDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PageController.prototype, "getTermsConditions", null);
__decorate([
    common_1.Get('/privacy-policy'),
    swagger_1.ApiOperation({ title: 'Get privacy policy page for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return privacy policy page detail', type: pages_model_1.ResponsePageDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PageController.prototype, "getPrivacyPage", null);
__decorate([
    common_1.Get('/admin/about-us'),
    swagger_1.ApiOperation({ title: 'Get About us page' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return about us page detail', type: pages_model_1.ResponseAdminPageDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "getAboutUsForAdmin", null);
__decorate([
    common_1.Get('/admin/terms-and-conditions'),
    swagger_1.ApiOperation({ title: 'Get terms and conditions page' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return terms and conditions page detail', type: pages_model_1.ResponseAdminPageDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "getTermsConditionsForAdmin", null);
__decorate([
    common_1.Get('/admin/privacy-policy'),
    swagger_1.ApiOperation({ title: 'Get privacy policy page' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return privacy policy page detail', type: pages_model_1.ResponseAdminPageDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "getPrivacyPageForAdmin", null);
__decorate([
    common_1.Put('/admin/update'),
    swagger_1.ApiOperation({ title: 'Update page' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, pages_model_1.PageSaveDTO]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "updatePage", null);
PageController = __decorate([
    common_1.Controller('pages'),
    swagger_1.ApiUseTags('Pages'),
    __metadata("design:paramtypes", [pages_service_1.PageService,
        util_service_1.UtilService])
], PageController);
exports.PageController = PageController;
//# sourceMappingURL=pages.controller.js.map