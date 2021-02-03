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
const sub_categories_service_1 = require("./sub-categories.service");
const categories_service_1 = require("../categories/categories.service");
const sub_categories_model_1 = require("./sub-categories.model");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const util_service_1 = require("../utils/util.service");
const users_model_1 = require("../users/users.model");
const app_model_1 = require("../utils/app.model");
const jwt_strategy_1 = require("../utils/jwt.strategy");
const products_service_1 = require("../products/products.service");
let SubCategoryController = class SubCategoryController {
    constructor(subCategoryService, categoryService, productService, utilService) {
        this.subCategoryService = subCategoryService;
        this.categoryService = categoryService;
        this.productService = productService;
        this.utilService = utilService;
    }
    async getAllEnabledSubCategories() {
        try {
            const subCategories = await this.subCategoryService.getAllEnabledSubCategories();
            return this.utilService.successResponseData(subCategories);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAllSubCategories(user, adminQuery) {
        this.utilService.validateAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const subCategories = await Promise.all([
                this.subCategoryService.getAllSubCategories(pagination.page - 1, pagination.limit, pagination.q),
                this.subCategoryService.countAllSubCategories(pagination.q)
            ]);
            return this.utilService.successResponseData(subCategories[0], { total: subCategories[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getDropdownListCategory(user, categoryId) {
        this.utilService.validateAdminRole(user);
        try {
            const subCategories = await this.subCategoryService.getDropdownListSubCategory(categoryId);
            return this.utilService.successResponseData(subCategories);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getSubCategoryDetail(user, subCategoryId) {
        this.utilService.validateAdminRole(user);
        try {
            const subCategory = await this.subCategoryService.getSubCategoryDetail(subCategoryId);
            if (!subCategory)
                this.utilService.badRequest(app_model_1.ResponseMessage.SUB_CATEGORY_NOT_FOUND);
            else
                return this.utilService.successResponseData(subCategory);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async createSubCategory(user, subCategoryData) {
        this.utilService.validateAdminRole(user);
        try {
            const subCategoryExist = await this.subCategoryService.findSubCategoryByTitle(subCategoryData.title, subCategoryData.categoryId);
            if (subCategoryExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.SUB_CATEGORY_ALREADY_EXIST);
            const category = await this.categoryService.getCategorieDetail(subCategoryData.categoryId);
            if (!category)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
            subCategoryData.categoryName = category.title;
            const subCategory = await this.subCategoryService.createSubCategory(subCategoryData);
            if (subCategory) {
                const category = await this.categoryService.increaseSubCategoryCount(subCategoryData.categoryId);
                if (category)
                    return this.utilService.successResponseMsg(app_model_1.ResponseMessage.SUB_CATEGORY_SAVED);
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateSubCategory(user, subCategoryId, subCategoryData) {
        this.utilService.validateAdminRole(user);
        try {
            const subCategoryExist = await this.subCategoryService.getSubCategoryDetail(subCategoryId);
            if (!subCategoryExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.SUB_CATEGORY_NOT_FOUND);
            const category = await this.categoryService.getCategorieDetail(subCategoryData.categoryId);
            if (!category)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
            subCategoryData.categoryName = category.title;
            const subCategory = await this.subCategoryService.updateSubCategory(subCategoryId, subCategoryData);
            if (subCategory)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.SUB_CATEGORY_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateStatusSubCategory(user, subCategoryId, statusData) {
        this.utilService.validateAdminRole(user);
        try {
            const subCategoryExist = await this.subCategoryService.getSubCategoryDetail(subCategoryId);
            if (!subCategoryExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.SUB_CATEGORY_NOT_FOUND);
            const subCategory = await this.subCategoryService.updateSubCategoryStatus(subCategoryId, statusData);
            if (subCategory)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.SUB_CATEGORY_STATUS_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteSubCategory(user, subCategoryId) {
        this.utilService.validateAdminRole(user);
        try {
            const subCategoryData = await this.subCategoryService.getSubCategoryDetail(subCategoryId);
            if (!subCategoryData)
                this.utilService.badRequest(app_model_1.ResponseMessage.SUB_CATEGORY_NOT_FOUND);
            const products = await this.productService.countAllProductBySubCategory(subCategoryId);
            if (products && products > 0)
                this.utilService.badRequest(app_model_1.ResponseMessage.SUB_CATEGORY_NOT_DELETED_HAVE_PRODUCT);
            const subCategory = await this.subCategoryService.deleteSubCategory(subCategoryId);
            if (subCategory) {
                const category = await this.categoryService.descreaseSubCategoryCount(subCategoryData.categoryId);
                if (category)
                    return this.utilService.successResponseMsg(app_model_1.ResponseMessage.SUB_CATEGORY_DELETED);
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
            }
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
    swagger_1.ApiOperation({ title: 'Get All enabled sub-categories' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of enabled sub-categories', type: sub_categories_model_1.ResponseSubCategoryUserListDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getAllEnabledSubCategories", null);
__decorate([
    common_1.Get('/admin/list'),
    swagger_1.ApiOperation({ title: 'Get All sub-categories' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of category', type: sub_categories_model_1.ResponseSubCategoryListDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getAllSubCategories", null);
__decorate([
    common_1.Get('/admin/dropdown-list/:categoryId'),
    swagger_1.ApiOperation({ title: 'Get all sub-categories by categoryId' }),
    swagger_1.ApiResponse({ status: 200, description: ' Return list of sub-categories by categoryId', type: sub_categories_model_1.ResponseSubCategoryDrpodownDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getDropdownListCategory", null);
__decorate([
    common_1.Get('/admin/detail/:subCategoryId'),
    swagger_1.ApiOperation({ title: 'Get sub-category detail by subCategoryId' }),
    swagger_1.ApiResponse({ status: 200, description: 'sub-category detail', type: sub_categories_model_1.ResponseSubCategoryDetailDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('subCategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getSubCategoryDetail", null);
__decorate([
    common_1.Post('/admin/create'),
    swagger_1.ApiOperation({ title: 'Create sub-category' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, sub_categories_model_1.SubCategorySaveDTO]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "createSubCategory", null);
__decorate([
    common_1.Put('/admin/update/:subCategoryId'),
    swagger_1.ApiOperation({ title: 'Update sub-category by subCategoryId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('subCategoryId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, sub_categories_model_1.SubCategorySaveDTO]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "updateSubCategory", null);
__decorate([
    common_1.Put('/admin/status-update/:subCategoryId'),
    swagger_1.ApiOperation({ title: 'Update sub-category status by subCategoryId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('subCategoryId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, sub_categories_model_1.SubCategoryStatusDTO]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "updateStatusSubCategory", null);
__decorate([
    common_1.Delete('/admin/delete/:subCategoryId'),
    swagger_1.ApiOperation({ title: 'Delete sub-category by subCategoryId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('subCategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "deleteSubCategory", null);
SubCategoryController = __decorate([
    common_1.Controller('sub-categories'),
    swagger_1.ApiUseTags('Sub Categories'),
    __metadata("design:paramtypes", [sub_categories_service_1.SubCategoryService,
        categories_service_1.CategoryService,
        products_service_1.ProductService,
        util_service_1.UtilService])
], SubCategoryController);
exports.SubCategoryController = SubCategoryController;
//# sourceMappingURL=sub-categories.controller.js.map