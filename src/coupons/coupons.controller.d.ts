import { CouponService } from './coupons.service';
import { UsersDTO } from '../users/users.model';
import { CouponsDTO, CouponStatusDTO } from './coupons.model';
import { UtilService } from '../utils/util.service';
import { CommonResponseModel, AdminQuery } from '../utils/app.model';
export declare class CouponController {
    private couponService;
    private utilService;
    constructor(couponService: CouponService, utilService: UtilService);
    getAllBanner(user: UsersDTO, adminQuery: AdminQuery): Promise<CommonResponseModel>;
    couponDetailAdmin(user: UsersDTO, couponId: string): Promise<CommonResponseModel>;
    createCoupon(user: UsersDTO, couponData: CouponsDTO): Promise<CommonResponseModel>;
    updateCoupon(user: UsersDTO, couponId: string, couponData: CouponsDTO): Promise<CommonResponseModel>;
    deleteCoupon(user: UsersDTO, couponId: string): Promise<void | {
        response_code: any;
        response_data: string;
    }>;
    updateCouponStatus(user: UsersDTO, couponId: string, couponStatusData: CouponStatusDTO): Promise<void | {
        response_code: any;
        response_data: string;
    }>;
}
