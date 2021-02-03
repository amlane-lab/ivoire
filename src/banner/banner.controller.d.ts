import { BannerService } from './banner.service';
import { UsersDTO } from '../users/users.model';
import { BannerSaveDTO } from './banner.model';
import { UtilService } from '../utils/util.service';
import { UploadImageDTO, CommonResponseModel, AdminQuery } from '../utils/app.model';
import { UploadService } from '../utils/upload.service';
import { CategoryService } from '../categories/categories.service';
import { ProductService } from '../products/products.service';
export declare class BannerController {
    private bannerService;
    private categoryService;
    private ProductService;
    private utilService;
    private uploadService;
    constructor(bannerService: BannerService, categoryService: CategoryService, ProductService: ProductService, utilService: UtilService, uploadService: UploadService);
    getAllEnabledBanners(): Promise<CommonResponseModel>;
    getAllBanner(user: UsersDTO, adminQuery: AdminQuery): Promise<CommonResponseModel>;
    getBannerDetail(user: UsersDTO, bannerId: string): Promise<CommonResponseModel>;
    createBanner(user: UsersDTO, bannerData: BannerSaveDTO): Promise<CommonResponseModel>;
    updateBanner(user: UsersDTO, bannerId: string, bannerData: BannerSaveDTO): Promise<CommonResponseModel>;
    deleteBanner(user: UsersDTO, bannerId: string): Promise<CommonResponseModel>;
    categoryImageUpload(user: UsersDTO, file: any, image: UploadImageDTO): Promise<CommonResponseModel>;
    getBannerTypeList(user: UsersDTO): Promise<CommonResponseModel>;
}
