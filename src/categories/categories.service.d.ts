import { Model } from 'mongoose';
import { CategoryStatusUpdateDTO, CategoryListDTO, CategoryAdminListDTO, CategoryAdminDetailDTO, CategorySaveDTO } from './categories.model';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<any>);
    getAllEnabledCategories(): Promise<Array<CategoryListDTO>>;
    getCategoryListForHome(limit: number): Promise<Array<CategoryListDTO>>;
    getAllCategories(page: number, limit: number, search: string): Promise<Array<CategoryAdminListDTO>>;
    countAllCategory(search: string): Promise<number>;
    countActiveCategory(): Promise<number>;
    getCategorieDetail(categoryId: String): Promise<CategoryAdminDetailDTO>;
    findCategoryByTitle(title: String): Promise<CategoryAdminDetailDTO>;
    createCategory(categoryData: CategorySaveDTO): Promise<CategoryAdminDetailDTO>;
    updateCategory(categoryId: string, categoryData: CategorySaveDTO): Promise<CategoryAdminDetailDTO>;
    deleteCategory(categoryId: string): Promise<CategoryAdminDetailDTO>;
    statusUpdate(categoryId: string, categoryStatusData: CategoryStatusUpdateDTO): Promise<any>;
    increaseSubCategoryCount(categoryId: string): Promise<any>;
    descreaseSubCategoryCount(categoryId: string): Promise<any>;
    updateDeal(categoryId: string, dealData: any): Promise<any>;
    getDropdownListCategory(): Promise<Array<any>>;
    getAllCategoriesWithNoSubCategories(): Promise<Array<any>>;
    getCategoryTitle(IDS: any): Promise<Array<any>>;
}
