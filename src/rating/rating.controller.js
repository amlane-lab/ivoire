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
const rating_service_1 = require("./rating.service");
const users_model_1 = require("../users/users.model");
const rating_model_1 = require("./rating.model");
const util_service_1 = require("../utils/util.service");
const app_model_1 = require("../utils/app.model");
const products_service_1 = require("../products/products.service");
const jwt_strategy_1 = require("../utils/jwt.strategy");
const cart_service_1 = require("../cart/cart.service");
let RatingController = class RatingController {
    constructor(ratingService, productService, cartService, utilService) {
        this.ratingService = ratingService;
        this.productService = productService;
        this.cartService = cartService;
        this.utilService = utilService;
    }
    async rateProduct(user, ratingData) {
        this.utilService.validateUserRole(user);
        try {
            const isUserBought = await this.cartService.isUserBoughtProduct(user._id, ratingData.productId);
            if (!isUserBought)
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_BOUGHT);
            let productDetail = await this.productService.getProductDetail(ratingData.productId);
            if (!productDetail)
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
            const ratingExist = await this.ratingService.getProductRate(user._id, ratingData.productId);
            let productUpdate = {
                noOfUsersRated: productDetail.noOfUsersRated,
                totalRating: productDetail.totalRating,
                averageRating: 0
            };
            if (ratingExist) {
                productUpdate.noOfUsersRated = productDetail.noOfUsersRated;
                productUpdate.totalRating = productDetail.totalRating + ratingData.rate - ratingExist.rate;
                productUpdate.averageRating = Number((productUpdate.totalRating / productUpdate.noOfUsersRated).toFixed(2));
                await this.ratingService.updateRating(user._id, ratingData.productId, ratingData.rate);
            }
            else {
                productUpdate.noOfUsersRated = productDetail.noOfUsersRated + 1;
                productUpdate.totalRating = productDetail.totalRating + ratingData.rate;
                productUpdate.averageRating = Number((productUpdate.totalRating / productUpdate.noOfUsersRated).toFixed(2));
                await this.ratingService.saveRating(user._id, ratingData);
            }
            const rating = await Promise.all([
                this.cartService.updateRating(user._id, ratingData.productId, ratingData.rate),
                this.productService.updateRating(productDetail._id, productUpdate)
            ]);
            if (rating)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.RATING_SAVED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Post('/rate'),
    swagger_1.ApiOperation({ title: 'Rate product' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, rating_model_1.RatingSaveDTO]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "rateProduct", null);
RatingController = __decorate([
    common_1.Controller('ratings'),
    swagger_1.ApiUseTags('Ratings'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [rating_service_1.RatingService,
        products_service_1.ProductService,
        cart_service_1.CartService,
        util_service_1.UtilService])
], RatingController);
exports.RatingController = RatingController;
//# sourceMappingURL=rating.controller.js.map