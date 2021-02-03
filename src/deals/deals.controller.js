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
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const deals_service_1 = require("./deals.service");
const users_model_1 = require("../users/users.model");
const deals_model_1 = require("./deals.model");
const util_service_1 = require("../utils/util.service");
const upload_service_1 = require("../utils/upload.service");
const categories_service_1 = require("../categories/categories.service");
const products_service_1 = require("../products/products.service");
const app_model_1 = require("../utils/app.model");
const jwt_strategy_1 = require("../utils/jwt.strategy");
const cart_service_1 = require("../cart/cart.service");
const products_model_1 = require("../products/products.model");
let DealController = class DealController {
    constructor(dealService, categoryService, productService, utilService, uploadService, cartService) {
        this.dealService = dealService;
        this.categoryService = categoryService;
        this.productService = productService;
        this.utilService = utilService;
        this.uploadService = uploadService;
        this.cartService = cartService;
    }
    async topDeal() {
        try {
            const deals = await this.dealService.topDeals();
            return this.utilService.successResponseData(deals);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async dealOfTheDay() {
        try {
            const deals = await this.dealService.dealOfTheDay();
            return this.utilService.successResponseData(deals);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getDealByProduct(user, dealId, userQuery) {
        let query = this.utilService.getUserPagination(userQuery);
        try {
            const deal = await this.dealService.getDealDetail(dealId);
            if (!deal)
                this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_NOT_FOUND);
            let productIds = [];
            let total = deal.products.length;
            deal.products.forEach(function (d) {
                productIds.push(d.productId);
            });
            let products = await this.productService.getDealProductByIds(productIds, query.page, query.limit);
            if (user && user._id) {
                let cart = await this.cartService.getCartByUserId(user._id);
                products = await this.productService.addCartInProduct(cart, products);
            }
            if (!products)
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
            return this.utilService.successResponseData(products, { total: total });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getDeals(user, adminQuery) {
        this.utilService.validateAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const deals = await Promise.all([
                this.dealService.getAllDeal(pagination.page - 1, pagination.limit, pagination.q),
                this.dealService.countAllDeal(pagination.q)
            ]);
            return this.utilService.successResponseData(deals[0], { total: deals[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getDealInformation(user, dealId) {
        this.utilService.validateAdminRole(user);
        try {
            const deal = await this.dealService.getDealDetail(dealId);
            if (deal)
                return this.utilService.successResponseData(deal);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async createDeal(user, dealData) {
        this.utilService.validateAdminRole(user);
        try {
            if (dealData.dealType === deals_model_1.DealType.CATEGORY && !dealData.categoryId) {
                this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_CATEGORY_ID_MISSING);
            }
            else if (dealData.dealType === deals_model_1.DealType.PRODUCT && !(dealData.productId || dealData.products.length > 0)) {
                this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_PRODUCT_ID_MISSING);
            }
            if (dealData.dealType === deals_model_1.DealType.CATEGORY) {
                const dealExist = await this.dealService.getDealByCategoryId(dealData.categoryId);
                if (dealExist)
                    this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_ALREADY_EXIST);
                const category = await this.categoryService.getCategorieDetail(dealData.categoryId);
                if (!category)
                    this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
                dealData.categoryName = category.title;
                dealData.productId = null;
                dealData.productName = null;
            }
            else if (dealData.dealType === deals_model_1.DealType.PRODUCT) {
                if (dealData.products && dealData.products.length > 0) {
                    for (let i = 0; i < dealData.products.length; i++) {
                        const dealExist = await this.dealService.getDealByProductId(dealData.products[i].productId);
                        if (dealExist)
                            this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_ALREADY_EXIST);
                        const product = await this.productService.getProductDetail(dealData.products[i].productId);
                        if (!product)
                            this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
                        dealData.products[i].productName = product.title;
                    }
                }
                else {
                    const dealExist = await this.dealService.getDealByProductId(dealData.productId);
                    if (dealExist)
                        this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_ALREADY_EXIST);
                    const product = await this.productService.getProductDetail(dealData.productId);
                    if (!product)
                        this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
                    dealData.productName = product.title;
                }
                dealData.categoryId = null;
                dealData.categoryName = null;
            }
            const deal = await this.dealService.createDeal(dealData);
            if (deal) {
                let dealObj = { isDealAvailable: true, dealPercent: deal.dealPercent, dealId: deal._id, dealType: deal.dealType };
                if (deal.dealType === deals_model_1.DealType.CATEGORY) {
                    await Promise.all([
                        this.productService.updateDealByCategoryId(deal.categoryId, dealObj),
                        this.categoryService.updateDeal(deal.categoryId, dealObj)
                    ]);
                }
                if (deal.dealType === deals_model_1.DealType.PRODUCT) {
                    if (dealData.products && dealData.products.length > 0) {
                        for (let i = 0; i < deal.products.length; i++) {
                            await this.productService.updateDealById(deal.products[i].productId, dealObj);
                        }
                    }
                    else {
                        await this.productService.updateDealById(deal.productId, dealObj);
                    }
                }
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.DEAL_SAVED);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateDeal(user, dealId, dealData) {
        this.utilService.validateAdminRole(user);
        try {
            const dealExist = await this.dealService.getDealDetail(dealId);
            if (!dealExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_NOT_FOUND);
            if (dealData.dealType === deals_model_1.DealType.CATEGORY && !dealData.categoryId) {
                this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_CATEGORY_ID_MISSING);
            }
            else if (dealData.dealType === deals_model_1.DealType.PRODUCT && !(dealData.productId || dealData.products.length > 0)) {
                this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_PRODUCT_ID_MISSING);
            }
            if (dealExist) {
                let dealObj = { isDealAvailable: false };
                if (dealExist.dealType === deals_model_1.DealType.CATEGORY) {
                    await Promise.all([
                        this.productService.updateDealByCategoryId(dealExist.categoryId, dealObj),
                        this.categoryService.updateDeal(dealExist.categoryId, dealObj)
                    ]);
                }
                if (dealExist.dealType === deals_model_1.DealType.PRODUCT) {
                    if (dealExist.products && dealExist.products.length > 0) {
                        for (let i = 0; i < dealExist.products.length; i++) {
                            await this.productService.updateDealById(dealExist.products[i].productId, dealObj);
                        }
                    }
                    else {
                        await this.productService.updateDealById(dealExist.productId, dealObj);
                    }
                }
            }
            if (dealData.dealType === deals_model_1.DealType.CATEGORY) {
                if (dealExist.categoryId != dealData.categoryId) {
                    const isCatExist = await this.dealService.getDealByCategoryId(dealData.categoryId);
                    if (isCatExist)
                        this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_ALREADY_EXIST);
                }
                const category = await this.categoryService.getCategorieDetail(dealData.categoryId);
                if (!category)
                    this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
                dealData.categoryName = category.title;
                dealData.productId = null;
                dealData.productName = null;
            }
            else if (dealData.dealType === deals_model_1.DealType.PRODUCT) {
                if (dealData.products && dealData.products.length > 0) {
                    for (let i = 0; i < dealData.products.length; i++) {
                        const dealExist = await this.dealService.getDealByProductId(dealData.products[i].productId);
                        if (dealExist)
                            this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_ALREADY_EXIST);
                        const product = await this.productService.getProductDetail(dealData.products[i].productId);
                        if (!product)
                            this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
                        dealData.products[i].productName = product.title;
                    }
                }
                else {
                    const dealExist = await this.dealService.getDealByProductId(dealData.productId);
                    if (dealExist)
                        this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_ALREADY_EXIST);
                    const product = await this.productService.getProductDetail(dealData.productId);
                    if (!product)
                        this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
                    dealData.productName = product.title;
                }
                dealData.categoryId = null;
                dealData.categoryName = null;
            }
            const deal = await this.dealService.updateDeal(dealExist._id, dealData);
            if (deal) {
                let dealObj = { isDealAvailable: true, dealPercent: deal.dealPercent, dealId: deal._id, dealType: deal.dealType };
                if (deal.dealType === deals_model_1.DealType.CATEGORY) {
                    await Promise.all([
                        this.productService.updateDealByCategoryId(deal.categoryId, dealObj),
                        this.categoryService.updateDeal(deal.categoryId, dealObj)
                    ]);
                }
                if (deal.dealType === deals_model_1.DealType.PRODUCT) {
                    if (deal.products && deal.products.length > 0) {
                        for (let i = 0; i < deal.products.length; i++) {
                            await this.productService.updateDealById(deal.products[i].productId, dealObj);
                        }
                    }
                    else {
                        await this.productService.updateDealById(deal.productId, dealObj);
                    }
                }
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.DEAL_UPDATED);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateDealStatus(user, dealId, dealStatusData) {
        this.utilService.validateAdminRole(user);
        try {
            const dealExist = await this.dealService.getDealDetail(dealId);
            if (!dealExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_NOT_FOUND);
            const deal = await this.dealService.updateDealStatus(dealId, dealStatusData);
            if (deal) {
                let dealObj = {};
                if (dealStatusData.status == true)
                    dealObj = { isDealAvailable: true, dealPercent: deal.dealPercent, dealId: deal._id, dealType: deal.dealType };
                else
                    dealObj = { isDealAvailable: false };
                if (deal.dealType === deals_model_1.DealType.CATEGORY) {
                    await Promise.all([
                        this.productService.updateDealByCategoryId(deal.categoryId, dealObj),
                        this.categoryService.updateDeal(deal.categoryId, dealObj)
                    ]);
                }
                if (deal.dealType === deals_model_1.DealType.PRODUCT) {
                    if (deal.products && deal.products.length > 0) {
                        for (let i = 0; i < deal.products.length; i++) {
                            await this.productService.updateDealById(deal.products[i].productId, dealObj);
                        }
                    }
                    else {
                        await this.productService.updateDealById(deal.productId, dealObj);
                    }
                }
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.DEAL_STATUS_UPDATED);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteDeal(user, dealId) {
        this.utilService.validateAdminRole(user);
        try {
            const dealExist = await this.dealService.getDealDetail(dealId);
            if (!dealExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.DEAL_NOT_FOUND);
            const deal = await this.dealService.deleteDeal(dealId);
            if (deal) {
                let dealObj = { isDealAvailable: false, dealPercent: 0, dealId: null, dealType: null };
                if (deal.dealType === deals_model_1.DealType.CATEGORY) {
                    await Promise.all([
                        this.productService.updateDealByCategoryId(deal.categoryId, dealObj),
                        this.categoryService.updateDeal(deal.categoryId, dealObj)
                    ]);
                }
                if (deal.dealType === deals_model_1.DealType.PRODUCT) {
                    if (deal.products && deal.products.length > 0) {
                        for (let i = 0; i < deal.products.length; i++) {
                            await this.productService.updateDealById(deal.products[i].productId, dealObj);
                        }
                    }
                    else {
                        await this.productService.updateDealById(deal.productId, dealObj);
                    }
                }
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.DEAL_DELETED);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async dealImageUpload(user, file, image) {
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
    async getDealTypeList(user) {
        this.utilService.validateAdminRole(user);
        try {
            const dealTypeList = await this.dealService.getDealTypeList();
            return this.utilService.successResponseData(dealTypeList);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/top'),
    swagger_1.ApiOperation({ title: 'Get all enabled top deals for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of enabled top deals' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DealController.prototype, "topDeal", null);
__decorate([
    common_1.Get('/of-the-day'),
    swagger_1.ApiOperation({ title: 'Get all enabled deals of the day for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of enabled deals of the day' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DealController.prototype, "dealOfTheDay", null);
__decorate([
    common_1.Get('/products/:dealId'),
    swagger_1.ApiOperation({ title: 'Get related product by dealId' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Get related product by dealId', type: products_model_1.ProductsResponsePaginationDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(jwt_strategy_1.OptionalJwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('dealId')), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, app_model_1.UserQuery]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "getDealByProduct", null);
__decorate([
    common_1.Get('/admin/list'),
    swagger_1.ApiOperation({ title: 'Get all deals' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of deals' }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "getDeals", null);
__decorate([
    common_1.Get('/admin/detail/:dealId'),
    swagger_1.ApiOperation({ title: 'Get deal by dealId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Get deal detail by dealId', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('dealId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "getDealInformation", null);
__decorate([
    common_1.Post('/admin/create'),
    swagger_1.ApiOperation({ title: 'Create deal' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, deals_model_1.DealSaveDTO]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "createDeal", null);
__decorate([
    common_1.Put('/admin/update/:dealId'),
    swagger_1.ApiOperation({ title: 'Update deal by dealId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('dealId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, deals_model_1.DealSaveDTO]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "updateDeal", null);
__decorate([
    common_1.Put('/admin/status-update/:dealId'),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('dealId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, deals_model_1.DealStatusDTO]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "updateDealStatus", null);
__decorate([
    common_1.Delete('/admin/delete/:dealId'),
    swagger_1.ApiResponse({ status: 200, description: 'Return image detail', type: app_model_1.UploadImageResponseDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('dealId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "deleteDeal", null);
__decorate([
    common_1.Post('/admin/upload/image'),
    swagger_1.ApiOperation({ title: 'Deal image upload' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return image detail', type: app_model_1.UploadImageResponseDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiImplicitFile({ name: 'file', required: true, description: 'Deal image upload' }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.UploadedFile()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, Object, app_model_1.UploadImageDTO]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "dealImageUpload", null);
__decorate([
    common_1.Get('/admin/type/list'),
    swagger_1.ApiOperation({ title: 'Get all banner type for deal' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of deal type' }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "getDealTypeList", null);
DealController = __decorate([
    common_1.Controller('deals'),
    swagger_1.ApiUseTags('Deals'),
    __metadata("design:paramtypes", [deals_service_1.DealService,
        categories_service_1.CategoryService,
        products_service_1.ProductService,
        util_service_1.UtilService,
        upload_service_1.UploadService,
        cart_service_1.CartService])
], DealController);
exports.DealController = DealController;
//# sourceMappingURL=deals.controller.js.map