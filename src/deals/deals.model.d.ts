import * as mongoose from 'mongoose';
export declare enum DealType {
    CATEGORY = "CATEGORY",
    PRODUCT = "PRODUCT"
}
export declare const DealSchema: mongoose.Schema<any>;
export declare class ProductsDTO {
    productId: string;
    productName: string;
}
export declare class DealSaveDTO {
    title: string;
    description: string;
    dealPercent: number;
    dealType: string;
    categoryId: string;
    productId: string;
    imageUrl: string;
    imageId: string;
    filePath: string;
    topDeal: boolean;
    products: [ProductsDTO];
    categoryName: string;
    productName: string;
}
export declare class DealsDTO {
    _id: string;
    title: string;
    description: string;
    dealPercent: number;
    dealType: string;
    categoryId: string;
    productId: string;
    imageUrl: string;
    imageId: string;
    filePath: string;
    topDeal: boolean;
    status: boolean;
    products: [ProductsDTO];
}
export declare class DealStatusDTO {
    status: boolean;
}
export declare class FindDealDTO {
    title: string;
}
