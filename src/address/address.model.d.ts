import * as mongoose from 'mongoose';
export declare enum AddressType {
    HOME = "HOME",
    WORK = "WORK",
    OTHERS = "OTHERS"
}
export declare class LLLocationDTO {
    latitude: number;
    longitude: number;
}
export declare const AddressSchema: mongoose.Schema<any>;
export declare class AddressSaveDTO {
    addressType: string;
    flatNo: string;
    apartmentName: string;
    landmark: string;
    address: string;
    postalCode: string;
    location: LLLocationDTO;
    userId: string;
    mobileNumber: string;
}
export declare class AddressDTO extends AddressSaveDTO {
    _id: string;
}
export declare class ResponseAddress {
    response_code: string;
    response_data: AddressDTO;
}
export declare class ResponseAddressList {
    response_code: string;
    response_data: AddressDTO;
}
export declare class ResponseAddressDropdown {
    response_code: string;
    response_data: Object;
}
