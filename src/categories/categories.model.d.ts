import * as mongoose from 'mongoose';
export declare const CategorySchema: mongoose.Schema<any>;
export declare class CategorySaveDTO {
    title: string;
    description: string;
    imageUrl: string;
    imageId: string;
    filePath: string;
    userId: string;
}
export declare class CategoryListDTO {
    _id: string;
    title: string;
    imageUrl: string;
    filePath: string;
}
export declare class CategoryAdminListDTO {
    _id: string;
    title: string;
    imageUrl: string;
    filePath: string;
    subCategoryCount: number;
    status: boolean;
    isDealAvailable: boolean;
    dealPercent: number;
}
export declare class CategoryAdminDetailDTO extends CategoryAdminListDTO {
    description: string;
}
export declare class CategoryStatusUpdateDTO {
    status: boolean;
}
export declare class DropDownDTO {
    _id: string;
    title: string;
    status: string;
}
export declare class ResponseUserCategoryList {
    response_code: string;
    response_data: CategorySaveDTO;
}
export declare class ResponseCategoryAdmin {
    response_code: string;
    response_data: CategoryAdminListDTO;
}
export declare class ResponseDropDown {
    response_code: string;
    response_data: DropDownDTO;
}
