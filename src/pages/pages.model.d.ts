import * as mongoose from 'mongoose';
export declare enum PageType {
    ABOUT_US = "ABOUT_US",
    TERMS_AND_CONDITIONS = "TERMS_AND_CONDITIONS",
    PRIVACY_POLICY = "PRIVACY_POLICY"
}
export declare const PageSchema: mongoose.Schema<any>;
export declare class PageSaveDTO {
    pageType: PageType;
    title?: string;
    description: string;
}
export declare class PageDTO {
    title: string;
    description: string;
}
export declare class ResponsePageDTO {
    response_code: string;
    response_data: PageDTO;
}
export declare class ResponseAdminDTO extends PageDTO {
    status: boolean;
}
export declare class ResponseAdminPageDTO {
    response_code: string;
    response_data: ResponseAdminDTO;
}
