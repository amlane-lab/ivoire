import * as mongoose from 'mongoose';
export declare enum CouponType {
    PERCENTAGE = "PERCENTAGE",
    AMOUNT = "AMOUNT"
}
export declare const CouponSchema: mongoose.Schema<any>;
export declare class CouponsDTO {
    _id: string;
    description: string;
    couponCode: string;
    offerValue: number;
    startDate: number;
    expiryDate: number;
    couponType: string;
    status: boolean;
}
export declare class ResponseCouponsDTO {
    _id: string;
    description: string;
    couponCode: string;
    offerValue: number;
    startDate: number;
    expiryDate: number;
    couponType: string;
}
export declare class CouponStatusDTO {
    status: boolean;
}
export declare class CouponCodeDTO {
    couponCode: string;
}
export declare class ResponseCouponsList {
    response_code: string;
    response_data: CouponsDTO;
}
export declare class ResponseCouponsListData extends ResponseCouponsList {
    total: number;
}
export declare class ResponseCouponsData {
    response_code: string;
    response_data: ResponseCouponsDTO;
}
