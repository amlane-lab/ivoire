"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const readline = require('readline');
const address_model_1 = require("./src/address/address.model");
const banner_model_1 = require("./src/banner/banner.model");
const business_model_1 = require("./src/business/business.model");
const cart_model_1 = require("./src/cart/cart.model");
const categories_model_1 = require("./src/categories/categories.model");
const chat_model_1 = require("./src/chat/chat.model");
const coupons_model_1 = require("./src/coupons/coupons.model");
const deals_model_1 = require("./src/deals/deals.model");
const delivery_boy_ratings_model_1 = require("./src/delivery-boy-ratings/delivery-boy-ratings.model");
const favourites_model_1 = require("./src/favourites/favourites.model");
const language_model_1 = require("./src/language/language.model");
const notifications_model_1 = require("./src/notifications/notifications.model");
const order_model_1 = require("./src/order/order.model");
const cart_model_2 = require("./src/cart/cart.model");
const pages_model_1 = require("./src/pages/pages.model");
const product_out_of_stock_model_1 = require("./src/product-out-of-stock/product-out-of-stock.model");
const products_model_1 = require("./src/products/products.model");
const rating_model_1 = require("./src/rating/rating.model");
const sequence_model_1 = require("./src/sequence/sequence.model");
const settings_model_1 = require("./src/settings/settings.model");
const sub_categories_model_1 = require("./src/sub-categories/sub-categories.model");
const users_model_1 = require("./src/users/users.model");
const wallet_model_1 = require("./src/wallet/wallet.model");
const app_model_1 = require("./src/utils/app.model");
const addressCollections = require('./seedings/addresses');
const bannerCollections = require('./seedings/banners');
const businessCollections = require('./seedings/business');
const cartCollections = require('./seedings/carts');
const categoryCollections = require('./seedings/categories');
const chatCollections = require('./seedings/chats');
const couponCollections = require('./seedings/coupons');
const dealCollections = require('./seedings/deals');
const deliveryBoyRatingCollections = require('./seedings/deliveryboyratings');
const favouriteCollections = require('./seedings/favourites');
const languageCollections = require('./seedings/languages');
const notificationCollections = require('./seedings/notifications');
const orderCollections = require('./seedings/orders');
const orderProductCollections = require('./seedings/orderproducts');
const pageCollections = require('./seedings/pages');
const ProductOutOfStockCollections = require('./seedings/productoutofstocks.js');
const productCollections = require('./seedings/products');
const ratingCollections = require('./seedings/ratings');
const sequenceCollections = require('./seedings/sequences');
const settingsCollections = require('./seedings/settings');
const subCategoryCollections = require('./seedings/sub-categories');
const userCollections = require('./seedings/users');
const walletCollections = require('./seedings/wallet');
class SeedDatabse {
    constructor() {
        this.addresses = mongoose.model('Address', address_model_1.AddressSchema);
        this.banners = mongoose.model('Banner', banner_model_1.BannerSchema);
        this.business = mongoose.model('Business', business_model_1.BusinessSchema);
        this.carts = mongoose.model('Cart', cart_model_1.CartSchema);
        this.categories = mongoose.model('Category', categories_model_1.CategorySchema);
        this.chats = mongoose.model('Chat', chat_model_1.ChatSchema);
        this.coupons = mongoose.model('Coupon', coupons_model_1.CouponSchema);
        this.deals = mongoose.model('Deal', deals_model_1.DealSchema);
        this.deliveryBoyRatings = mongoose.model('DeliveryBoyRating', delivery_boy_ratings_model_1.DeliveryBoyRatingSchema);
        this.favourites = mongoose.model('Favourite', favourites_model_1.FavouriteSchema);
        this.languages = mongoose.model('Language', language_model_1.LanguageSchema);
        this.notifications = mongoose.model('Notification', notifications_model_1.NotificationSchema);
        this.orders = mongoose.model('Order', order_model_1.OrderSchema);
        this.orderProducts = mongoose.model('OrderProducts', cart_model_2.ProductOrderUserSchema);
        this.pages = mongoose.model('Page', pages_model_1.PageSchema);
        this.productOutOfStocks = mongoose.model('ProductOutOfStock', product_out_of_stock_model_1.ProductOutOfStockSchema);
        this.products = mongoose.model('Product', products_model_1.ProductSchema);
        this.ratings = mongoose.model('Rating', rating_model_1.RatingSchema);
        this.sequences = mongoose.model('Sequence', sequence_model_1.SequenceSchema);
        this.settings = mongoose.model('Setting', settings_model_1.SettingSchema);
        this.subCategories = mongoose.model('SubCategory', sub_categories_model_1.SubCategorySchema);
        this.users = mongoose.model('User', users_model_1.UserSchema);
        this.wallets = mongoose.model('Wallet', wallet_model_1.WalletSchema);
        this.production = false;
        this.connectionUrl = "";
        console.log("Do you want to reset database.?");
        console.log("It will delete all data from your database. Be careful while running this.");
        if (process.env.MONGO_DB_URL) {
            this.connectionUrl = process.env.MONGO_DB_URL;
            if (process.env.SEEDING_TYPE && process.env.SEEDING_TYPE == 'production')
                this.production = true;
            else
                this.production = false;
            this.connect();
        }
        else {
            const consoleInterface = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            consoleInterface.question("\x1b[36m%s\x1b[0mEnter the Mongo DB connection uri string: ", (url) => {
                this.connectionUrl = url;
                consoleInterface.question("\x1b[36m%s\x1b[0mIs it for production? (production/staging):", (input) => {
                    if (input == "production")
                        this.production = true;
                    console.log("\nPRDOCUTION: ", this.production);
                    consoleInterface.close();
                });
            });
            consoleInterface.on('close', () => {
                this.connect();
            });
        }
    }
    connect() {
        if (this.connectionUrl) {
            mongoose.connect(this.connectionUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
                if (err) {
                    console.log("\x1b[31mCOULT NOT RESET DATABASE");
                    console.log(err.message);
                    process.exit(0);
                }
                else {
                    this.reset();
                }
            });
        }
        else {
            console.log("\x1b[31m NO CONNECTION URL FOUND");
        }
    }
    async reset() {
        console.log("-------------------START-------------------");
        await this.deleteCollections();
        await this.setLanguage();
        await this.setSettings();
        await this.setForProduction();
        if (!this.production)
            await this.setOthers();
        console.log("-------------------FINISHED-------------------");
        console.log("\nNow you can exit.");
        process.exit(0);
    }
    async deleteCollections() {
        await this.addresses.deleteMany({});
        console.log("Deleted Collection: Addresses");
        await this.banners.deleteMany({});
        console.log("Deleted Collection: Banners");
        await this.business.deleteMany({});
        console.log("Deleted Collection: Businesses");
        await this.carts.deleteMany({});
        console.log("Deleted Collection: Carts");
        await this.categories.deleteMany({});
        console.log("Deleted Collection: Categories");
        await this.chats.deleteMany({});
        console.log("Deleted Collection: Chats");
        await this.coupons.deleteMany({});
        console.log("Deleted Collection: Coupons");
        await this.deals.deleteMany({});
        console.log("Deleted Collection: Deals");
        await this.deliveryBoyRatings.deleteMany({});
        console.log("Deleted Collection: DeliveryBoyRatings");
        await this.favourites.deleteMany({});
        console.log("Deleted Collection: Favourites");
        await this.languages.deleteMany({});
        console.log("Deleted Collection: Languages");
        await this.notifications.deleteMany({});
        console.log("Deleted Collection: Notifications");
        await this.orders.deleteMany({});
        console.log("Deleted Collection: Order");
        await this.orderProducts.deleteMany({});
        console.log("Deleted Collection: OrderProducts");
        await this.pages.deleteMany({});
        console.log("Deleted Collection: Pages");
        await this.productOutOfStocks.deleteMany({});
        console.log("Deleted Collection: ProductOutOfStocks");
        await this.products.deleteMany({});
        console.log("Deleted Collection: Products");
        await this.ratings.deleteMany({});
        console.log("Deleted Collection: Rating");
        await this.sequences.deleteMany({});
        console.log("Deleted Collection: Sequences");
        await this.settings.deleteMany({});
        console.log("Deleted Collection: Settings");
        await this.subCategories.deleteMany({});
        console.log("Deleted Collection: SubCategories");
        await this.users.deleteMany({});
        console.log("Deleted Collection: Users");
        await this.wallets.deleteMany({});
        console.log("Deleted Collection: Wallets");
    }
    async setForProduction() {
        await this.business.insertMany(businessCollections);
        console.log("Added Collection: Business");
        if (this.production)
            await this.users.insertMany(userCollections.find(x => x.role === app_model_1.UserRoles.ADMIN));
        else
            await this.users.insertMany(userCollections);
        console.log("Added Collection: Users");
        await this.pages.insertMany(pageCollections);
        console.log("Added Collection: Pages");
    }
    async setOthers() {
        await this.addresses.insertMany(addressCollections);
        console.log("Added Collection: Addresses");
        await this.banners.insertMany(bannerCollections);
        console.log("Added Collection: Banners");
        await this.carts.insertMany(cartCollections);
        console.log("Added Collection: Carts");
        await this.categories.insertMany(categoryCollections);
        console.log("Added Collection: Categories");
        await this.chats.insertMany(chatCollections);
        console.log("Added Collection: Chat");
        await this.coupons.insertMany(couponCollections);
        console.log("Added Collection: Coupons");
        await this.deals.insertMany(dealCollections);
        console.log("Added Collection: Deals");
        await this.deliveryBoyRatings.insertMany(deliveryBoyRatingCollections);
        console.log("Added Collection: DeliveryBoyRatings");
        await this.favourites.insertMany(favouriteCollections);
        console.log("Added Collection: Favourites");
        await this.notifications.insertMany(notificationCollections);
        console.log("Added Collection: Notifications");
        await this.orders.insertMany(orderCollections);
        console.log("Added Collection: Orders");
        await this.orderProducts.insertMany(orderProductCollections);
        console.log("Added Collection: OrdersProducts");
        await this.products.insertMany(productCollections);
        console.log("Added Collection: Products");
        await this.productOutOfStocks.insertMany(ProductOutOfStockCollections);
        console.log("Added Collection: ProductOutOfStocks");
        await this.ratings.insertMany(ratingCollections);
        console.log("Added Collection: Rating");
        await this.subCategories.insertMany(subCategoryCollections);
        console.log("Added Collection: SubCategories");
        await this.sequences.insertMany(sequenceCollections);
        console.log("Added Collection: Sequences");
        await this.wallets.insertMany(walletCollections);
        console.log("Added Collection: Wallets");
    }
    async setLanguage() {
        await this.languages.insertMany(languageCollections);
        console.log("Added Collection: Languages");
    }
    async setSettings() {
        await this.settings.insertMany(settingsCollections);
        console.log("Added Collection: Settings");
    }
}
exports.SeedDatabse = SeedDatabse;
const reptile = new SeedDatabse();
//# sourceMappingURL=mongodb-seeding.js.map