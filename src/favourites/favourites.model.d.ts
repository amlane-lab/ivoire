import * as mongoose from 'mongoose';
import { FavourutesResponseDTO } from '../products/products.model';
export declare const FavouriteSchema: mongoose.Schema<any>;
export declare class FavouritesDTO {
    _id: string;
    productId: string;
    userId: string;
}
export declare class FavouritesProductsDTO extends FavourutesResponseDTO {
    productId: string;
}
export declare class ResponseFavouritesDTO {
    response_code: string;
    response_data: FavourutesResponseDTO;
}
