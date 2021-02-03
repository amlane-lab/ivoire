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
const favourites_controller_1 = require("./favourites.controller");
const favourites_model_1 = require("./favourites.model");
const favourites_service_1 = require("./favourites.service");
let FavouritesModule = class FavouritesModule {
};
FavouritesModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Favourite', schema: favourites_model_1.FavouriteSchema }]),
            common_1.forwardRef(() => products_module_1.ProductModule),
            cart_module_1.CartModule
        ],
        controllers: [favourites_controller_1.FavouriteController],
        providers: [favourites_service_1.FavouriteService],
        exports: [favourites_service_1.FavouriteService, mongoose_1.MongooseModule]
    })
], FavouritesModule);
exports.FavouritesModule = FavouritesModule;
//# sourceMappingURL=favourites.module.js.map