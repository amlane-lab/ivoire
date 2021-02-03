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
const categories_service_1 = require("./categories.service");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../users/users.model");
const categories_model_1 = require("./categories.model");
const util_service_1 = require("../utils/util.service");
const upload_service_1 = require("../utils/upload.service");
const app_model_1 = require("../utils/app.model");
const products_service_1 = require("../products/products.service");
const sub_categories_service_1 = require("../sub-categories/sub-categories.service");
const jwt_strategy_1 = require("../utils/jwt.strategy");
const banner_service_1 = require("../banner/banner.service");
const deals_service_1 = require("../deals/deals.service");
let CategoryController = class CategoryController {
    constructor(categoryService, SubCategoryService, productService, bannerService, dealService, utilService, uploadService) {
        this.categoryService = categoryService;
        this.SubCategoryService = SubCategoryService;
        this.productService = productService;
        this.bannerService = bannerService;
        this.dealService = dealService;
        this.utilService = utilService;
        this.uploadService = uploadService;
    }
    async getAllEnabledCategories() {
        try {
            const categories = await this.categoryService.getAllEnabledCategories();
            return this.utilService.successResponseData(categories);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAllCategories(user, adminQuery) {
        this.utilService.validateAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const categories = await Promise.all([
                this.categoryService.getAllCategories(pagination.page - 1, pagination.limit, pagination.q),
                this.categoryService.countAllCategory(pagination.q)
            ]);
            return this.utilService.successResponseData(categories[0], { total: categories[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getCategorieDetail(user, categoryId) {
        this.utilService.validateAdminRole(user);
        try {
            const category = await this.categoryService.getCategorieDetail(categoryId);
            if (category)
                return this.utilService.successResponseData(category);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getDropdownListCategory(user) {
        this.utilService.validateAdminRole(user);
        try {
            const categories = await this.categoryService.getDropdownListCategory();
            return this.utilService.successResponseData(categories);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async createCategory(user, categoryData) {
        this.utilService.validateAdminRole(user);
        try {
            const categoryExist = await this.categoryService.findCategoryByTitle(categoryData.title);
            if (categoryExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_ALREADY_EXIST);
            categoryData.userId = user._id;
            const category = await this.categoryService.createCategory(categoryData);
            if (category)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.CATEGORY_SAVED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateCategory(user, categoryId, categoryData) {
        this.utilService.validateAdminRole(user);
        try {
            const categoryExist = await this.categoryService.getCategorieDetail(categoryId);
            if (!categoryExist._id)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
            const category = await this.categoryService.updateCategory(categoryId, categoryData);
            if (category._id)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.CATEGORY_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateCategoryStatus(user, categoryId, categoryStatusData) {
        this.utilService.validateAdminRole(user);
        try {
            const categoryExist = await this.categoryService.getCategorieDetail(categoryId);
            if (!categoryExist._id)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
            const updates = await Promise.all([
                this.categoryService.statusUpdate(categoryId, categoryStatusData),
                this.SubCategoryService.updateSubCategortStatusByCategoryId(categoryId, categoryStatusData),
                this.productService.updateProductStatusByCategoryId(categoryId, categoryStatusData)
            ]);
            if (updates[0])
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.CATEGORY_STATUS_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteCategory(user, categoryId) {
        this.utilService.validateAdminRole(user);
        try {
            const categoryExist = await this.categoryService.getCategorieDetail(categoryId);
            if (!categoryExist._id)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
            if (categoryExist.subCategoryCount > 0)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_DELETED_HAVE_SUBCATEGORY);
            const products = await this.productService.countProductByCategoryId(categoryId);
            if (products)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_DELETED_HAVE_PRODUCT);
            const banners = await this.bannerService.countBannerByCategoryId(categoryId);
            if (banners)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_DELETED_HAVE_BANNER);
            const deals = await this.dealService.countDealByCategoryId(categoryId);
            if (deals)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_DELETED_HAVE_DEAL);
            const category = await this.categoryService.deleteCategory(categoryId);
            if (category)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.CATEGORY_DELETED);
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
            if (uploadedImage.url)
                return this.utilService.successResponseData(uploadedImage);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/list'),
    swagger_1.ApiOperation({ title: 'Get All enabled categories' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of enabled categories', type: categories_model_1.ResponseUserCategoryList }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllEnabledCategories", null);
__decorate([
    common_1.Get('/admin/list'),
    swagger_1.ApiOperation({ title: 'Get All categories for admin' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of category', type: categories_model_1.ResponseCategoryAdmin }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllCategories", null);
__decorate([
    common_1.Get('/admin/detail/:categoryId'),
    swagger_1.ApiOperation({ title: 'Get category detail by categoryId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return category detail by categoryId', type: categories_model_1.CategoryAdminDetailDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategorieDetail", null);
__decorate([
    common_1.Get('/admin/dropdown-list'),
    swagger_1.ApiOperation({ title: 'Get category Id and Tilte ' }),
    swagger_1.ApiResponse({ status: 200, description: 'return Api response in array of Object', type: categories_model_1.ResponseDropDown }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getDropdownListCategory", null);
__decorate([
    common_1.Post('/admin/create'),
    swagger_1.ApiOperation({ title: 'Create category' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, categories_model_1.CategorySaveDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    common_1.Put('/admin/update/:categoryId'),
    swagger_1.ApiOperation({ title: 'Update category by categoryId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('categoryId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, categories_model_1.CategorySaveDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    common_1.Put('/admin/status-update/:categoryId'),
    swagger_1.ApiOperation({ title: 'Update category status by categoryId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('categoryId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, categories_model_1.CategoryStatusUpdateDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategoryStatus", null);
__decorate([
    common_1.Delete('/admin/delete/:categoryId'),
    swagger_1.ApiOperation({ title: 'Delete category by categoryId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    common_1.Post('/admin/upload/image'),
    swagger_1.ApiOperation({ title: 'Category image upload' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return image detail', type: app_model_1.UploadImageResponseDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiImplicitFile({ name: 'file', required: true, description: 'Category image upload' }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.UploadedFile()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, Object, app_model_1.UploadImageDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "categoryImageUpload", null);
CategoryController = __decorate([
    common_1.Controller('categories'),
    swagger_1.ApiUseTags('Categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoryService,
        sub_categories_service_1.SubCategoryService,
        products_service_1.ProductService,
        banner_service_1.BannerService,
        deals_service_1.DealService,
        util_service_1.UtilService,
        upload_service_1.UploadService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=categories.controller.js.map