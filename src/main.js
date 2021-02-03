"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_module_1 = require("./users/users.module");
const categories_module_1 = require("./categories/categories.module");
const deals_module_1 = require("./deals/deals.module");
const products_module_1 = require("./products/products.module");
const dotenv = require("dotenv");
const address_module_1 = require("./address/address.module");
const favourites_module_1 = require("./favourites/favourites.module");
const order_module_1 = require("./order/order.module");
const coupons_module_1 = require("./coupons/coupons.module");
const cart_module_1 = require("./cart/cart.module");
const rating_module_1 = require("./rating/rating.module");
const notifications_module_1 = require("./notifications/notifications.module");
const sentry = require("@sentry/node");
const settings_module_1 = require("./settings/settings.module");
const banner_module_1 = require("./banner/banner.module");
const business_module_1 = require("./business/business.module");
const sub_categories_module_1 = require("./sub-categories/sub-categories.module");
const language_module_1 = require("./language/language.module");
const pages_module_1 = require("./pages/pages.module");
const wallet_module_1 = require("./wallet/wallet.module");
const product_out_of_stock_module_1 = require("./product-out-of-stock/product-out-of-stock.module");
const chat_module_1 = require("./chat/chat.module");
const delivery_boy_ratings_module_1 = require("./delivery-boy-ratings/delivery-boy-ratings.module");
const os = require('os');
const bodyParser = require("body-parser");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: false
    });
    const rawBodyBuffer = (req, res, buf, encoding) => {
        if (buf && buf.length) {
            req.rawBody = buf.toString(encoding || 'utf8');
        }
    };
    app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
    app.use(bodyParser.json({ verify: rawBodyBuffer }));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
        next();
    });
    if (process.env.NODE_ENV === 'production' && process.env.SENTRY_URL)
        sentry.init({ dsn: process.env.SENTRY_URL });
    if (process.env.PREDIFINED && process.env.PREDIFINED == "true") {
        let options = new swagger_1.DocumentBuilder().setTitle('Groceries App').setBasePath("/").setVersion('v1').addBearerAuth().setSchemes('https', 'http').build();
        const document = swagger_1.SwaggerModule.createDocument(app, options, {
            include: [address_module_1.AddressModule, banner_module_1.BannerModule, business_module_1.BusinessModule, categories_module_1.CategoryModule, cart_module_1.CartModule, coupons_module_1.CouponsModule, chat_module_1.ChatModule, deals_module_1.DealModule, delivery_boy_ratings_module_1.DeliveryBoyRatingsModule, favourites_module_1.FavouritesModule, language_module_1.LanguageModule, notifications_module_1.NotificationsModule, order_module_1.OrderModule,
                pages_module_1.PageModule, products_module_1.ProductModule, product_out_of_stock_module_1.ProductOutOfStockModule, rating_module_1.RatingModule, settings_module_1.SettingModule, sub_categories_module_1.SubCategoryModule, users_module_1.UsersModule, wallet_module_1.WalletModule]
        });
        swagger_1.SwaggerModule.setup('/explorer', app, document);
    }
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`http://localhost:${port}/explorer/#/`);
}
bootstrap();
//# sourceMappingURL=main.js.map