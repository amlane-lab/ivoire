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
const cart_module_1 = require("../cart/cart.module");
const categories_module_1 = require("../categories/categories.module");
const banner_module_1 = require("../banner/banner.module");
const deals_module_1 = require("../deals/deals.module");
const favourites_module_1 = require("../favourites/favourites.module");
const rating_module_1 = require("../rating/rating.module");
const sub_categories_module_1 = require("../sub-categories/sub-categories.module");
const products_controller_1 = require("./products.controller");
const products_model_1 = require("./products.model");
const products_service_1 = require("./products.service");
const excel_service_1 = require("../utils/excel.service");
const product_out_of_stock_module_1 = require("../product-out-of-stock/product-out-of-stock.module");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Product', schema: products_model_1.ProductSchema }]),
            common_1.forwardRef(() => banner_module_1.BannerModule),
            common_1.forwardRef(() => cart_module_1.CartModule),
            common_1.forwardRef(() => categories_module_1.CategoryModule),
            common_1.forwardRef(() => deals_module_1.DealModule),
            favourites_module_1.FavouritesModule,
            common_1.forwardRef(() => rating_module_1.RatingModule),
            common_1.forwardRef(() => sub_categories_module_1.SubCategoryModule),
            common_1.forwardRef(() => product_out_of_stock_module_1.ProductOutOfStockModule)
        ],
        controllers: [products_controller_1.ProductController],
        providers: [products_service_1.ProductService, excel_service_1.ExcelService],
        exports: [products_service_1.ProductService, mongoose_1.MongooseModule]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=products.module.js.map