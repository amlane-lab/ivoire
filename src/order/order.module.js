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
const categories_module_1 = require("../categories/categories.module");
const cart_module_1 = require("../cart/cart.module");
const address_module_1 = require("../address/address.module");
const notifications_module_1 = require("../notifications/notifications.module");
const settings_module_1 = require("../settings/settings.module");
const products_module_1 = require("../products/products.module");
const sequence_module_1 = require("../sequence/sequence.module");
const wallet_module_1 = require("../wallet/wallet.module");
const business_module_1 = require("../business/business.module");
const order_controller_1 = require("./order.controller");
const order_model_1 = require("./order.model");
const order_service_1 = require("./order.service");
const push_service_1 = require("../utils/push.service");
const stripe_service_1 = require("../utils/stripe.service");
const email_service_1 = require("../utils/email.service");
const product_out_of_stock_module_1 = require("../product-out-of-stock/product-out-of-stock.module");
const delivery_boy_ratings_module_1 = require("../delivery-boy-ratings/delivery-boy-ratings.module");
const coupons_module_1 = require("../coupons/coupons.module");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Order', schema: order_model_1.OrderSchema }]),
            address_module_1.AddressModule,
            business_module_1.BusinessModule,
            categories_module_1.CategoryModule,
            cart_module_1.CartModule,
            notifications_module_1.NotificationsModule,
            products_module_1.ProductModule,
            sequence_module_1.SequenceModule,
            settings_module_1.SettingModule,
            wallet_module_1.WalletModule,
            product_out_of_stock_module_1.ProductOutOfStockModule,
            delivery_boy_ratings_module_1.DeliveryBoyRatingsModule,
            coupons_module_1.CouponsModule
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, push_service_1.PushService, stripe_service_1.StripeService, email_service_1.EmailService],
        exports: [order_service_1.OrderService, mongoose_1.MongooseModule]
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map