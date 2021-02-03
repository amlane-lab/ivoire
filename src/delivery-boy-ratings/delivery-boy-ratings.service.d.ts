import { Model } from 'mongoose';
import { DeliveryBoyRatingSaveDTO } from './delivery-boy-ratings.model';
export declare class DeliveryBoyRatingsService {
    private readonly deliveryBoyRatingModel;
    constructor(deliveryBoyRatingModel: Model<any>);
    getDeliveryBoyRating(orderId: string): Promise<DeliveryBoyRatingSaveDTO>;
    saveDeliveryBoyRating(userId: string, ratingData: DeliveryBoyRatingSaveDTO): Promise<DeliveryBoyRatingSaveDTO>;
    getDeliveryBoyRatingForUser(userId: string, orderId: string): Promise<DeliveryBoyRatingSaveDTO>;
}
