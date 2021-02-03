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
const products_module_1 = require("../products/products.module");
const sub_categories_controller_1 = require("./sub-categories.controller");
const sub_categories_model_1 = require("./sub-categories.model");
const sub_categories_service_1 = require("./sub-categories.service");
let SubCategoryModule = class SubCategoryModule {
};
SubCategoryModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'SubCategory', schema: sub_categories_model_1.SubCategorySchema }]),
            common_1.forwardRef(() => categories_module_1.CategoryModule),
            common_1.forwardRef(() => products_module_1.ProductModule)
        ],
        providers: [sub_categories_service_1.SubCategoryService],
        controllers: [sub_categories_controller_1.SubCategoryController],
        exports: [sub_categories_service_1.SubCategoryService, mongoose_1.MongooseModule]
    })
], SubCategoryModule);
exports.SubCategoryModule = SubCategoryModule;
//# sourceMappingURL=sub-categories.module.js.map