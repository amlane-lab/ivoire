import { FavouriteService } from './favourites.service';
import { UsersDTO } from '../users/users.model';
import { UtilService } from '../utils/util.service';
import { CommonResponseModel } from '../utils/app.model';
import { ProductService } from '../products/products.service';
import { CartService } from '../cart/cart.service';
export declare class FavouriteController {
    private FavouriteService;
    private productService;
    private cartService;
    private utilService;
    constructor(FavouriteService: FavouriteService, productService: ProductService, cartService: CartService, utilService: UtilService);
    getAllFavourite(user: UsersDTO): Promise<CommonResponseModel>;
    addProductToFavourite(user: UsersDTO, productId: string): Promise<CommonResponseModel>;
    deleteFavourite(user: UsersDTO, productId: string): Promise<CommonResponseModel>;
}
