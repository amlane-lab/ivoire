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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const util_service_1 = require("../utils/util.service");
const app_model_1 = require("../utils/app.model");
const settings_model_1 = require("../settings/settings.model");
const notifications_model_1 = require("../notifications/notifications.model");
const coupons_service_1 = require("../coupons/coupons.service");
const coupons_model_1 = require("../coupons/coupons.model");
let CartService = class CartService {
    constructor(cartModel, orderProductModel, utilService, couponService) {
        this.cartModel = cartModel;
        this.orderProductModel = orderProductModel;
        this.utilService = utilService;
        this.couponService = couponService;
    }
    async getMyCart(userId) {
        const cart = await this.cartModel.findOne({ userId: userId, isOrderLinked: false }, '-_id -userId -createdAt -updatedAt -__v');
        return cart;
    }
    async getCartByUserId(id) {
        const cartInfo = await this.cartModel.findOne({ userId: id, isOrderLinked: false });
        return cartInfo;
    }
    async getCartById(id) {
        const cart = await this.cartModel.findOne({ _id: id }, '-_id -userId -createdAt -updatedAt -__v');
        return cart;
    }
    async deleteCartById(id) {
        const cart = await this.cartModel.findByIdAndDelete({ _id: id });
        return cart;
    }
    async getCartByIdOnlyProducts(id) {
        const cart = await this.cartModel.findOne({ _id: id }, 'productIds');
        return cart;
    }
    async addProductInOrdersForRating(productOrderData) {
        return await this.orderProductModel.updateOne({ userId: productOrderData.userId, productId: productOrderData.productId }, productOrderData, { upsert: true });
    }
    async isUserBoughtProduct(userId, productId) {
        return await this.orderProductModel.findOne({ userId: userId, productId: productId });
    }
    async findProductsById(userId, productIds) {
        return await this.orderProductModel.find({ userId: userId, productId: { $in: productIds } });
    }
    async updateRating(userId, productId, rating) {
        return await this.orderProductModel.updateOne({ userId: userId, productId: productId }, { isRated: true, rating: rating });
    }
    async checkOutOfStockOrLeft(product, cart) {
        let errArr;
        if (product && product.variant && product.variant.length) {
            const variant = product.variant.find(val => val.unit == cart["unit"]);
            if (variant) {
                if (variant.enable && variant.productStock < cart.quantity) {
                    const resMsg = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.CART_ITEM_LEFT);
                    errArr = `${product.title} - ${variant.unit} - ${variant.productStock} ${resMsg}`;
                }
            }
            else {
                const resMsg = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.CART_ITEM_OUT_OF_STOCK);
                errArr = `${product.title}  ${resMsg}`;
            }
        }
        else {
            const resMsg = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.CART_ITEM_OUT_OF_STOCK);
            errArr = `${product.title}  ${resMsg}`;
        }
        return errArr;
    }
    async verifyCart(products, carts) {
        let cartArr = [], productArr = [], productOutOfStock = [];
        for (let cartItem of carts.products) {
            const productIndex = await products.findIndex(val => val._id.toString() == cartItem.productId.toString());
            if (productIndex !== -1) {
                if (products[productIndex].variant.length) {
                    if (products[productIndex].status == false) {
                        const resMsg = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.PRODUCT_DISABLED_NOT_AVAILABLE_FOR_DELIVERY);
                        let errMsg = `${products[productIndex].title}  ${resMsg}`;
                        cartArr.push(errMsg);
                    }
                    else {
                        const varientIndex = await products[productIndex].variant.findIndex(val => val.unit == cartItem.unit);
                        if (varientIndex !== -1) {
                            if (products[productIndex].variant[varientIndex].enable && products[productIndex].variant[varientIndex].productStock < cartItem.quantity) {
                                if (products[productIndex].variant[varientIndex].productStock < 1) {
                                    const resMsg = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.CART_ITEM_OUT_OF_STOCK);
                                    let errMsg = `${products[productIndex].title} - ${products[productIndex].variant[varientIndex].unit} ${resMsg}`;
                                    cartArr.push(errMsg);
                                }
                                const resMsg = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.CART_ITEM_LEFT);
                                let errMsg = `${products[productIndex].title} - ${products[productIndex].variant[varientIndex].unit} - ${products[productIndex].variant[varientIndex].productStock} ${resMsg}`;
                                cartArr.push(errMsg);
                            }
                            else {
                                products[productIndex].variant[varientIndex].productStock = products[productIndex].variant[varientIndex].productStock - cartItem.quantity;
                                productArr.push(products[productIndex]);
                                if (products[productIndex].variant[varientIndex].productStock === 0) {
                                    productOutOfStock.push({ productId: products[productIndex]._id, title: products[productIndex].title, unit: products[productIndex].variant[varientIndex].unit, notifyType: notifications_model_1.NotificationType.PRODUCT_OUT_OF_STOCK });
                                }
                            }
                        }
                    }
                }
            }
        }
        return { cartArr, productArr, productOutOfStock };
    }
    async verifyPosCart(products, carts) {
        let cartArr = [], productArr = [], productOutOfStock = [];
        for (let cartItem of carts.cart) {
            const productIndex = await products.findIndex(val => val._id.toString() == cartItem.productId.toString());
            if (productIndex !== -1) {
                if (products[productIndex].variant.length) {
                    if (products[productIndex].status == false) {
                        const resMsg = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.PRODUCT_DISABLED_NOT_AVAILABLE_FOR_DELIVERY);
                        let errMsg = `${products[productIndex].title}  ${resMsg}`;
                        cartArr.push(errMsg);
                    }
                    else {
                        const varientIndex = await products[productIndex].variant.findIndex(val => val.unit == cartItem.unit);
                        if (varientIndex !== -1) {
                            if (products[productIndex].variant[varientIndex].enable && products[productIndex].variant[varientIndex].productStock < cartItem.quantity) {
                                if (products[productIndex].variant[varientIndex].productStock < 1) {
                                    const resMsg = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.CART_ITEM_OUT_OF_STOCK);
                                    let errMsg = `${products[productIndex].title} - ${products[productIndex].variant[varientIndex].unit} ${resMsg}`;
                                    cartArr.push(errMsg);
                                }
                                const resMsg = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.CART_ITEM_LEFT);
                                let errMsg = `${products[productIndex].title} - ${products[productIndex].variant[varientIndex].unit} - ${products[productIndex].variant[varientIndex].productStock} ${resMsg}`;
                                cartArr.push(errMsg);
                            }
                            else {
                                products[productIndex].variant[varientIndex].productStock = products[productIndex].variant[varientIndex].productStock - cartItem.quantity;
                                productArr.push(products[productIndex]);
                                if (products[productIndex].variant[varientIndex].productStock === 0) {
                                    productOutOfStock.push({ productId: products[productIndex]._id, title: products[productIndex].title, unit: products[productIndex].variant[varientIndex].unit, notifyType: notifications_model_1.NotificationType.PRODUCT_OUT_OF_STOCK });
                                }
                            }
                        }
                    }
                }
            }
        }
        return { cartArr, productArr, productOutOfStock };
    }
    calculateProductPrice(product, cart) {
        let price = 0, unit, dealAmount = 0, productTotal = 0;
        const variant = product.variant.find(val => val.unit == cart["unit"]);
        if (variant) {
            price = variant['price'];
            unit = variant['unit'];
        }
        productTotal = Number(price) * Number(cart.quantity);
        if (product.isDealAvailable) {
            dealAmount = Number(product.dealPercent * price) / 100;
            productTotal = (price - dealAmount) * cart.quantity;
        }
        let cartInfo;
        if (product.productImages.length > 0) {
            cartInfo = {
                productId: product._id.toString(),
                productName: product.title,
                unit: unit,
                price: price,
                quantity: cart.quantity,
                productTotal: productTotal,
                imageUrl: product.productImages[0].imageUrl,
                filePath: product.productImages[0].filePath,
                dealAmount: dealAmount,
                dealPercent: product.dealPercent,
                dealTotalAmount: dealAmount * cart.quantity,
                isDealAvailable: product.isDealAvailable,
                productImages: product.productImages,
                categoryId: product.categoryId ? product.categoryId.toString() : null,
                subCategoryId: product.subCategoryId ? product.subCategoryId.toString() : null
            };
        }
        else {
            cartInfo = {
                productId: product._id.toString(),
                productName: product.title,
                unit: unit,
                price: price,
                quantity: cart.quantity,
                productTotal: productTotal,
                imageUrl: product.imageUrl,
                filePath: product.filePath,
                dealAmount: dealAmount,
                dealPercent: product.dealPercent,
                dealTotalAmount: dealAmount * cart.quantity,
                isDealAvailable: product.isDealAvailable,
                productImages: [],
                categoryId: product.categoryId ? product.categoryId.toString() : null,
                subCategoryId: product.subCategoryId ? product.subCategoryId.toString() : null
            };
        }
        console.log({ cartInfo });
        return cartInfo;
    }
    calculatePosProductPrice(product, cart) {
        let price = 0, unit, dealAmount = 0, productTotal = 0;
        const variant = product.variant.find(val => val.unit == cart["unit"]);
        if (variant) {
            price = variant['price'];
            unit = variant['unit'];
        }
        productTotal = Number(price) * Number(cart.quantity);
        if (product.isDealAvailable) {
            dealAmount = Number(product.dealPercent * price) / 100;
            productTotal = (price - dealAmount) * cart.quantity;
        }
        let cartInfo;
        if (product.productImages.length > 0) {
            cartInfo = {
                productId: product._id.toString(),
                productTitle: product.title,
                unit: unit,
                productPrice: price,
                quantity: cart.quantity,
                productTotal: productTotal,
                imageUrl: product.productImages[0].imageUrl,
                filePath: product.productImages[0].filePath,
                dealAmount: dealAmount,
                dealPercent: product.dealPercent,
                dealTotalAmount: dealAmount * cart.quantity,
                isDealAvailable: product.isDealAvailable,
                productImages: product.productImages,
                categoryId: product.categoryId ? product.categoryId.toString() : null,
                subCategoryId: product.subCategoryId ? product.subCategoryId.toString() : null
            };
        }
        else {
            cartInfo = {
                productId: product._id.toString(),
                productTitle: product.title,
                unit: unit,
                productPrice: price,
                quantity: cart.quantity,
                productTotal: productTotal,
                imageUrl: product.imageUrl,
                filePath: product.filePath,
                dealAmount: dealAmount,
                dealPercent: product.dealPercent,
                dealTotalAmount: dealAmount * cart.quantity,
                isDealAvailable: product.isDealAvailable,
                productImages: [],
                categoryId: product.categoryId ? product.categoryId.toString() : null,
                subCategoryId: product.subCategoryId ? product.subCategoryId.toString() : null
            };
        }
        return cartInfo;
    }
    async calculateTotal(cartInfo, deliveryTax, address) {
        cartInfo.subTotal = 0;
        cartInfo.products.forEach(cart => { cartInfo.subTotal += Number((cart.productTotal).toFixed(2)); });
        if (deliveryTax) {
            cartInfo.tax = this.taxCalculation(cartInfo, deliveryTax);
            cartInfo.taxInfo = { taxName: deliveryTax.taxName, amount: deliveryTax.taxAmount };
        }
        if (address) {
            cartInfo.deliveryCharges = await this.calculateDeliveryCharge(deliveryTax, cartInfo.subTotal, address);
        }
        let couponDiscount = 0;
        if (cartInfo.couponCode) {
            const coupon = await this.couponService.getCouponDetailByCode(cartInfo.couponCode);
            if (!coupon)
                this.utilService.badRequest(app_model_1.ResponseMessage.COUPON_NOT_FOUND);
            const currentDate = Date.now();
            if (coupon.startDate < currentDate && coupon.expiryDate > currentDate) {
                if (coupon.couponType === coupons_model_1.CouponType.PERCENTAGE)
                    couponDiscount = Number((cartInfo.subTotal * (coupon.offerValue / 100)).toFixed(2));
                else if (coupon.couponType === coupons_model_1.CouponType.AMOUNT)
                    couponDiscount = Number(coupon.offerValue);
            }
        }
        cartInfo.couponAmount = couponDiscount || 0;
        cartInfo.walletAmount = cartInfo.walletAmount || 0;
        cartInfo.grandTotal = Number((cartInfo.subTotal + cartInfo.deliveryCharges + cartInfo.tax - cartInfo.couponAmount - cartInfo.walletAmount).toFixed(2));
        return cartInfo;
    }
    async getCartDetail(cartId) {
        const cartInfo = await this.cartModel.findById(cartId);
        return cartInfo;
    }
    async saveCart(cartInfo) {
        const cart = await this.cartModel.create(cartInfo);
        return cart;
    }
    async updateCart(cartId, cartInfo) {
        const cart = await this.cartModel.findByIdAndUpdate(cartId, cartInfo, { new: true });
        return cart;
    }
    async updateAddressInCart(cartId, cartInfo) {
        const cart = await this.cartModel.findByIdAndUpdate(cartId, cartInfo, { fields: { deliveryCharges: 1, grandTotal: 1, deliveryAddress: 1 }, new: true });
        return cart;
    }
    taxCalculation(cart, deliveryAndTaxSetting) {
        let tax = Number((cart.subTotal * deliveryAndTaxSetting.taxAmount / 100).toFixed(2));
        return tax;
    }
    async deleteCart(cartId) {
        const cart = await this.cartModel.findByIdAndDelete(cartId);
        return cart;
    }
    async cartOrderUnlink(cartId) {
        await this.cartModel.findByIdAndUpdate(cartId, { isOrderLinked: true });
        return true;
    }
    async calculateDeliveryCharge(deliveryTax, subTotal, address) {
        let deliveryCharges = 0;
        if (deliveryTax.deliveryType === settings_model_1.DeliveryType.FLEXIBLE) {
            const storeLocation = { latitude: deliveryTax.location.latitude, longitude: deliveryTax.location.longitude };
            const userLocation = { latitude: address.location.latitude, longitude: address.location.longitude };
            const preciseDistance = this.utilService.calculateDistance(userLocation, storeLocation);
            deliveryCharges = Number((deliveryTax.deliveryChargePerKm * preciseDistance).toFixed(2));
            if (deliveryTax.minOrderAmountForFree && subTotal >= deliveryTax.minOrderAmountForFree)
                deliveryCharges = 0;
            deliveryCharges = Number(deliveryCharges);
        }
        else if (deliveryTax.deliveryType === settings_model_1.DeliveryType.FIXED) {
            deliveryCharges = Number((deliveryTax.fixedDeliveryCharges).toFixed(2));
            if (deliveryTax.minOrderAmountForFree && subTotal >= deliveryTax.minOrderAmountForFree)
                deliveryCharges = 0;
        }
        return deliveryCharges;
    }
};
CartService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Cart')),
    __param(1, mongoose_1.InjectModel('OrderProducts')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        util_service_1.UtilService,
        coupons_service_1.CouponService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map