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
const platform_express_1 = require("@nestjs/platform-express");
const banner_service_1 = require("./banner.service");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../users/users.model");
const banner_model_1 = require("./banner.model");
const util_service_1 = require("../utils/util.service");
const app_model_1 = require("../utils/app.model");
const upload_service_1 = require("../utils/upload.service");
const categories_service_1 = require("../categories/categories.service");
const products_service_1 = require("../products/products.service");
const jwt_strategy_1 = require("../utils/jwt.strategy");
let BannerController = class BannerController {
    constructor(bannerService, categoryService, ProductService, utilService, uploadService) {
        this.bannerService = bannerService;
        this.categoryService = categoryService;
        this.ProductService = ProductService;
        this.utilService = utilService;
        this.uploadService = uploadService;
    }
    async getAllEnabledBanners() {
        try {
            const banners = await this.bannerService.getAllEnabledBanners();
            return this.utilService.successResponseData(banners);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAllBanner(user, adminQuery) {
        this.utilService.validateAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const banners = await Promise.all([
                this.bannerService.getAllBanner(pagination.page - 1, pagination.limit, pagination.q),
                this.bannerService.countAllBanner(pagination.q)
            ]);
            return this.utilService.successResponseData(banners[0], { total: banners[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getBannerDetail(user, bannerId) {
        this.utilService.validateAdminRole(user);
        try {
            const banner = await this.bannerService.getBannerDetail(bannerId);
            if (banner)
                return this.utilService.successResponseData(banner);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.BANNER_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async createBanner(user, bannerData) {
        this.utilService.validateAdminRole(user);
        try {
            if (bannerData.bannerType === banner_model_1.BannerType.CATEGORY && !bannerData.categoryId) {
                this.utilService.badRequest(app_model_1.ResponseMessage.BANNER_CATEGORY_ID_MISSING);
            }
            else if (bannerData.bannerType === banner_model_1.BannerType.PRODUCT && !bannerData.productId) {
                this.utilService.badRequest(app_model_1.ResponseMessage.BANNER_PRODUCT_ID_MISSING);
            }
            if (bannerData.bannerType === banner_model_1.BannerType.CATEGORY) {
                const category = await this.categoryService.getCategorieDetail(bannerData.categoryId);
                if (!category)
                    this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
                bannerData.categoryName = category.title;
                bannerData.productId = null;
            }
            else if (bannerData.bannerType === banner_model_1.BannerType.PRODUCT) {
                const product = await this.ProductService.getProductDetail(bannerData.productId);
                if (!product)
                    this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
                bannerData.productName = product.title;
                bannerData.categoryId = null;
            }
            const banner = await this.bannerService.createBanner(bannerData);
            if (banner)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.BANNER_SAVED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateBanner(user, bannerId, bannerData) {
        this.utilService.validateAdminRole(user);
        try {
            const bannerExist = await this.bannerService.getBannerDetail(bannerId);
            if (!bannerExist._id)
                this.utilService.badRequest(app_model_1.ResponseMessage.BANNER_NOT_FOUND);
            if (bannerData.bannerType === banner_model_1.BannerType.CATEGORY && !bannerData.categoryId) {
                this.utilService.badRequest(app_model_1.ResponseMessage.BANNER_CATEGORY_ID_MISSING);
            }
            else if (bannerData.bannerType === banner_model_1.BannerType.PRODUCT && !bannerData.productId) {
                this.utilService.badRequest(app_model_1.ResponseMessage.BANNER_PRODUCT_ID_MISSING);
            }
            if (bannerData.bannerType === banner_model_1.BannerType.CATEGORY) {
                const category = await this.categoryService.getCategorieDetail(bannerData.categoryId);
                if (!category._id)
                    this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
                bannerData.categoryName = category.title;
                bannerData.productId = null;
            }
            else if (bannerData.bannerType === banner_model_1.BannerType.PRODUCT) {
                const product = await this.ProductService.getProductDetail(bannerData.productId);
                if (!product._id)
                    this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
                bannerData.productName = product.title;
                bannerData.categoryId = null;
            }
            const banner = await this.bannerService.updateBanner(bannerId, bannerData);
            if (banner)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.BANNER_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteBanner(user, bannerId) {
        this.utilService.validateAdminRole(user);
        try {
            const bannerExist = await this.bannerService.getBannerDetail(bannerId);
            if (!bannerExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.BANNER_NOT_FOUND);
            const banner = await this.bannerService.deleteBanner(bannerId);
            if (banner)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.BANNER_DELETED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async categoryImageUpload(user, file, image) {
        this.utilService.validateAdminRole(user);
        try {
            const uploadedImage = await this.uploadService.uploadImage(file, image.type);
            if (uploadedImage && uploadedImage.url)
                return this.utilService.successResponseData(uploadedImage);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getBannerTypeList(user) {
        this.utilService.validateAdminRole(user);
        try {
            const bannerTypeList = await this.bannerService.getBannerTypeList();
            return this.utilService.successResponseData(bannerTypeList);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/list'),
    swagger_1.ApiOperation({ title: 'Get all enabled banner for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of enabled banners', type: banner_model_1.ResponseUserBannerList }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "getAllEnabledBanners", null);
__decorate([
    common_1.Get('/admin/list'),
    swagger_1.ApiOperation({ title: 'Get all banner list' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of banners', type: banner_model_1.ResponseBannerList }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "getAllBanner", null);
__decorate([
    common_1.Get('/admin/detail/:bannerId'),
    swagger_1.ApiOperation({ title: 'Get banner by bannerId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Get banner detail by bannerId', type: banner_model_1.ResponseBanner }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('bannerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "getBannerDetail", null);
__decorate([
    common_1.Post('/admin/create'),
    swagger_1.ApiOperation({ title: 'Create banner' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, banner_model_1.BannerSaveDTO]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "createBanner", null);
__decorate([
    common_1.Put('/admin/update/:bannerId'),
    swagger_1.ApiOperation({ title: 'Update banner by bannerId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('bannerId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, banner_model_1.BannerSaveDTO]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "updateBanner", null);
__decorate([
    common_1.Delete('/admin/delete/:bannerId'),
    swagger_1.ApiOperation({ title: 'Delete banner by bannerId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('bannerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "deleteBanner", null);
__decorate([
    common_1.Post('/admin/upload/image'),
    swagger_1.ApiOperation({ title: 'Banner image upload' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return image detail', type: app_model_1.UploadImageResponseDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiImplicitFile({ name: 'file', required: true, description: 'Banner image upload' }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.UploadedFile()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, Object, app_model_1.UploadImageDTO]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "categoryImageUpload", null);
__decorate([
    common_1.Get('/admin/type/list'),
    swagger_1.ApiOperation({ title: 'Get all banner type for dropdown' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of banner type', type: banner_model_1.ResponseBannerType }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], BannerController.prototype, "getBannerTypeList", null);
BannerController = __decorate([
    common_1.Controller('banners'),
    swagger_1.ApiUseTags('Banners'),
    __metadata("design:paramtypes", [banner_service_1.BannerService,
        categories_service_1.CategoryService,
        products_service_1.ProductService,
        util_service_1.UtilService,
        upload_service_1.UploadService])
], BannerController);
exports.BannerController = BannerController;
//# sourceMappingURL=banner.controller.js.map