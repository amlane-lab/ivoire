"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["COD"] = "COD";
    PaymentMethod["STRIPE"] = "STRIPE";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
var DeliveryType;
(function (DeliveryType) {
    DeliveryType["FIXED"] = "FIXED";
    DeliveryType["FLEXIBLE"] = "FLEXIBLE";
})(DeliveryType = exports.DeliveryType || (exports.DeliveryType = {}));
var TaxType;
(function (TaxType) {
    TaxType["INCLUDED"] = "INCLUDED";
    TaxType["EXCLUDED"] = "EXCLUDED";
})(TaxType = exports.TaxType || (exports.TaxType = {}));
exports.SettingSchema = new mongoose.Schema({
    startDeliveryFrom: { type: Number, default: 0 },
    deliveryTimeSlots: [{
            dayCode: Number,
            isOpen: Boolean,
            timings: [
                {
                    slot: String,
                    openTime: Number,
                    closeTime: Number,
                    deliveryCount: Number,
                    isOpen: Boolean
                }
            ]
        }],
    currencySymbol: { type: String, default: "$" },
    currencyCode: { type: String, default: "USD" },
    paymentMethod: { type: PaymentMethod },
    deliveryType: { type: DeliveryType },
    fixedDeliveryCharges: { type: Number, default: 0 },
    deliveryChargePerKm: { type: Number },
    deliveryCoverage: { type: Number },
    minOrderAmountForFree: { type: Number },
    minimumOrderAmountToPlaceOrder: { type: Number },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    taxType: { type: TaxType },
    taxName: { type: String },
    taxAmount: { type: Number },
    maxWalletAmountUsed: { type: Number, default: 0 },
});
class locationDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], locationDTO.prototype, "latitude", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], locationDTO.prototype, "longitude", void 0);
exports.locationDTO = locationDTO;
class UpdateCurrencyDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateCurrencyDTO.prototype, "currencyCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateCurrencyDTO.prototype, "currencySymbol", void 0);
exports.UpdateCurrencyDTO = UpdateCurrencyDTO;
class DeliveryTaxSaveDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], DeliveryTaxSaveDTO.prototype, "deliveryCoverage", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", locationDTO)
], DeliveryTaxSaveDTO.prototype, "location", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], DeliveryTaxSaveDTO.prototype, "minOrderAmountForFree", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], DeliveryTaxSaveDTO.prototype, "minimumOrderAmountToPlaceOrder", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], DeliveryTaxSaveDTO.prototype, "taxName", void 0);
__decorate([
    swagger_1.ApiModelProperty({ enum: Object.keys(DeliveryType) }),
    class_validator_1.IsEnum(DeliveryType, { message: 'Delivery type must be one of these ' + Object.keys(DeliveryType) }),
    __metadata("design:type", String)
], DeliveryTaxSaveDTO.prototype, "deliveryType", void 0);
__decorate([
    swagger_1.ApiModelProperty({ enum: Object.keys(TaxType) }),
    class_validator_1.IsEnum(TaxType, { message: 'Tax type must be one of these ' + Object.keys(TaxType) }),
    __metadata("design:type", String)
], DeliveryTaxSaveDTO.prototype, "taxType", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.Max(100),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], DeliveryTaxSaveDTO.prototype, "taxAmount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], DeliveryTaxSaveDTO.prototype, "fixedDeliveryCharges", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], DeliveryTaxSaveDTO.prototype, "deliveryChargePerKm", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], DeliveryTaxSaveDTO.prototype, "paymentMethod", void 0);
exports.DeliveryTaxSaveDTO = DeliveryTaxSaveDTO;
class SettingDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SettingDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], SettingDTO.prototype, "pincode", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SettingDTO.prototype, "startDeliveryFrom", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], SettingDTO.prototype, "workingHours", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SettingDTO.prototype, "currencyCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SettingDTO.prototype, "languageCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SettingDTO.prototype, "currencySymbol", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], SettingDTO.prototype, "currency", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], SettingDTO.prototype, "currencyList", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], SettingDTO.prototype, "languageList", void 0);
exports.SettingDTO = SettingDTO;
class TimeScheduleDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TimeScheduleDTO.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TimeScheduleDTO.prototype, "slot", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TimeScheduleDTO.prototype, "openTimeConverted", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TimeScheduleDTO.prototype, "closeTimeConverted", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TimeScheduleDTO.prototype, "deliveryCount", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], TimeScheduleDTO.prototype, "isOpen", void 0);
exports.TimeScheduleDTO = TimeScheduleDTO;
class WorkingHoursDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], WorkingHoursDTO.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], WorkingHoursDTO.prototype, "day", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], WorkingHoursDTO.prototype, "dayCode", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], WorkingHoursDTO.prototype, "isOpen", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], WorkingHoursDTO.prototype, "timeSchedule", void 0);
exports.WorkingHoursDTO = WorkingHoursDTO;
class SettingWorkingHoursDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], SettingWorkingHoursDTO.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SettingWorkingHoursDTO.prototype, "startDeliveryFrom", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], SettingWorkingHoursDTO.prototype, "workingHours", void 0);
exports.SettingWorkingHoursDTO = SettingWorkingHoursDTO;
class SettingCurrencyAndLanguageDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], SettingCurrencyAndLanguageDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SettingCurrencyAndLanguageDTO.prototype, "currencyCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SettingCurrencyAndLanguageDTO.prototype, "languageCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SettingCurrencyAndLanguageDTO.prototype, "currencySymbol", void 0);
exports.SettingCurrencyAndLanguageDTO = SettingCurrencyAndLanguageDTO;
class SettingCurrencyAndLanguageListDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], SettingCurrencyAndLanguageListDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], SettingCurrencyAndLanguageListDTO.prototype, "currencyList", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], SettingCurrencyAndLanguageListDTO.prototype, "languageList", void 0);
exports.SettingCurrencyAndLanguageListDTO = SettingCurrencyAndLanguageListDTO;
class SettingCurrencyAndLanguageCodeDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SettingCurrencyAndLanguageCodeDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SettingCurrencyAndLanguageCodeDTO.prototype, "languageCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SettingCurrencyAndLanguageCodeDTO.prototype, "currencySymbol", void 0);
exports.SettingCurrencyAndLanguageCodeDTO = SettingCurrencyAndLanguageCodeDTO;
class ResponseSettingDTO extends SettingCurrencyAndLanguageCodeDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", locationDTO)
], ResponseSettingDTO.prototype, "location", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ResponseSettingDTO.prototype, "paymentMethod", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseSettingDTO.prototype, "minimumOrderAmountToPlaceOrder", void 0);
exports.ResponseSettingDTO = ResponseSettingDTO;
class ResponseSettingDetails {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSettingDetails.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseSettingDTO)
], ResponseSettingDetails.prototype, "response_data", void 0);
exports.ResponseSettingDetails = ResponseSettingDetails;
class TimeSlotDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TimeSlotDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TimeSlotDTO.prototype, "slot", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], TimeSlotDTO.prototype, "isOpen", void 0);
exports.TimeSlotDTO = TimeSlotDTO;
class ResponseTimeSlot {
}
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", TimeSlotDTO)
], ResponseTimeSlot.prototype, "timing", void 0);
exports.ResponseTimeSlot = ResponseTimeSlot;
class ResponseTimeSlotDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseTimeSlotDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResponseTimeSlot)
], ResponseTimeSlotDTO.prototype, "response_data", void 0);
exports.ResponseTimeSlotDTO = ResponseTimeSlotDTO;
class ResponseDateAndTime {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDateAndTime.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", TimeScheduleDTO)
], ResponseDateAndTime.prototype, "timeShedule", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDateAndTime.prototype, "dayCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ResponseDateAndTime.prototype, "isOpen", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDateAndTime.prototype, "date", void 0);
exports.ResponseDateAndTime = ResponseDateAndTime;
class ResponseSettigsAdminDTO extends DeliveryTaxSaveDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSettigsAdminDTO.prototype, "currencyCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSettigsAdminDTO.prototype, "languageCode", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSettigsAdminDTO.prototype, "currencySymbol", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ResponseSettigsAdminDTO.prototype, "currency", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ResponseSettigsAdminDTO.prototype, "currencyList", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ResponseSettigsAdminDTO.prototype, "languageList", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResponseDateAndTime)
], ResponseSettigsAdminDTO.prototype, "workingHours", void 0);
exports.ResponseSettigsAdminDTO = ResponseSettigsAdminDTO;
class ResponseTimeSlotDetails {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseTimeSlotDetails.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseSettigsAdminDTO)
], ResponseTimeSlotDetails.prototype, "response_data", void 0);
exports.ResponseTimeSlotDetails = ResponseTimeSlotDetails;
class ResponseDeliverySlotDTO {
}
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResponseDateAndTime)
], ResponseDeliverySlotDTO.prototype, "deliverySlot", void 0);
exports.ResponseDeliverySlotDTO = ResponseDeliverySlotDTO;
class ResponseTimeDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseTimeDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseDeliverySlotDTO)
], ResponseTimeDTO.prototype, "response_data", void 0);
exports.ResponseTimeDTO = ResponseTimeDTO;
class ResponseCurrencyDetailsDTO extends UpdateCurrencyDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseCurrencyDetailsDTO.prototype, "_id", void 0);
exports.ResponseCurrencyDetailsDTO = ResponseCurrencyDetailsDTO;
class ResponseCurrencyDetailsAdmin {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseCurrencyDetailsAdmin.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseCurrencyDetailsDTO)
], ResponseCurrencyDetailsAdmin.prototype, "response_data", void 0);
exports.ResponseCurrencyDetailsAdmin = ResponseCurrencyDetailsAdmin;
class ResponseCurrencyListDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseCurrencyListDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], ResponseCurrencyListDTO.prototype, "response_data", void 0);
exports.ResponseCurrencyListDTO = ResponseCurrencyListDTO;
class TimeSlotDropDownDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TimeSlotDropDownDTO.prototype, "time", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TimeSlotDropDownDTO.prototype, "minutes", void 0);
exports.TimeSlotDropDownDTO = TimeSlotDropDownDTO;
class ResponseTimeSlotDropDown {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseTimeSlotDropDown.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", TimeSlotDropDownDTO)
], ResponseTimeSlotDropDown.prototype, "response_data", void 0);
exports.ResponseTimeSlotDropDown = ResponseTimeSlotDropDown;
//# sourceMappingURL=settings.model.js.map