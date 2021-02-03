import { Model } from 'mongoose';
import { SubCategoryDTO, SubCategoryStatusDTO, SubCategoryUserDTO, SubCategoryDropdownDTO, SubCategorySaveDTO } from './sub-categories.model';
export declare class SubCategoryService {
    private readonly subcategoryModel;
    constructor(subcategoryModel: Model<any>);
    getAllEnabledSubCategories(): Promise<Array<SubCategoryUserDTO>>;
    getAllSubCategories(page: number, limit: number, search: string): Promise<Array<SubCategoryDTO>>;
    getAllSubCategoriesForImport(): Promise<Array<SubCategoryDTO>>;
    countAllSubCategories(search: string): Promise<number>;
    findSubCategoryByTitle(title: String, categoryId: String): Promise<Array<SubCategoryDTO>>;
    getSubCategoryDetail(subCategoryId: String): Promise<SubCategoryDropdownDTO>;
    findSubCategoryByIdAndCatId(subCategoryId: String, categoryId: string): Promise<SubCategoryDropdownDTO>;
    createSubCategory(subCategoryData: SubCategorySaveDTO): Promise<SubCategoryDTO>;
    deleteSubCategory(subCategoryId: string): Promise<SubCategoryDropdownDTO>;
    updateSubCategory(subCategoryId: string, subCategoryData: SubCategorySaveDTO): Promise<SubCategoryDTO>;
    updateSubCategoryStatus(subCategoryId: string, statusData: SubCategoryStatusDTO): Promise<SubCategoryDTO>;
    updateSubCategortStatusByCategoryId(categoryId: string, subCategoryStatusData: SubCategoryStatusDTO): Promise<number>;
    getDropdownListSubCategory(categoryId: string): Promise<Array<SubCategoryDropdownDTO>>;
    getDropdownListSubCategoryEnabled(categoryId: string): Promise<Array<SubCategoryDropdownDTO>>;
}
