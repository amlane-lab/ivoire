import { Model } from 'mongoose';
import { FavouritesDTO } from './favourites.model';
export declare class FavouriteService {
    private readonly favouritesModel;
    constructor(favouritesModel: Model<any>);
    getAllFavourite(userId: string): Promise<any>;
    getFavouriteByProductId(userId: string, productId: string): Promise<any>;
    saveFavourite(userId: string, productList: Array<string>): Promise<FavouritesDTO>;
    updateFavourite(userId: string, productList: Array<string>): Promise<FavouritesDTO>;
}
