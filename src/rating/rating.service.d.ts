import { Model } from 'mongoose';
import { RatingDTO, RatingSaveDTO } from './rating.model';
export declare class RatingService {
    private readonly ratingModel;
    constructor(ratingModel: Model<any>);
    getProductRate(userId: string, productId: string): Promise<RatingDTO>;
    saveRating(userId: string, ratingData: RatingSaveDTO): Promise<RatingDTO>;
    updateRating(userId: string, productId: string, rate: number): Promise<RatingDTO>;
}
