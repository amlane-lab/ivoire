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
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var AdminSettings;
(function (AdminSettings) {
    AdminSettings[AdminSettings["DEFAULT_PAGE_NUMBER"] = 1] = "DEFAULT_PAGE_NUMBER";
    AdminSettings[AdminSettings["DEFAULT_PAGE_LIMIT"] = 10] = "DEFAULT_PAGE_LIMIT";
})(AdminSettings = exports.AdminSettings || (exports.AdminSettings = {}));
var UserSettings;
(function (UserSettings) {
    UserSettings[UserSettings["DEFAULT_PAGE_NUMBER"] = 0] = "DEFAULT_PAGE_NUMBER";
    UserSettings[UserSettings["DEFAULT_PAGE_LIMIT"] = 10] = "DEFAULT_PAGE_LIMIT";
})(UserSettings = exports.UserSettings || (exports.UserSettings = {}));
class AdminQuery {
}
exports.AdminQuery = AdminQuery;
class UserQuery {
}
exports.UserQuery = UserQuery;
class ResponseSuccessMessage {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSuccessMessage.prototype, "response_code", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSuccessMessage.prototype, "response_data", void 0);
exports.ResponseSuccessMessage = ResponseSuccessMessage;
class ResponseBadRequestMessage {
}
__decorate([
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseBadRequestMessage.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ResponseBadRequestMessage.prototype, "errors", void 0);
exports.ResponseBadRequestMessage = ResponseBadRequestMessage;
class ResponseErrorMessage {
}
__decorate([
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseErrorMessage.prototype, "status", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseErrorMessage.prototype, "message", void 0);
exports.ResponseErrorMessage = ResponseErrorMessage;
class UploadImageDTO {
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], UploadImageDTO.prototype, "type", void 0);
exports.UploadImageDTO = UploadImageDTO;
class UploadImageResponseDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UploadImageResponseDTO.prototype, "url", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UploadImageResponseDTO.prototype, "key", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UploadImageResponseDTO.prototype, "filePath", void 0);
exports.UploadImageResponseDTO = UploadImageResponseDTO;
class UploadImagesResponseDTO {
}
__decorate([
    class_validator_1.IsArray(),
    swagger_1.ApiModelProperty({ type: [UploadImageResponseDTO] }),
    __metadata("design:type", Array)
], UploadImagesResponseDTO.prototype, "productImages", void 0);
exports.UploadImagesResponseDTO = UploadImagesResponseDTO;
class TwilioResponseDTO {
}
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], TwilioResponseDTO.prototype, "isError", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TwilioResponseDTO.prototype, "data", void 0);
exports.TwilioResponseDTO = TwilioResponseDTO;
class UpdateOneManyDTO {
}
exports.UpdateOneManyDTO = UpdateOneManyDTO;
var LanguageJsonType;
(function (LanguageJsonType) {
    LanguageJsonType["BACKEND"] = "backendJson";
    LanguageJsonType["CMS"] = "cmsJson";
    LanguageJsonType["WEB"] = "webJson";
    LanguageJsonType["USER"] = "mobAppJson";
    LanguageJsonType["DELIVERY"] = "deliveyAppJson";
})(LanguageJsonType = exports.LanguageJsonType || (exports.LanguageJsonType = {}));
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["USER"] = "USER";
    UserRoles["DELIVERY_BOY"] = "DELIVERY_BOY";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
