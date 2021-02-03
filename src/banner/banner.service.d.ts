import { Model } from 'mongoose';
import { BannerDTO, BannerSaveDTO } from './banner.model';
export declare class BannerService {
    private readonly bannerModel;
    constructor(bannerModel: Model<any>);
    getAllEnabledBanners(): Promise<Array<BannerDTO>>;
    getAllBanner(page: number, limit: number, search: string): Promise<Array<BannerDTO>>;
    getBannerDetail(bannerId: String): Promise<BannerDTO>;
    countAllBanner(search: string): Promise<number>;
    createBanner(bannerData: BannerSaveDTO): Promise<BannerDTO>;
    updateBanner(bannerId: string, bannerData: BannerSaveDTO): Promise<BannerDTO>;
    deleteBanner(bannerId: string): Promise<BannerDTO>;
    countBannerByCategoryId(categoryId: string): Promise<number>;
    countBannerByProductId(productId: string): Promise<number>;
    getBannerTypeList(): Promise<{}>;
}
