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
const core_1 = require("@nestjs/core");
const users_module_1 = require("./users/users.module");
const categories_module_1 = require("./categories/categories.module");
const deals_module_1 = require("./deals/deals.module");
const products_module_1 = require("./products/products.module");
const address_module_1 = require("./address/address.module");
const favourites_module_1 = require("./favourites/favourites.module");
const order_module_1 = require("./order/order.module");
const coupons_module_1 = require("./coupons/coupons.module");
const cart_module_1 = require("./cart/cart.module");
const rating_module_1 = require("./rating/rating.module");
const notifications_module_1 = require("./notifications/notifications.module");
const app_controller_1 = require("./app.controller");
const settings_module_1 = require("./settings/settings.module");
const banner_module_1 = require("./banner/banner.module");
const chat_module_1 = require("./chat/chat.module");
const business_module_1 = require("./business/business.module");
const sub_categories_module_1 = require("./sub-categories/sub-categories.module");
const sequence_module_1 = require("./sequence/sequence.module");
const language_module_1 = require("./language/language.module");
const request_interceptor_1 = require("./request.interceptor");
const util_service_1 = require("./utils/util.service");
const currency_service_1 = require("./utils/currency.service");
const wallet_module_1 = require("./wallet/wallet.module");
const core_2 = require("@nestjs/core");
const exceptions_filter_1 = require("./exceptions.filter");
const pages_module_1 = require("./pages/pages.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const app_gateway_1 = require("./app.gateway");
const jwt_strategy_1 = require("./utils/jwt.strategy");
const upload_service_1 = require("./utils/upload.service");
const product_out_of_stock_module_1 = require("./product-out-of-stock/product-out-of-stock.module");
const delivery_boy_ratings_module_1 = require("./delivery-boy-ratings/delivery-boy-ratings.module");
const dotenv = require("dotenv");
const cart_service_1 = require("./cart/cart.service");
dotenv.config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: () => ({
                    uri: (process.env.NODE_ENV == 'production') ? process.env.MONGO_DB_URL_PRODUCTION : process.env.MONGO_DB_URL_STAGING,
                    useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true
                }),
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({ secret: process.env.SECRET, signOptions: { expiresIn: '3h' } }),
            users_module_1.UsersModule,
            categories_module_1.CategoryModule,
            deals_module_1.DealModule,
            products_module_1.ProductModule,
            address_module_1.AddressModule,
            favourites_module_1.FavouritesModule,
            order_module_1.OrderModule,
            coupons_module_1.CouponsModule,
            cart_module_1.CartModule,
            rating_module_1.RatingModule,
            notifications_module_1.NotificationsModule,
            settings_module_1.SettingModule,
            banner_module_1.BannerModule,
            business_module_1.BusinessModule,
            sub_categories_module_1.SubCategoryModule,
            chat_module_1.ChatModule,
            sequence_module_1.SequenceModule,
            language_module_1.LanguageModule,
            wallet_module_1.WalletModule,
            pages_module_1.PageModule,
            product_out_of_stock_module_1.ProductOutOfStockModule,
            delivery_boy_ratings_module_1.DeliveryBoyRatingsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_gateway_1.AppGateway,
            jwt_strategy_1.JwtStrategy,
            upload_service_1.UploadService,
            util_service_1.UtilService,
            currency_service_1.CurrencyService,
            cart_service_1.CartService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: request_interceptor_1.RequestInterceptor
            },
            {
                provide: core_2.APP_FILTER,
                useClass: exceptions_filter_1.AllExceptionsFilter,
            }
        ],
        exports: [
            app_gateway_1.AppGateway,
            users_module_1.UsersModule,
            mongoose_1.MongooseModule,
            passport_1.PassportModule,
            jwt_1.JwtModule,
            jwt_strategy_1.JwtStrategy,
            upload_service_1.UploadService,
            util_service_1.UtilService,
            currency_service_1.CurrencyService,
            cart_service_1.CartService
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map