var FileDownloadStatus;
(function (FileDownloadStatus) {
    FileDownloadStatus["Processing"] = "Processing";
    FileDownloadStatus["Completed"] = "Completed";
    FileDownloadStatus["Pending"] = "Pending";
})(FileDownloadStatus = exports.FileDownloadStatus || (exports.FileDownloadStatus = {}));
var CouponType;
(function (CouponType) {
    CouponType["PERCENTAGE"] = "PERCENTAGE";
})(CouponType = exports.CouponType || (exports.CouponType = {}));
var TaxName;
(function (TaxName) {
    TaxName["GST"] = "GST";
})(TaxName = exports.TaxName || (exports.TaxName = {}));
var ResponseMessage;
(function (ResponseMessage) {
    ResponseMessage["ADDRESS_SAVED"] = "ADDRESS_SAVED";
    ResponseMessage["ADDRESS_UPDATED"] = "ADDRESS_UPDATED";
    ResponseMessage["ADDRESS_DELETED"] = "ADDRESS_DELETED";
    ResponseMessage["ADDRESS_NOT_FOUND"] = "ADDRESS_NOT_FOUND";
    ResponseMessage["ADDDRESS_DELIVERY_LOCATION_NOT_AVAILABLE"] = "ADDDRESS_DELIVERY_LOCATION_NOT_AVAILABLE";
    ResponseMessage["BANNER_SAVED"] = "BANNER_SAVED";
    ResponseMessage["BANNER_UPDATED"] = "BANNER_UPDATED";
    ResponseMessage["BANNER_DELETED"] = "BANNER_DELETED";
    ResponseMessage["BANNER_NOT_FOUND"] = "BANNER_NOT_FOUND";
    ResponseMessage["BANNER_CATEGORY_ID_MISSING"] = "BANNER_CATEGORY_ID_MISSING";
    ResponseMessage["BANNER_PRODUCT_ID_MISSING"] = "BANNER_PRODUCT_ID_MISSING";
    ResponseMessage["BUSINESS_UPDATED"] = "BUSINESS_UPDATED";
    ResponseMessage["CATEGORY_SAVED"] = "CATEGORY_SAVED";
    ResponseMessage["CATEGORY_UPDATED"] = "CATEGORY_UPDATED";
    ResponseMessage["CATEGORY_DELETED"] = "CATEGORY_DELETED";
    ResponseMessage["CATEGORY_STATUS_UPDATED"] = "CATEGORY_STATUS_UPDATED";
    ResponseMessage["CATEGORY_ALREADY_EXIST"] = "CATEGORY_ALREADY_EXIST";
    ResponseMessage["CATEGORY_NOT_FOUND"] = "CATEGORY_NOT_FOUND";
    ResponseMessage["CATEGORY_NOT_DELETED_HAVE_SUBCATEGORY"] = "CATEGORY_NOT_DELETED_HAVE_SUBCATEGORY";
    ResponseMessage["CATEGORY_NOT_DELETED_HAVE_PRODUCT"] = "CATEGORY_NOT_DELETED_HAVE_PRODUCT";
    ResponseMessage["CATEGORY_NOT_DELETED_HAVE_BANNER"] = "CATEGORY_NOT_DELETED_HAVE_BANNER";
    ResponseMessage["CATEGORY_NOT_DELETED_HAVE_DEAL"] = "CATEGORY_NOT_DELETED_HAVE_DEAL";
    ResponseMessage["CART_ADDED_PRODUCT"] = "CART_ADDED_PRODUCT";
    ResponseMessage["CART_UPDATED_PRODUCT"] = "CART_UPDATED_PRODUCT";
    ResponseMessage["CART_ITEM_NOT_FOUND"] = "CART_ITEM_NOT_FOUND";
    ResponseMessage["CART_DELETED"] = "CART_DELETED";
    ResponseMessage["CART_VERIFIED"] = "CART_VERIFIED";
    ResponseMessage["CART_NOT_FOUND"] = "CART_NOT_FOUND";
    ResponseMessage["CART_ITEM_OUT_OF_STOCK"] = "CART_ITEM_OUT_OF_STOCK";
    ResponseMessage["CART_ITEM_LEFT"] = "CART_ITEM_LEFT";
    ResponseMessage["COUPON_SAVED"] = "COUPON_SAVED";
    ResponseMessage["COUPON_UPDATED"] = "COUPON_UPDATED";
    ResponseMessage["COUPON_DELETED"] = "COUPON_DELETED";
    ResponseMessage["COUPON_STATUS_UPDATED"] = "COUPON_STATUS_UPDATED";
    ResponseMessage["COUPON_ALREADY_EXIST"] = "COUPON_ALREADY_EXIST";
    ResponseMessage["COUPON_EXPIRED"] = "COUPON_EXPIRED";
    ResponseMessage["COUPON_NOT_FOUND"] = "COUPON_NOT_FOUND";
    ResponseMessage["CURRENCY_INVALID"] = "CURRENCY_INVALID";
    ResponseMessage["DAYS_SUNDAY"] = "DAYS_SUNDAY";
    ResponseMessage["DAYS_MONDAY"] = "DAYS_MONDAY";
    ResponseMessage["DAYS_TUESDAY"] = "DAYS_TUESDAY";
    ResponseMessage["DAYS_WEDNESDAY"] = "DAYS_WEDNESDAY";
    ResponseMessage["DAYS_THURSDAY"] = "DAYS_THURSDAY";
    ResponseMessage["DAYS_FRIDAY"] = "DAYS_FRIDAY";
    ResponseMessage["DAYS_SATURDAY"] = "DAYS_SATURDAY";
    ResponseMessage["DEAL_SAVED"] = "DEAL_SAVED";
    ResponseMessage["DEAL_UPDATED"] = "DEAL_UPDATED";
    ResponseMessage["DEAL_STATUS_UPDATED"] = "DEAL_STATUS_UPDATED";
    ResponseMessage["DEAL_DELETED"] = "DEAL_DELETED";
    ResponseMessage["DEAL_ALREADY_EXIST"] = "DEAL_ALREADY_EXIST";
    ResponseMessage["DEAL_NOT_FOUND"] = "DEAL_NOT_FOUND";
    ResponseMessage["DEAL_CATEGORY_ID_MISSING"] = "DEAL_CATEGORY_ID_MISSING";
    ResponseMessage["DEAL_PRODUCT_ID_MISSING"] = "DEAL_CATEGORY_ID_MISSING";
    ResponseMessage["DELIVERY_BOY_NOT_FOUND"] = "DELIVERY_BOY_NOT_FOUND";
    ResponseMessage["DELIVERY_BOY_ALREADY_ACCEPTED_ORDER"] = "DELIVERY_BOY_ALREADY_ACCEPTED_ORDER";
    ResponseMessage["DELIVERY_BOY_ALREADY_RATED_BY_USER"] = "DELIVERY_BOY_ALREADY_RATED_BY_USER";
    ResponseMessage["DELIVERY_BOY_NOTIFY_ORDER_ASSIGNED_TITLE"] = "DELIVERY_BOY_NOTIFY_ORDER_ASSIGNED_TITLE";
    ResponseMessage["DELIVERY_BOY_NOTIFY_ORDER_ASSIGNED_DESC"] = "DELIVERY_BOY_NOTIFY_ORDER_ASSIGNED_DESC";
    ResponseMessage["DELIVERY_BOY_STATUS_UPDATED"] = "DELIVERY_BOY_STATUS_UPDATED";
    ResponseMessage["DELIEVRY_SLOT_NOT_SELECTED"] = "DELIEVRY_SLOT_NOT_SELECTED";
    ResponseMessage["DELIEVRY_SLOT_NOT_AVAILABLE"] = "DELIEVRY_SLOT_NOT_AVAILABLE";
    ResponseMessage["FAVOURITE_SAVED"] = "FAVOURITE_SAVED";
    ResponseMessage["FAVOURITE_DELETED"] = "FAVOURITE_DELETED";
    ResponseMessage["FAVOURITE_ALREADY_ADDED_PRODUCT"] = "FAVOURITE_ALREADY_ADDED_PRODUCT";
    ResponseMessage["FILE_IMPORT_START"] = "FILE_IMPORT_START";
    ResponseMessage["FILE_TYPE_ERROR"] = "FILE_TYPE_ERROR";
    ResponseMessage["IMAGE_URL_MUST"] = "IMAGE_URL_MUST";
    ResponseMessage["LANGUAGE_ALREADY_EXIST"] = "LANGUAGE_ALREADY_EXIST";
    ResponseMessage["LANGUAGE_VALIDATED"] = "LANGUAGE_VALIDATED";
    ResponseMessage["LANGUAGE_SAVED"] = "LANGUAGE_SAVED";
    ResponseMessage["LANGUAGE_UPDATED"] = "LANGUAGE_UPDATED";
    ResponseMessage["LANGUAGE_DELETED"] = "LANGUAGE_DELETED";
    ResponseMessage["LANGUAGE_NOT_FOUND"] = "LANGUAGE_NOT_FOUND";
    ResponseMessage["LANGUAGE_DEFAULT_UPDATED"] = "LANGUAGE_DEFAULT_UPDATED";
    ResponseMessage["LANGUAGE_STATUS_UPDATED"] = "LANGUAGE_STATUS_UPDATED";
    ResponseMessage["MOBILE_NUMBER_UPDATED_SUCCESSFULLY"] = "MOBILE_NUMBER_UPDATED_SUCCESSFULLY";
    ResponseMessage["MOBILE_NUMBER_SUCCESSFULLY_VERIFIED"] = "MOBILE_NUMBER_SUCCESSFULLY_VERIFIED";
    ResponseMessage["MOBILE_NUMBER_NOT_VERIFIED"] = "MOBILE_NUMBER_NOT_VERIFIED";
    ResponseMessage["ORDER_PLACED"] = "ORDER_PLACED";
    ResponseMessage["ORDER_MINIMUM_AMOUNT_PLACE_ORDER"] = "ORDER_MINIMUM_AMOUNT_PLACE_ORDER";
    ResponseMessage["ORDER_PAYMENT_ERROR"] = "ORDER_PAYMENT_ERROR";
    ResponseMessage["ORDER_NOT_DELIVERED"] = "ORDER_NOT_DELIVERED";
    ResponseMessage["ORDER_NOT_FOUND"] = "ORDER_NOT_FOUND";
    ResponseMessage["ORDER_STATUS_INVALID"] = "ORDER_STATUS_INVALID";
    ResponseMessage["ORDER_ALREADY_DELIVERED"] = "ORDER_ALREADY_DELIVERED";
    ResponseMessage["ORDER_CANCELLED"] = "ORDER_CANCELLED";
    ResponseMessage["ORDER_UPDATED"] = "ORDER_UPDATED";
    ResponseMessage["ORDER_ALREADY_ASSIGNED"] = "ORDER_ALREADY_ASSIGNED";
    ResponseMessage["ORDER_ASSIGNED_TO_DELIVERY_BOY"] = "ORDER_ASSIGNED_TO_DELIVERY_BOY";
    ResponseMessage["ORDER_ACCEPTED_BY_DELIVERY_BOY"] = "ORDER_ACCEPTED_BY_DELIVERY_BOY";
    ResponseMessage["ORDER_REJECTED_BY_DELIVERY_BOY"] = "ORDER_REJECTED_BY_DELIVERY_BOY";
    ResponseMessage["OTP_SENT_TO_NEW_MOBILE_NUMBER"] = "OTP_SENT_TO_NEW_MOBILE_NUMBER";
    ResponseMessage["OTP_SENT_TO_REGISTERED_MOBILE_NUMBER"] = "OTP_SENT_TO_REGISTERED_MOBILE_NUMBER";
    ResponseMessage["ORDER_STATUS_UPDATED"] = "ORDER_STATUS_UPDATED";
    ResponseMessage["PAGE_UPADTED"] = "PAGE_UPADTED";
    ResponseMessage["PAYMENT_ID_NOT_FOUND"] = "PAYMENT_ID_NOT_FOUND";
    ResponseMessage["PRODUCT_DISABLED_NOT_AVAILABLE_FOR_DELIVERY"] = "PRODUCT_DISABLED_NOT_AVAILABLE_FOR_DELIVERY";
    ResponseMessage["PRODUCT_ALREADY_EXIST"] = "PRODUCT_ALREADY_EXIST";
    ResponseMessage["PRODUCT_SAVED"] = "PRODUCT_SAVED";
    ResponseMessage["PRODUCT_UPDATED"] = "PRODUCT_UPDATED";
    ResponseMessage["PRODUCT_STATUS_UPDATED"] = "PRODUCT_STATUS_UPDATED";
    ResponseMessage["PRODUCT_NOT_FOUND"] = "PRODUCT_NOT_FOUND";
    ResponseMessage["PRODUCT_NOT_DELETED_HAVE_BANNER"] = "PRODUCT_NOT_DELETED_HAVE_BANNER";
    ResponseMessage["PRODUCT_NOT_DELETED_HAVE_DEAL"] = "PRODUCT_NOT_DELETED_HAVE_DEAL";
    ResponseMessage["PRODUCT_DELETED"] = "PRODUCT_DELETED";
    ResponseMessage["PRODUCT_IMPORTED_SUCCESSFULLY"] = "PRODUCT_IMPORTED_SUCCESSFULLY";
    ResponseMessage["PRODUCT_NOT_BOUGHT"] = "PRODUCT_NOT_BOUGHT";
    ResponseMessage["PUSH_NOTIFICATION_SENT"] = "PUSH_NOTIFICATION_SENT";
    ResponseMessage["PUSH_NOTIFICATION_NOT_SENT"] = "PUSH_NOTIFICATION_NOT_SENT";
    ResponseMessage["RATING_SAVED"] = "RATING_SAVED";
    ResponseMessage["RATING_ALREADY_GIVEN"] = "RATING_ALREADY_GIVEN";
    ResponseMessage["REQUIRED_VALID_MOBILE_NUMBER"] = "REQUIRED_VALID_MOBILE_NUMBER";
    ResponseMessage["SETTING_CURRENCY_UPDATED"] = "SETTING_CURRENCY_UPDATED";
    ResponseMessage["SETTING_DELIVERY_TAX_UPDATED"] = "SETTING_DELIVERY_TAX_UPDATED";
    ResponseMessage["SETTING_DELIVERY_TIME_SLOTS_UPDATED"] = "SETTING_DELIVERY_TIME_SLOTS_UPDATED";
    ResponseMessage["SOMETHING_WENT_WRONG"] = "SOMETHING_WENT_WRONG";
    ResponseMessage["SUB_CATEGORY_SAVED"] = "SUB_CATEGORY_SAVED";
    ResponseMessage["SUB_CATEGORY_UPDATED"] = "SUB_CATEGORY_UPDATED";
    ResponseMessage["SUB_CATEGORY_STATUS_UPDATED"] = "SUB_CATEGORY_STATUS_UPDATED";
    ResponseMessage["SUB_CATEGORY_NOT_FOUND"] = "SUB_CATEGORY_NOT_FOUND";
    ResponseMessage["SUB_CATEGORY_DELETED"] = "SUB_CATEGORY_DELETED";
    ResponseMessage["SUB_CATEGORY_ALREADY_EXIST"] = "SUB_CATEGORY_ALREADY_EXIST";
    ResponseMessage["SUB_CATEGORY_NOT_DELETED_HAVE_PRODUCT"] = "SUB_CATEGORY_NOT_DELETED_HAVE_PRODUCT";
    ResponseMessage["TRANSACTION_FAIL"] = "TRANSACTION_FAIL";
    ResponseMessage["TRANSACTION_PROCESSING"] = "TRANSACTION_PROCESSING";
    ResponseMessage["TRANSACTION_SUCCESS"] = "TRANSACTION_SUCCESS";
    ResponseMessage["UNABLE_TO_SEND_OTP"] = "UNABLE_TO_SEND_OTP";
    ResponseMessage["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    ResponseMessage["USER_NOTIFY_ORDER_PLACED_TITLE"] = "USER_NOTIFY_ORDER_PLACED_TITLE";
    ResponseMessage["USER_NOTIFY_ORDER_PLACED_DESC"] = "USER_NOTIFY_ORDER_PLACED_DESC";
    ResponseMessage["USER_NOTIFY_ORDER_CONFIRMED_TITLE"] = "USER_NOTIFY_ORDER_CONFIRMED_TITLE";
    ResponseMessage["USER_NOTIFY_ORDER_CONFIRMED_DESC"] = "USER_NOTIFY_ORDER_CONFIRMED_DESC";
    ResponseMessage["USER_NOTIFY_ORDER_OUT_OF_DELIVERY_TITLE"] = "USER_NOTIFY_ORDER_OUT_OF_DELIVERY_TITLE";
    ResponseMessage["USER_NOTIFY_ORDER_OUT_OF_DELIVERY_DESC"] = "USER_NOTIFY_ORDER_OUT_OF_DELIVERY_DESC";
    ResponseMessage["USER_NOTIFY_ORDER_DELIVERED_TITLE"] = "USER_NOTIFY_ORDER_DELIVERED_TITLE";
    ResponseMessage["USER_NOTIFY_ORDER_DELIVERED_DESC"] = "USER_NOTIFY_ORDER_DELIVERED_DESC";
    ResponseMessage["USER_NOTIFY_ORDER_CANCELLED_TITLE"] = "USER_NOTIFY_ORDER_CANCELLED_TITLE";
    ResponseMessage["USER_NOTIFY_ORDER_CANCELLED_DESC"] = "USER_NOTIFY_ORDER_CANCELLED_DESC";
    ResponseMessage["USER_NOTIFY_ORDER_MODIFIED_TITLE"] = "USER_NOTIFY_ORDER_MODIFIED_TITLE";
    ResponseMessage["USER_NOTIFY_ORDER_MODIFIED_DESC"] = "USER_NOTIFY_ORDER_MODIFIED_DESC";
    ResponseMessage["USER_EMAIL_VERIFY_SENT"] = "USER_EMAIL_VERIFY_SENT";
    ResponseMessage["USER_EMAIL_VERIFY_NOT_SENT"] = "USER_EMAIL_VERIFY_NOT_SENT";
    ResponseMessage["USER_EMAIL_NOT_FOUND"] = "USER_EMAIL_NOT_FOUND";
    ResponseMessage["USER_ACCOUNT_BLOCKED"] = "USER_ACCOUNT_BLOCKED";
    ResponseMessage["USER_EMAIL_NOT_VERIFIED"] = "USER_EMAIL_NOT_VERIFIED";
    ResponseMessage["USER_EMAIL_OR_PASSWORD_INVALID"] = "USER_EMAIL_OR_PASSWORD_INVALID";
    ResponseMessage["USER_EMAIL_INVALID"] = "USER_EMAIL_INVALID";
    ResponseMessage["USER_EMAIL_VERIFY_SUBJECT"] = "USER_EMAIL_VERIFY_SUBJECT";
    ResponseMessage["USER_EMAIL_VERIFY_BODY"] = "USER_EMAIL_VERIFY_BODY";
    ResponseMessage["USER_EMAIL_VERIFY_BUTTON"] = "USER_EMAIL_VERIFY_BUTTON";
    ResponseMessage["USER_FORGOT_PASSWORD_OTP_SENT_EMAIL"] = "USER_FORGOT_PASSWORD_OTP_SENT_EMAIL";
    ResponseMessage["USER_FORGOT_PASSWORD_OTP_NOT_SENT_EMAIL"] = "USER_FORGOT_PASSWORD_OTP_NOT_SENT_EMAIL";
    ResponseMessage["USER_FORGOT_PASSWORD_OTP_INVALID"] = "USER_FORGOT_PASSWORD_OTP_INVALID";
    ResponseMessage["USER_FORGOT_PASSWORD_OTP_EXPIRED"] = "USER_FORGOT_PASSWORD_OTP_EXPIRED";
    ResponseMessage["USER_FORGOT_PASSWORD_OTP_VERIFIED"] = "USER_FORGOT_PASSWORD_OTP_VERIFIED";
    ResponseMessage["USER_FORGOT_PASSWORD_EMAIL_SUBJECT"] = "USER_FORGOT_PASSWORD_EMAIL_SUBJECT";
    ResponseMessage["USER_FORGOT_PASSWORD_EMAIL_BODY"] = "USER_FORGOT_PASSWORD_EMAIL_BODY";
    ResponseMessage["USER_EMAIL_VERIFIED_ALREADY"] = "USER_EMAIL_VERIFIED_ALREADY";
    ResponseMessage["USER_EMAIL_VERIFIED_SUCCESSFULLY"] = "USER_EMAIL_VERIFIED_SUCCESSFULLY";
    ResponseMessage["USER_EMAIL_VERIFY_EXPIRED"] = "USER_EMAIL_VERIFY_EXPIRED";
    ResponseMessage["USER_EMAIL_VERIFICATION_CODE_INVALID"] = "USER_EMAIL_VERIFICATION_CODE_INVALID";
    ResponseMessage["USER_RESET_PASSWORD_INVALID_TOKEN"] = "USER_RESET_PASSWORD_INVALID_TOKEN";
    ResponseMessage["USER_CURRENT_PASSWORD_INCORRECT"] = "USER_CURRENT_PASSWORD_INCORRECT";
    ResponseMessage["USER_PASSWORD_CHANGED"] = "USER_PASSWORD_CHANGED";
    ResponseMessage["USER_PROFILE_NOT_FOUND"] = "USER_PROFILE_NOT_FOUND";
    ResponseMessage["USER_PROFILE_UPDATED"] = "USER_PROFILE_UPDATED";
    ResponseMessage["USER_STATUS_UPDATED"] = "USER_STATUS_UPDATED";
    ResponseMessage["USER_LOGOUT"] = "USER_LOGOUT";
    ResponseMessage["USER_EMAIL_ALREADY_EXIST"] = "USER_EMAIL_ALREADY_EXIST";
    ResponseMessage["USER_MOBILE_ALREADY_EXIST"] = "USER_MOBILE_ALREADY_EXIST";
    ResponseMessage["USER_MOBILE_SAME"] = "USER_MOBILE_SAME";
    ResponseMessage["USER_MOBILE_NOT_REGISTERED"] = "USER_MOBILE_NOT_REGISTERED";
    ResponseMessage["USER_PASSWORD_INVALID"] = "USER_PASSWORD_INVALID";
    ResponseMessage["USER_LANGUAGE_UPDATED"] = "USER_LANGUAGE_UPDATED";
    ResponseMessage["USER_PROFILE_IMAGE_DELETED"] = "USER_PROFILE_IMAGE_DELETED";
    ResponseMessage["VERIFICATION_SENT_TO_MOBILE_NUMBER"] = "VERIFICATION_SENT_TO_MOBILE_NUMBER";
    ResponseMessage["WALLET_INSUFFICENT_AMOUNT"] = "WALLET_INSUFFICENT_AMOUNT";
    ResponseMessage["WRONG_OTP"] = "WRONG_OTP";
    ResponseMessage["DEFAULT_LANGUAGE_NOT_DELETED"] = "DEFAULT_LANGUAGE_NOT_DELETED";
    ResponseMessage["ENTER_REGISTER_MOBILE_NUMBER"] = "ENTER_REGISTER_MOBILE_NUMBER";
    ResponseMessage["DELIVERY_BOY_CREATED_SUCCESSFULLY"] = "DELIVERY_BOY_CREATED_SUCCESSFULLY";
    ResponseMessage["ADMIN_NOT_FOUND"] = "ADMIN_NOT_FOUND";
    ResponseMessage["ADMIN_ROLE_MUST"] = "ADMIN_ROLE_MUST";
    ResponseMessage["ADMIN_DELETED"] = "ADMIN_DELETED";
    ResponseMessage["ADMIN_STATUS_UPDATED"] = "ADMIN_STATUS_UPDATED";
    ResponseMessage["ADMIN_CREATED"] = "ADMIN_CREATED";
    ResponseMessage["CANT_DELETED_THIS_USER"] = "CANT_DELETED_THIS_USER";
    ResponseMessage["USER_DELETED"] = "USER_DELETED";
    ResponseMessage["ORDER_DELETED"] = "ORDER_DELETED";
    ResponseMessage["MAIL_SENT"] = "MAIL_SENT";
})(ResponseMessage = exports.ResponseMessage || (exports.ResponseMessage = {}));
//# sourceMappingURL=app.model.js.map