import { AdminQuery, UserQuery } from './app.model';
export declare class UtilService {
    constructor();
    validateUserRole(user: any): void;
    validateSuperAdminRole(user: any): void;
    validateAdminRole(user: any): void;
    validateDeliveryBoyRole(user: any): void;
    validateAllRole(user: any): void;
    validateAdminAndUserAllRole(user: any): void;
    successResponseData(responseData: any, extra?: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    successResponseMsg(key: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    badRequestResponseData(responseData?: any, extra?: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    resetContentResponseMsg(key?: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    processingResponseMsg(key?: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    paymentRequiredResponseMsg(key?: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    errorResponse(e: any): void;
    unauthorized(): void;
    badRequest(key?: any): void;
    pageNotFound(): void;
    notFoundResponseMsg(key?: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    notFoundResponse(responseData: any, key?: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    internalErrorResponseKey(key?: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    resetContentResponseKey(key: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    resetContentResponseData(responseData: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    getTranslatedMessage(key: any): any;
    getTranslatedMessageByKey(key: any): Promise<string>;
    private res;
    response(responseCode: any, responseData: any): Promise<{
        response_code: any;
        response_data: any;
    }>;
    setLanguage(lang: string): void;
    getLanguage(): string;
    setLanguageList(list: any): void;
    getLanguageData(code: any): any;
    getUUID(): Promise<string>;
    getArrayOfWeekdays(): Promise<any>;
    getXminutesAheadTime(minutes: number): Promise<number>;
    convertToDecimal(value: any): string;
    convertToNumber(input: string): number;
    calculateDistance(userLocation: any, storeLocation: any): number;
    timeSlotsDropdown(): Promise<any[]>;
    statusMessage(status: any, message: any): {
        status: any;
        data: any;
    };
    minutesConversion(m: number): string;
    deliveryTimeSlotsValidation(deliveryTimeSlots: any): {
        status: any;
        data: any;
    };
    getAdminPagination(query: AdminQuery): {
        page: number;
        limit: number;
        q: string;
    };
    getUserPagination(query: UserQuery): {
        page: number;
        limit: number;
    };
    categoryModeGraph: (data: any, category: any) => Promise<any>;
    salesGraph: (data: any, type: any) => {
        label: any[];
        total: any[];
    };
    userGraph: (data: any, type: any) => {
        label: any[];
        total: any[];
    };
}
