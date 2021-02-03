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
const address_module_1 = require("../address/address.module");
const coupons_module_1 = require("../coupons/coupons.module");
const products_module_1 = require("../products/products.module");
const settings_module_1 = require("../settings/settings.module");
const cart_controller_1 = require("./cart.controller");
const cart_model_1 = require("./cart.model");
const cart_service_1 = require("./cart.service");
let CartModule = class CartModule {
};
CartModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Cart', schema: cart_model_1.CartSchema },
                { name: 'OrderProducts', schema: cart_model_1.ProductOrderUserSchema }
            ]),
            address_module_1.AddressModule,
            coupons_module_1.CouponsModule,
            common_1.forwardRef(() => products_module_1.ProductModule),
            settings_module_1.SettingModule
        ],
        controllers: [cart_controller_1.CartController],
        providers: [cart_service_1.CartService],
        exports: [cart_service_1.CartService, mongoose_1.MongooseModule]
    })
], CartModule);
exports.CartModule = CartModule;
//# sourceMappingURL=cart.module.js.map