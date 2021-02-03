import { RatingService } from './rating.service';
import { UsersDTO } from '../users/users.model';
import { RatingSaveDTO } from './rating.model';
import { UtilService } from '../utils/util.service';
import { CommonResponseModel } from '../utils/app.model';
import { ProductService } from '../products/products.service';
import { CartService } from '../cart/cart.service';
export declare class RatingController {
    private ratingService;
    private productService;
    private cartService;
    private utilService;
    constructor(ratingService: RatingService, productService: ProductService, cartService: CartService, utilService: UtilService);
    rateProduct(user: UsersDTO, ratingData: RatingSaveDTO): Promise<CommonResponseModel>;
}
