import * as mongoose from 'mongoose';
export declare const LanguageSchema: mongoose.Schema<any>;
export declare class LanguageDTO {
    _id: string;
    languageCode: string;
    languageName: string;
    webJson: object;
    deliveyAppJson: object;
    mobAppJson: object;
    cmsJson: object;
    backendJson: object;
    isDefault: Boolean;
}
export declare class LanguageStatusUpdateDTO {
    status: number;
}
export declare class SetDefaultLanguageDTO {
    isDefault: number;
}
export declare class ResponseLanguageDTO {
    isDefault: number;
    _id: string;
    languageCode: string;
    languageName: string;
}
export declare class ResponseFavouritesDTO {
    response_code: string;
    response_data: ResponseLanguageDTO;
}
export declare class ResponseLanguageDetailsDTO {
    status: true;
    isDefault: number;
    _id: string;
    languageCode: string;
    languageName: string;
    webJson: {};
    mobAppJson: {};
    cmsJson: {};
    backendJson: {};
    deliveyAppJson: {};
}
export declare class ResponseLanguageDetails {
    response_code: string;
    response_data: ResponseLanguageDetailsDTO;
}
export declare class ResponseLanguageCMSDTO {
    en: {};
}
export declare class ResponseLanguageCMSDetailsDTO {
    response_code: string;
    response_data: ResponseLanguageCMSDTO;
}
