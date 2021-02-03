import { SubCategoryService } from './sub-categories.service';
import { CategoryService } from '../categories/categories.service';
import { SubCategoryStatusDTO, SubCategorySaveDTO } from './sub-categories.model';
import { UtilService } from '../utils/util.service';
import { UsersDTO } from '../users/users.model';
import { CommonResponseModel, AdminQuery } from '../utils/app.model';
import { ProductService } from '../products/products.service';
export declare class SubCategoryController {
    private subCategoryService;
    private categoryService;
    private productService;
    private utilService;
    constructor(subCategoryService: SubCategoryService, categoryService: CategoryService, productService: ProductService, utilService: UtilService);
    getAllEnabledSubCategories(): Promise<CommonResponseModel>;
    getAllSubCategories(user: UsersDTO, adminQuery: AdminQuery): Promise<CommonResponseModel>;
    getDropdownListCategory(user: UsersDTO, categoryId: string): Promise<CommonResponseModel>;
    getSubCategoryDetail(user: UsersDTO, subCategoryId: string): Promise<CommonResponseModel>;
    createSubCategory(user: UsersDTO, subCategoryData: SubCategorySaveDTO): Promise<CommonResponseModel>;
    updateSubCategory(user: UsersDTO, subCategoryId: string, subCategoryData: SubCategorySaveDTO): Promise<CommonResponseModel>;
    updateStatusSubCategory(user: UsersDTO, subCategoryId: string, statusData: SubCategoryStatusDTO): Promise<CommonResponseModel>;
    deleteSubCategory(user: UsersDTO, subCategoryId: string): Promise<CommonResponseModel>;
}
