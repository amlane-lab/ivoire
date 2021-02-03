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
const sub_categories_module_1 = require("../sub-categories/sub-categories.module");
const products_module_1 = require("../products/products.module");
const banner_module_1 = require("../banner/banner.module");
const deals_module_1 = require("../deals/deals.module");
const categories_controller_1 = require("./categories.controller");
const categories_model_1 = require("./categories.model");
const categories_service_1 = require("./categories.service");
let CategoryModule = class CategoryModule {
};
CategoryModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Category', schema: categories_model_1.CategorySchema }]),
            common_1.forwardRef(() => banner_module_1.BannerModule),
            deals_module_1.DealModule,
            common_1.forwardRef(() => sub_categories_module_1.SubCategoryModule),
            common_1.forwardRef(() => products_module_1.ProductModule)
        ],
        controllers: [categories_controller_1.CategoryController],
        providers: [categories_service_1.CategoryService],
        exports: [categories_service_1.CategoryService, mongoose_1.MongooseModule]
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;
//# sourceMappingURL=categories.module.js.map