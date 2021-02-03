import * as mongoose from 'mongoose';
export declare const SubCategorySchema: mongoose.Schema<any>;
export declare class SubCategorySaveDTO {
    title: string;
    description: string;
    categoryId: string;
    categoryName?: string;
}
export declare class SubCategoryUserDTO extends SubCategorySaveDTO {
    _id: string;
    categoryName?: string;
}
export declare class SubCategoryDTO extends SubCategoryUserDTO {
    _id: string;
    categoryName?: string;
    status: boolean;
}
export declare class SubCategoryStatusDTO {
    status: boolean;
}
export declare class SubCategoryDropdownDTO {
    _id: string;
    title: string;
    status: string;
    categoryId: string;
}
export declare class ResponseSubCategoryUserListDTO {
    response_code: string;
    response_data: SubCategoryUserDTO;
}
export declare class ResponseSubCategoryListDTO {
    response_code: string;
    response_data: SubCategoryDTO;
}
export declare class ResponseSubCategoryDTO {
    response_code: string;
    response_data: SubCategoryDTO;
}
export declare class ResponseSubCategoryDetailDTO {
    response_code: string;
    response_data: SubCategoryDTO;
}
export declare class ResponseSubCategoryDrpodownDTO {
    response_code: string;
    response_data: SubCategoryDropdownDTO;
}
