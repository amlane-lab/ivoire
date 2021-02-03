import * as mongoose from 'mongoose';
export declare const BusinessSchema: mongoose.Schema<any>;
export declare class BusinessSaveDTO {
    email: string;
    phoneNumber: number;
    address: string;
    storeName: string;
    officeLocation: string;
}
export declare class BusinessAdminDTO extends BusinessSaveDTO {
    _id: string;
}
export declare class BusinessDTO extends BusinessSaveDTO {
}
export declare class ResponseBusinessUser {
    response_code: string;
    response_data: BusinessAdminDTO;
}
export declare class ResponseBusinessDetail {
    response_code: string;
    response_data: BusinessDTO;
}
export declare class ResponseBusinessDetailAdmin {
    response_code: string;
    response_data: BusinessAdminDTO;
}
