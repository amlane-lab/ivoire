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
const deals_controller_1 = require("./deals.controller");
const deals_model_1 = require("./deals.model");
const deals_service_1 = require("./deals.service");
let DealModule = class DealModule {
};
DealModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Deal', schema: deals_model_1.DealSchema }]),
            common_1.forwardRef(() => categories_module_1.CategoryModule),
            common_1.forwardRef(() => products_module_1.ProductModule)
        ],
        controllers: [deals_controller_1.DealController],
        providers: [deals_service_1.DealService],
        exports: [deals_service_1.DealService, mongoose_1.MongooseModule]
    })
], DealModule);
exports.DealModule = DealModule;
//# sourceMappingURL=deals.module.js.map