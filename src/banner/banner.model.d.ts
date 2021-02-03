import * as mongoose from 'mongoose';
export declare enum BannerType {
    CATEGORY = "CATEGORY",
    PRODUCT = "PRODUCT"
}
export declare const BannerSchema: mongoose.Schema<any>;
export declare class BannerSaveDTO {
    title: string;
    description: string;
    bannerType: string;
    imageUrl: string;
    imageId: string;
    filePath: string;
    categoryId: string;
    productId: string;
    categoryName: string;
    productName: string;
    status: boolean;
}
export declare class BannerDTO extends BannerSaveDTO {
    _id: string;
}
export declare class ResponseUserBannerList {
    response_code: string;
    response_data: BannerDTO;
}
export declare class ResponseBanner {
    response_code: string;
    response_data: BannerDTO;
}
export declare class ResponseBannerList extends ResponseUserBannerList {
    total: number;
}
export declare class ResponseBannerType {
    response_code: string;
    response_data: object;
}
