"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const users_model_1 = require("../users/users.model");
const cart_model_1 = require("./cart.model");
const coupons_model_1 = require("../coupons/coupons.model");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const util_service_1 = require("../utils/util.service");
const settings_service_1 = require("../settings/settings.service");
const address_service_1 = require("../address/address.service");
const app_model_1 = require("../utils/app.model");
const coupons_service_1 = require("../coupons/coupons.service");
const products_service_1 = require("../products/products.service");
const jwt_strategy_1 = require("../utils/jwt.strategy");
let CartController = class CartController {
    constructor(cartService, productService, settingService, addressService, couponService, utilService) {
        this.cartService = cartService;
        this.productService = productService;
        this.settingService = settingService;
        this.addressService = addressService;
        this.couponService = couponService;
        this.utilService = utilService;
    }
    async getUsersCartList(user) {
        this.utilService.validateUserRole(user);
        try {
            const cart = await this.cartService.getMyCart(user._id);
            if (cart)
                return this.utilService.successResponseData(cart);
            else
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.CART_ITEM_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async verifyCart(user) {
        this.utilService.validateUserRole(user);
        try {
            const userCart = await this.cartService.getCartByUserId(user._id);
            if (userCart) {
                const products = await this.productService.getProductByIds(userCart.productIds);
                const cartVerifyData = await this.cartService.verifyCart(products, userCart);
                if (cartVerifyData.cartArr.length > 0)
                    this.utilService.badRequest(cartVerifyData.cartArr);
                else
                    return this.utilService.successResponseMsg(app_model_1.ResponseMessage.CART_VERIFIED);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.CART_ITEM_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateProductInCart(user, cartData) {
        this.utilService.validateUserRole(user);
        try {
            const userCart = await this.cartService.getCartByUserId(user._id);
            let updatedData;
            let cartInfo = {
                isFreeDelivery: false,
                productIds: [],
                subTotal: 0,
                tax: 0,
                grandTotal: 0,
                deliveryCharges: 0,
                isOrderLinked: false,
                userId: user._id,
                products: userCart ? (userCart.products ? userCart.products : []) : [],
            };
            if (userCart) {
                userCart["walletAmount"] = 0;
                cartInfo = userCart;
            }
            const product = await this.productService.getProductDetail(cartData.productId);
            const outOfStockOrLeft = await this.cartService.checkOutOfStockOrLeft(product, cartData);
            if (outOfStockOrLeft)
                this.utilService.badRequest(outOfStockOrLeft);
            const cartIndex = cartInfo.products.findIndex(val => val.productId == cartData.productId);
            if (cartIndex !== -1)
                cartInfo.products[cartIndex].quantity = cartData.quantity;
            else
                cartInfo.productIds.push(product._id);
            const productPrice = this.cartService.calculateProductPrice(product, cartData);
            if (cartIndex !== -1)
                cartInfo.products[cartIndex] = productPrice;
            else
                cartInfo.products.push(productPrice);
            const deliveryTax = await this.settingService.getDeliveryTaxSettings();
            let response;
            if (userCart && userCart.deliveryAddress) {
                const address = await this.addressService.getAddressDetail(user._id, userCart.deliveryAddress);
                response = await this.cartService.calculateTotal(cartInfo, deliveryTax, address);
            }
            else {
                response = await this.cartService.calculateTotal(cartInfo, deliveryTax);
            }
            let message = '';
            if (userCart) {
                updatedData = await this.cartService.updateCart(userCart._id, response);
                message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.CART_UPDATED_PRODUCT);
            }
            else {
                updatedData = await this.cartService.saveCart(response);
                message = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.CART_ADDED_PRODUCT);
            }
            if (updatedData)
                return this.utilService.successResponseData(updatedData, { message: message });
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async removeProductFromCart(user, productId) {
        this.utilService.validateUserRole(user);
        try {
            const userCart = await this.cartService.getCartByUserId(user._id);
            if (!userCart)
                this.utilService.badRequest(app_model_1.ResponseMessage.CART_NOT_FOUND);
            userCart.walletAmount = 0;
            const cartIndex = userCart.productIds.findIndex(c => c == productId);
            if (cartIndex === -1)
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
            userCart.productIds.splice(cartIndex, 1);
            const productIndex = userCart.products.findIndex(p => p.productId == productId);
            userCart.products.splice(productIndex, 1);
            const deliveryTax = await this.settingService.getDeliveryTaxSettings();
            let response;
            if (userCart.deliveryAddress) {
                const address = await this.addressService.getAddressDetail(user._id, userCart.deliveryAddress);
                response = await this.cartService.calculateTotal(userCart, deliveryTax, address);
            }
            else {
                response = await this.cartService.calculateTotal(userCart, deliveryTax);
            }
            const updatedData = await this.cartService.updateCart(userCart._id, response);
            if (updatedData)
                return this.utilService.successResponseData(updatedData);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async addAddress(user, addressData) {
        this.utilService.validateUserRole(user);
        try {
            const address = await this.addressService.getAddressDetail(user._id, addressData.deliveryAddress);
            if (!address)
                this.utilService.badRequest(app_model_1.ResponseMessage.ADDRESS_NOT_FOUND);
            const userCart = await this.cartService.getCartByUserId(user._id);
            if (!userCart)
                this.utilService.badRequest(app_model_1.ResponseMessage.CART_NOT_FOUND);
            const deliveryTax = await this.settingService.getDeliveryTaxSettings();
            userCart.deliveryCharges = await this.cartService.calculateDeliveryCharge(deliveryTax, userCart.subTotal, address);
            userCart.deliveryAddress = address._id;
            const upadatedCart = await this.cartService.calculateTotal(userCart);
            const updatedData = await this.cartService.updateAddressInCart(userCart._id, upadatedCart);
            if (updatedData)
                return this.utilService.successResponseData(updatedData);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async applyCoupon(user, couponCode) {
        this.utilService.validateUserRole(user);
        try {
            const coupon = await this.couponService.getCouponDetailByCode(couponCode);
            if (!coupon)
                this.utilService.badRequest(app_model_1.ResponseMessage.COUPON_NOT_FOUND);
            const currentDate = Date.now();
            let couponDiscount = 0;
            if (coupon.startDate < currentDate && coupon.expiryDate > currentDate) {
                const userCart = await this.cartService.getCartByUserId(user._id);
                if (!userCart)
                    this.utilService.badRequest(app_model_1.ResponseMessage.CART_NOT_FOUND);
                if (coupon.couponType === coupons_model_1.CouponType.PERCENTAGE)
                    couponDiscount = Number((userCart.subTotal * (coupon.offerValue / 100)).toFixed(2));
                else if (coupon.couponType === coupons_model_1.CouponType.AMOUNT)
                    couponDiscount = Number(coupon.offerValue);
                userCart.couponCode = couponCode;
                userCart.couponAmount = couponDiscount;
                userCart.walletAmount = 0;
                const upadatedCart = await this.cartService.calculateTotal(userCart);
                const updatedData = await this.cartService.updateCart(userCart._id, upadatedCart);
                if (updatedData)
                    return this.utilService.successResponseData(updatedData);
                else
                    this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.COUPON_EXPIRED);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async removeCoupon(user, couponCode) {
        this.utilService.validateUserRole(user);
        try {
            const userCart = await this.cartService.getCartByUserId(user._id);
            if (!userCart)
                this.utilService.badRequest(app_model_1.ResponseMessage.CART_NOT_FOUND);
            if (userCart.couponCode !== couponCode)
                this.utilService.badRequest(app_model_1.ResponseMessage.COUPON_NOT_FOUND);
            userCart.couponCode = null;
            userCart.couponAmount = 0;
            userCart.walletAmount = 0;
            const upadatedCart = await this.cartService.calculateTotal(userCart);
            const updatedData = await this.cartService.updateCart(userCart._id, upadatedCart);
            if (updatedData)
                return this.utilService.successResponseData(updatedData);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async applyWallet(user) {
        this.utilService.validateUserRole(user);
        try {
            const userWalletAmount = user.walletAmount;
            if (!userWalletAmount)
                this.utilService.badRequest(app_model_1.ResponseMessage.WALLET_INSUFFICENT_AMOUNT);
            const userCart = await this.cartService.getCartByUserId(user._id);
            if (!userCart)
                this.utilService.badRequest(app_model_1.ResponseMessage.CART_NOT_FOUND);
            let grandTotal = userCart.grandTotal + userCart.walletAmount;
            let walletAmount = 0;
            if (userWalletAmount >= grandTotal)
                walletAmount = grandTotal;
            else
                walletAmount = userWalletAmount;
            userCart.walletAmount = walletAmount;
            const upadatedCart = await this.cartService.calculateTotal(userCart);
            const updatedData = await this.cartService.updateCart(userCart._id, upadatedCart);
            if (updatedData)
                return this.utilService.successResponseData(updatedData);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async removeWallet(user) {
        this.utilService.validateUserRole(user);
        try {
            const userCart = await this.cartService.getCartByUserId(user._id);
            if (!userCart)
                this.utilService.badRequest(app_model_1.ResponseMessage.CART_NOT_FOUND);
            userCart.walletAmount = 0;
            const upadatedCart = await this.cartService.calculateTotal(userCart);
            const updatedData = await this.cartService.updateCart(userCart._id, upadatedCart);
            if (updatedData)
                return this.utilService.successResponseData(updatedData);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteAllProducts(user) {
        this.utilService.validateUserRole(user);
        try {
            const userCart = await this.cartService.getCartByUserId(user._id);
            if (!userCart)
                this.utilService.badRequest(app_model_1.ResponseMessage.CART_NOT_FOUND);
            const deleteCart = await this.cartService.deleteCart(userCart._id);
            if (deleteCart)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.CART_DELETED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/my'),
    swagger_1.ApiOperation({ title: 'Get my cart detail' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return cart detail', type: cart_model_1.ResponseMyCartDetail }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getUsersCartList", null);
__decorate([
    common_1.Get('/verify'),
    swagger_1.ApiOperation({ title: 'Verify cart' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "verifyCart", null);
__decorate([
    common_1.Post('/update'),
    swagger_1.ApiOperation({ title: 'Add or update product in my cart' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: cart_model_1.ResponseMyCartDetail }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, cart_model_1.CartUpdateDTO]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateProductInCart", null);
__decorate([
    common_1.Put('/remove/:productId'),
    swagger_1.ApiOperation({ title: 'remove product from my cart' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: cart_model_1.ResponseMyCartDetail }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeProductFromCart", null);
__decorate([
    common_1.Post('/update-address'),
    swagger_1.ApiOperation({ title: 'update address for my cart' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: cart_model_1.ResponseMyCartDetail }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, cart_model_1.UpdateAddressDTO]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addAddress", null);
__decorate([
    common_1.Post('/apply-coupon/:couponCode'),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: cart_model_1.ResponseMyCartDetail }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    swagger_1.ApiOperation({ title: 'Apply coupon for my cart' }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('couponCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "applyCoupon", null);
__decorate([
    common_1.Delete('/remove-coupon/:couponCode'),
    swagger_1.ApiOperation({ title: 'Remove coupon for my cart' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('couponCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeCoupon", null);
__decorate([
    common_1.Post('/apply-wallet'),
    swagger_1.ApiOperation({ title: 'Apply wallet for my cart' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: cart_model_1.ResponseMyCartDetail }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "applyWallet", null);
__decorate([
    common_1.Delete('/remove-wallet'),
    swagger_1.ApiOperation({ title: 'Remove wallet for my cart' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: cart_model_1.ResponseMyCartDetail }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeWallet", null);
__decorate([
    common_1.Delete('/delete'),
    swagger_1.ApiOperation({ title: 'Remove all product from cart' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteAllProducts", null);
CartController = __decorate([
    common_1.Controller('carts'),
    swagger_1.ApiUseTags('Carts'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [cart_service_1.CartService,
        products_service_1.ProductService,
        settings_service_1.SettingService,
        address_service_1.AddressService,
        coupons_service_1.CouponService,
        util_service_1.UtilService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map