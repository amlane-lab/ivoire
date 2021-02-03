import { CartService } from './cart.service';
import { UsersDTO } from '../users/users.model';
import { CartUpdateDTO, UpdateAddressDTO } from './cart.model';
import { UtilService } from '../utils/util.service';
import { SettingService } from '../settings/settings.service';
import { AddressService } from '../address/address.service';
import { CommonResponseModel } from '../utils/app.model';
import { CouponService } from '../coupons/coupons.service';
import { ProductService } from '../products/products.service';
export declare class CartController {
    private cartService;
    private productService;
    private settingService;
    private addressService;
    private couponService;
    private utilService;
    constructor(cartService: CartService, productService: ProductService, settingService: SettingService, addressService: AddressService, couponService: CouponService, utilService: UtilService);
    getUsersCartList(user: UsersDTO): Promise<CommonResponseModel>;
    verifyCart(user: UsersDTO): Promise<CommonResponseModel>;
    updateProductInCart(user: UsersDTO, cartData: CartUpdateDTO): Promise<CommonResponseModel>;
    removeProductFromCart(user: UsersDTO, productId: string): Promise<CommonResponseModel>;
    addAddress(user: UsersDTO, addressData: UpdateAddressDTO): Promise<CommonResponseModel>;
    applyCoupon(user: UsersDTO, couponCode: string): Promise<CommonResponseModel>;
    removeCoupon(user: UsersDTO, couponCode: string): Promise<CommonResponseModel>;
    applyWallet(user: UsersDTO): Promise<CommonResponseModel>;
    removeWallet(user: UsersDTO): Promise<CommonResponseModel>;
    deleteAllProducts(user: UsersDTO): Promise<CommonResponseModel>;
}
