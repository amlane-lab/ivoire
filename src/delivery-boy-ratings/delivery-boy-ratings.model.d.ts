import * as mongoose from 'mongoose';
export declare const DeliveryBoyRatingSchema: mongoose.Schema<any>;
export declare class DeliveryBoyRatingSaveDTO {
    rate: number;
    description?: string;
    orderId: string;
    userId?: string;
    deliveryBoyId: string;
}
