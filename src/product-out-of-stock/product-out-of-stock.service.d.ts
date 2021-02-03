import { Model } from 'mongoose';
import { StockVariantDTO } from './product-out-of-stock.model';
export declare class ProductOutOfStockService {
    private readonly productOutOfStockModel;
    constructor(productOutOfStockModel: Model<any>);
    createProductStock(notificationData: any): Promise<StockVariantDTO>;
    getAllList(page: number, limit: number): Promise<Array<any>>;
    countAllList(): Promise<number>;
    deleteOutOfStock(productId: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
