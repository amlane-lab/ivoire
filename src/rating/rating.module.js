"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const products_module_1 = require("../products/products.module");
const cart_module_1 = require("../cart/cart.module");
const rating_controller_1 = require("./rating.controller");
const rating_model_1 = require("./rating.model");
const rating_service_1 = require("./rating.service");
let RatingModule = class RatingModule {
};
RatingModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Rating', schema: rating_model_1.RatingSchema }]),
            cart_module_1.CartModule,
            common_1.forwardRef(() => products_module_1.ProductModule)
        ],
        controllers: [rating_controller_1.RatingController],
        providers: [rating_service_1.RatingService],
        exports: [rating_service_1.RatingService, mongoose_1.MongooseModule]
    })
], RatingModule);
exports.RatingModule = RatingModule;
//# sourceMappingURL=rating.module.js.map