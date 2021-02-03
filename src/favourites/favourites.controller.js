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
const favourites_service_1 = require("./favourites.service");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../users/users.model");
const favourites_model_1 = require("./favourites.model");
const util_service_1 = require("../utils/util.service");
const app_model_1 = require("../utils/app.model");
const products_service_1 = require("../products/products.service");
const cart_service_1 = require("../cart/cart.service");
const jwt_strategy_1 = require("../utils/jwt.strategy");
let FavouriteController = class FavouriteController {
    constructor(FavouriteService, productService, cartService, utilService) {
        this.FavouriteService = FavouriteService;
        this.productService = productService;
        this.cartService = cartService;
        this.utilService = utilService;
    }
    async getAllFavourite(user) {
        this.utilService.validateUserRole(user);
        try {
            let list = [];
            const favouriteList = await this.FavouriteService.getAllFavourite(user._id);
            if (favouriteList && favouriteList.productId && favouriteList.productId.length > 0) {
                const all = await Promise.all([
                    this.productService.getProductByIds(favouriteList.productId),
                    this.cartService.getCartByUserId(user._id)
                ]);
                let products = all[0];
                list = await this.productService.addCartInProduct(all[1], products);
            }
            return this.utilService.successResponseData(list || []);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async addProductToFavourite(user, productId) {
        this.utilService.validateUserRole(user);
        try {
            let productList = [];
            const list = await this.FavouriteService.getAllFavourite(user._id);
            if (list) {
                const index = list.productId.findIndex(p => p === productId);
                if (index !== -1)
                    this.utilService.badRequest(app_model_1.ResponseMessage.FAVOURITE_ALREADY_ADDED_PRODUCT);
                else {
                    productList = list.productId;
                    productList.push(productId);
                }
            }
            else
                productList.push(productId);
            let resData;
            if (list)
                resData = await this.FavouriteService.updateFavourite(user._id, productList);
            else
                resData = await this.FavouriteService.saveFavourite(user._id, productList);
            if (resData)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.FAVOURITE_SAVED);
            else
                this.utilService.pageNotFound();
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteFavourite(user, productId) {
        this.utilService.validateUserRole(user);
        try {
            const list = await this.FavouriteService.getAllFavourite(user._id);
            if (list) {
                const index = list.productId.findIndex(p => p === productId);
                if (index === -1)
                    this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
                else {
                    const productList = list.productId;
                    productList.splice(index, 1);
                    const resData = await this.FavouriteService.updateFavourite(user._id, productList);
                    if (resData)
                        return this.utilService.successResponseMsg(app_model_1.ResponseMessage.FAVOURITE_DELETED);
                    else
                        this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
                }
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/list'),
    swagger_1.ApiOperation({ title: 'Get all favourite products for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of favourite product', type: favourites_model_1.ResponseFavouritesDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], FavouriteController.prototype, "getAllFavourite", null);
__decorate([
    common_1.Post('/add/:productId'),
    swagger_1.ApiOperation({ title: 'Add product to favourite list' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], FavouriteController.prototype, "addProductToFavourite", null);
__decorate([
    common_1.Delete('/remove/:productId'),
    swagger_1.ApiOperation({ title: 'Remove product from favourite list' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], FavouriteController.prototype, "deleteFavourite", null);
FavouriteController = __decorate([
    common_1.Controller('favourites'),
    swagger_1.ApiUseTags('Favourites'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [favourites_service_1.FavouriteService,
        products_service_1.ProductService,
        cart_service_1.CartService,
        util_service_1.UtilService])
], FavouriteController);
exports.FavouriteController = FavouriteController;
//# sourceMappingURL=favourites.controller.js.map