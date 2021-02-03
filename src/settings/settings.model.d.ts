import * as mongoose from 'mongoose';
export declare enum PaymentMethod {
    COD = "COD",
    STRIPE = "STRIPE"
}
export declare enum DeliveryType {
    FIXED = "FIXED",
    FLEXIBLE = "FLEXIBLE"
}
export declare enum TaxType {
    INCLUDED = "INCLUDED",
    EXCLUDED = "EXCLUDED"
}
export declare const SettingSchema: mongoose.Schema<any>;
export declare class locationDTO {
    latitude: number;
    longitude: number;
}
export declare class UpdateCurrencyDTO {
    currencyCode: string;
    currencySymbol: string;
}
export declare class DeliveryTaxSaveDTO {
    deliveryCoverage: number;
    location: locationDTO;
    minOrderAmountForFree: number;
    minimumOrderAmountToPlaceOrder: number;
    taxName: string;
    deliveryType: string;
    taxType: string;
    taxAmount: number;
    fixedDeliveryCharges: number;
    deliveryChargePerKm: number;
    paymentMethod: Array<string>;
}
export declare class SettingDTO {
    _id: string;
    pincode: Array<string>;
    startDeliveryFrom: number;
    workingHours: Array<WorkingHoursDTO>;
    currencyCode: string;
    languageCode: string;
    currencySymbol: string;
    currency: Array<object>;
    currencyList: Array<object>;
    languageList: Array<object>;
}
export declare class TimeScheduleDTO {
    _id: string;
    slot: string;
    openTimeConverted: number;
    closeTimeConverted: number;
    deliveryCount: number;
    isOpen: boolean;
}
export declare class WorkingHoursDTO {
    _id: string;
    day: string;
    dayCode: number;
    isOpen: boolean;
    timeSchedule: Array<TimeScheduleDTO>;
}
export declare class SettingWorkingHoursDTO {
    _id?: string;
    startDeliveryFrom: number;
    workingHours: Array<WorkingHoursDTO>;
}
export declare class SettingCurrencyAndLanguageDTO {
    _id?: string;
    currencyCode: string;
    languageCode: string;
    currencySymbol: string;
}
export declare class SettingCurrencyAndLanguageListDTO {
    _id?: string;
    currencyList: Array<object>;
    languageList: Array<object>;
}
export declare class SettingCurrencyAndLanguageCodeDTO {
    _id?: string;
    languageCode: string;
    currencySymbol: string;
}
export declare class ResponseSettingDTO extends SettingCurrencyAndLanguageCodeDTO {
    location: locationDTO;
    paymentMethod: [];
    minimumOrderAmountToPlaceOrder: number;
}
export declare class ResponseSettingDetails {
    response_code: string;
    response_data: ResponseSettingDTO;
}
export declare class TimeSlotDTO {
    _id: string;
    slot: string;
    isOpen: boolean;
}
export declare class ResponseTimeSlot {
    timing: TimeSlotDTO;
}
export declare class ResponseTimeSlotDTO {
    response_code: string;
    response_data: ResponseTimeSlot;
}
export declare class ResponseDateAndTime {
    _id: string;
    timeShedule: TimeScheduleDTO;
    dayCode: string;
    isOpen: boolean;
    date: string;
}
export declare class ResponseSettigsAdminDTO extends DeliveryTaxSaveDTO {
    currencyCode: string;
    languageCode: string;
    currencySymbol: string;
    currency: Array<object>;
    currencyList: Array<object>;
    languageList: Array<object>;
    workingHours: ResponseDateAndTime;
}
export declare class ResponseTimeSlotDetails {
    response_code: string;
    response_data: ResponseSettigsAdminDTO;
}
export declare class ResponseDeliverySlotDTO {
    deliverySlot: ResponseDateAndTime;
}
export declare class ResponseTimeDTO {
    response_code: string;
    response_data: ResponseDeliverySlotDTO;
}
export declare class ResponseCurrencyDetailsDTO extends UpdateCurrencyDTO {
    _id: string;
}
export declare class ResponseCurrencyDetailsAdmin {
    response_code: string;
    response_data: ResponseCurrencyDetailsDTO;
}
export declare class ResponseCurrencyListDTO {
    response_code: string;
    response_data: Object;
}
export declare class TimeSlotDropDownDTO {
    time: string;
    minutes: number;
}
export declare class ResponseTimeSlotDropDown {
    response_code: string;
    response_data: TimeSlotDropDownDTO;
}
