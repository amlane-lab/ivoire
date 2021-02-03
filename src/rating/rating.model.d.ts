import * as mongoose from 'mongoose';
export declare const RatingSchema: mongoose.Schema<any>;
export declare class RatingSaveDTO {
    rate: number;
    description?: string;
    productId: string;
    userId: string;
}
export declare class RatingDTO extends RatingSaveDTO {
}
