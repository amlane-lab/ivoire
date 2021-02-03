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
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../users/users.model");
const app_model_1 = require("../utils/app.model");
const jwt_strategy_1 = require("../utils/jwt.strategy");
const delivery_boy_ratings_model_1 = require("./delivery-boy-ratings.model");
const delivery_boy_ratings_service_1 = require("./delivery-boy-ratings.service");
const util_service_1 = require("../utils/util.service");
const order_service_1 = require("../order/order.service");
const order_model_1 = require("../order/order.model");
const passport_1 = require("@nestjs/passport");
let DeliveryBoyRatingsController = class DeliveryBoyRatingsController {
    constructor(deliveryBoyRatingService, utilService, orderService) {
        this.deliveryBoyRatingService = deliveryBoyRatingService;
        this.utilService = utilService;
        this.orderService = orderService;
    }
    async rateDeliveryBoy(user, ratingData) {
        this.utilService.validateUserRole(user);
        try {
            const isOrderDelivered = await this.orderService.getOrderDetailForUser(user._id, ratingData.orderId);
            if (isOrderDelivered.orderStatus !== order_model_1.OrderStatusType.DELIVERED)
                this.utilService.badRequest(app_model_1.ResponseMessage.ORDER_NOT_DELIVERED);
            const ratingExist = await this.deliveryBoyRatingService.getDeliveryBoyRatingForUser(user._id, ratingData.orderId);
            if (ratingExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.DELIVERY_BOY_ALREADY_RATED_BY_USER);
            let rating = await this.deliveryBoyRatingService.saveDeliveryBoyRating(user._id, ratingData);
            let orderUpdated = await this.orderService.updateOrderRatedByUser(user._id, ratingData.orderId);
            if (orderUpdated)
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
    swagger_1.ApiOperation({ title: 'Rate delivery boy for an order' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, delivery_boy_ratings_model_1.DeliveryBoyRatingSaveDTO]),
    __metadata("design:returntype", Promise)
], DeliveryBoyRatingsController.prototype, "rateDeliveryBoy", null);
DeliveryBoyRatingsController = __decorate([
    common_1.Controller('delivery-boy-ratings'),
    swagger_1.ApiUseTags('Delivery Boy Ratings'),
    __metadata("design:paramtypes", [delivery_boy_ratings_service_1.DeliveryBoyRatingsService,
        util_service_1.UtilService,
        order_service_1.OrderService])
], DeliveryBoyRatingsController);
exports.DeliveryBoyRatingsController = DeliveryBoyRatingsController;
//# sourceMappingURL=delivery-boy-ratings.controller.js.map