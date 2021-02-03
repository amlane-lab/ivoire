import { Model } from 'mongoose';
import { CouponsDTO, CouponStatusDTO } from './coupons.model';
export declare class CouponService {
    private readonly couponsModel;
    constructor(couponsModel: Model<any>);
    getAllCoupon(page: number, limit: number, search: string): Promise<Array<CouponsDTO>>;
    countAllCoupon(search: string): Promise<number>;
    getCouponDetail(couponId: string): Promise<CouponsDTO>;
    findCouponByCode(code: String): Promise<any>;
    getCouponDetailByCode(code: String): Promise<CouponsDTO>;
    createCoupon(couponData: CouponsDTO): Promise<CouponsDTO>;
    updateCoupon(couponId: string, couponData: CouponsDTO): Promise<CouponsDTO>;
    deleteCoupon(couponId: string): Promise<CouponsDTO>;
    couponStatusUpdate(id: string, couponStatusData: CouponStatusDTO): Promise<CouponsDTO>;
}
