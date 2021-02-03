"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const delivery_boy_ratings_service_1 = require("./delivery-boy-ratings.service");
const delivery_boy_ratings_controller_1 = require("./delivery-boy-ratings.controller");
const mongoose_1 = require("@nestjs/mongoose");
const delivery_boy_ratings_model_1 = require("./delivery-boy-ratings.model");
const order_module_1 = require("../order/order.module");
let DeliveryBoyRatingsModule = class DeliveryBoyRatingsModule {
};
DeliveryBoyRatingsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'DeliveryBoyRating', schema: delivery_boy_ratings_model_1.DeliveryBoyRatingSchema }]),
            common_1.forwardRef(() => order_module_1.OrderModule)
        ],
        providers: [delivery_boy_ratings_service_1.DeliveryBoyRatingsService],
        controllers: [delivery_boy_ratings_controller_1.DeliveryBoyRatingsController],
        exports: [delivery_boy_ratings_service_1.DeliveryBoyRatingsService, mongoose_1.MongooseModule]
    })
], DeliveryBoyRatingsModule);
exports.DeliveryBoyRatingsModule = DeliveryBoyRatingsModule;
//# sourceMappingURL=delivery-boy-ratings.module.js.map