import * as mongoose from 'mongoose';
export declare const ProductOutOfStockSchema: mongoose.Schema<any>;
export declare class StockVariantDTO {
    productId: string;
    title: string;
    unit: string;
}
