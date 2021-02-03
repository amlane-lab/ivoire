import { CategoryService } from './categories.service';
import { UsersDTO } from '../users/users.model';
import { CategoryStatusUpdateDTO, CategorySaveDTO } from './categories.model';
import { UtilService } from '../utils/util.service';
import { UploadService } from '../utils/upload.service';
import { UploadImageDTO, CommonResponseModel, AdminQuery } from '../utils/app.model';
import { ProductService } from '../products/products.service';
import { SubCategoryService } from '../sub-categories/sub-categories.service';
import { BannerService } from '../banner/banner.service';
import { DealService } from '../deals/deals.service';
export declare class CategoryController {
    private categoryService;
    private SubCategoryService;
    private productService;
    private bannerService;
    private dealService;
    private utilService;
    private uploadService;
    constructor(categoryService: CategoryService, SubCategoryService: SubCategoryService, productService: ProductService, bannerService: BannerService, dealService: DealService, utilService: UtilService, uploadService: UploadService);
    getAllEnabledCategories(): Promise<CommonResponseModel>;
    getAllCategories(user: UsersDTO, adminQuery: AdminQuery): Promise<CommonResponseModel>;
    getCategorieDetail(user: UsersDTO, categoryId: string): Promise<CommonResponseModel>;
    getDropdownListCategory(user: UsersDTO): Promise<CommonResponseModel>;
    createCategory(user: UsersDTO, categoryData: CategorySaveDTO): Promise<CommonResponseModel>;
    updateCategory(user: UsersDTO, categoryId: string, categoryData: CategorySaveDTO): Promise<CommonResponseModel>;
    updateCategoryStatus(user: UsersDTO, categoryId: string, categoryStatusData: CategoryStatusUpdateDTO): Promise<CommonResponseModel>;
    deleteCategory(user: UsersDTO, categoryId: string): Promise<CommonResponseModel>;
    categoryImageUpload(user: UsersDTO, file: any, image: UploadImageDTO): Promise<CommonResponseModel>;
}
