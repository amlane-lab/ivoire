import { Model } from 'mongoose';
import { CartDataModel, UserCartDTO } from './cart.model';
import { UtilService } from '../utils/util.service';
import { CouponService } from '../coupons/coupons.service';
export declare class CartService {
    private readonly cartModel;
    private readonly orderProductModel;
    private utilService;
    private couponService;
    constructor(cartModel: Model<any>, orderProductModel: Model<any>, utilService: UtilService, couponService: CouponService);
    getMyCart(userId: string): Promise<UserCartDTO>;
    getCartByUserId(id: string): Promise<any>;
    getCartById(id: string): Promise<UserCartDTO>;
    deleteCartById(id: string): Promise<UserCartDTO>;
    getCartByIdOnlyProducts(id: string): Promise<UserCartDTO>;
    addProductInOrdersForRating(productOrderData: any): Promise<any>;
    isUserBoughtProduct(userId: string, productId: string): Promise<number>;
    findProductsById(userId: string, productIds: any): Promise<any>;
    updateRating(userId: string, productId: string, rating: number): Promise<any>;
    checkOutOfStockOrLeft(product: any, cart: any): Promise<any>;
    verifyCart(products: any, carts: any): Promise<any>;
    verifyPosCart(products: any, carts: any): Promise<any>;
    calculateProductPrice(product: any, cart: any): any;
    calculatePosProductPrice(product: any, cart: any): any;
    calculateTotal(cartInfo: any, deliveryTax?: any, address?: any): Promise<any>;
    getCartDetail(cartId: string): Promise<UserCartDTO>;
    saveCart(cartInfo: any): Promise<UserCartDTO>;
    updateCart(cartId: any, cartInfo: any): Promise<UserCartDTO>;
    updateAddressInCart(cartId: any, cartInfo: any): Promise<UserCartDTO>;
    taxCalculation(cart: CartDataModel, deliveryAndTaxSetting: any): number;
    deleteCart(cartId: any): Promise<UserCartDTO>;
    cartOrderUnlink(cartId: string): Promise<Boolean>;
    calculateDeliveryCharge(deliveryTax: any, subTotal: any, address: any): Promise<number>;
}
