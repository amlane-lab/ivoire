import { UsersDTO } from '../users/users.model';
import { CommonResponseModel } from '../utils/app.model';
import { DeliveryBoyRatingSaveDTO } from './delivery-boy-ratings.model';
import { DeliveryBoyRatingsService } from './delivery-boy-ratings.service';
import { UtilService } from '../utils/util.service';
import { OrderService } from '../order/order.service';
export declare class DeliveryBoyRatingsController {
    private deliveryBoyRatingService;
    private utilService;
    private orderService;
    constructor(deliveryBoyRatingService: DeliveryBoyRatingsService, utilService: UtilService, orderService: OrderService);
    rateDeliveryBoy(user: UsersDTO, ratingData: DeliveryBoyRatingSaveDTO): Promise<CommonResponseModel>;
}
