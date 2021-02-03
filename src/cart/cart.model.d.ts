import * as mongoose from 'mongoose';
import { CouponsDTO } from '../coupons/coupons.model';
import { ProductImagesDTO } from '../products/products.model';
export declare const CartSchema: mongoose.Schema<any>;
export declare const ProductOrderUserSchema: mongoose.Schema<any>;
export declare class CartModelDTO {
    _id: string;
    products: Array<String>;
    productIds: Array<string>;
    subTotal: number;
    tax: number;
    isFreeDelivery: boolean;
    grandTotal: number;
    deliveryCharges: number;
    user: string;
    deliveryAddress?: string;
    isOrderLinked: boolean;
    coupon?: string;
    couponInfo?: object;
    taxInfo?: object;
}
export interface CartModel {
    productId: string;
    title: string;
    productName: string;
    filePath: string;
    imageUrl: string;
    quantity: number;
    price: number;
    productTotal: number;
    unit: string;
    description: string;
    rating?: number;
    offerInfo?: CouponsDTO;
    dealPercent?: number;
    dealTotalAmount?: number;
    isDealAvailable?: boolean;
    productImages?: Array<ProductImagesDTO>;
}
export interface CartDataModel {
    _id?: string;
    cart: Array<String>;
    products: Array<string>;
    subTotal: number;
    tax: number;
    isFreeDelivery: boolean;
    grandTotal: number;
    deliveryCharges: number;
    user: string;
    userId: string;
    deliveryAddress?: string;
    isOrderLinked: boolean;
    coupon?: string;
    couponInfo?: object;
    taxInfo?: object;
}
export declare class DeleteCartProductDTO {
    cartId: string;
    productId: string;
}
export declare class CartUpdateDTO {
    productId: string;
    unit: string;
    quantity: number;
}
export declare class UpdateCartDTO {
    cartId: string;
    productId: string;
    quantity: number;
}
export declare class CartProductDTO {
    productId: string;
    productName: string;
    unit: string;
    price: number;
    quantity: number;
    productTotal: number;
    imageUrl: string;
    filePath: string;
    dealAmount: number;
    dealPercent: number;
    dealTotalAmount?: number;
    isDealAvailable?: boolean;
    isRated: any;
    rating: any;
    productImages: Array<ProductImagesDTO>;
}
export declare class TaxDTO {
    taxName: string;
    amount: number;
}
export declare class UserCartDTO {
    _id: string;
    products?: Array<CartProductDTO>;
    productIds: Array<String>;
    couponAmount: number;
    walletAmount: number;
    isOrderLinked: boolean;
    subTotal: number;
    tax: number;
    grandTotal: number;
    deliveryCharges: number;
    taxInfo?: TaxDTO;
}
export declare class ResponseMyCartDetail {
    response_code: string;
    response_data: UserCartDTO;
}
export declare class UpdateAddressDTO {
    deliveryAddress: string;
}
