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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const settings_service_1 = require("./settings.service");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../users/users.model");
const util_service_1 = require("../utils/util.service");
const currency_service_1 = require("../utils/currency.service");
const settings_model_1 = require("./settings.model");
const app_model_1 = require("../utils/app.model");
const jwt_strategy_1 = require("../utils/jwt.strategy");
let SettingController = class SettingController {
    constructor(settingService, utilService, currencyService) {
        this.settingService = settingService;
        this.utilService = utilService;
        this.currencyService = currencyService;
    }
    async getDeliveryTaxSettingsForUser(user) {
        try {
            const resData = await this.settingService.getSettingsForUser();
            return this.utilService.successResponseData(resData);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getDeliveryTime(user) {
        this.utilService.validateAdminAndUserAllRole(user);
        try {
            let resData = await this.settingService.getDeliveryTimeSlots();
            let deliveryTimeSlots = await this.settingService.getAvailableTimeSlot(resData['deliveryTimeSlots']);
            return this.utilService.successResponseData(deliveryTimeSlots);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getDeliveryTaxSettings(user) {
        this.utilService.validateAdminRole(user);
        try {
            const storeInfo = await this.settingService.getDeliveryTaxSettings();
            return this.utilService.successResponseData(storeInfo);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateDeliveryTaxSettings(user, deliveryTaxData) {
        this.utilService.validateAdminRole(user);
        try {
            const deliveryTax = await this.settingService.updateDeliveryTaxSettings(deliveryTaxData);
            if (deliveryTax.n > 0)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.SETTING_DELIVERY_TAX_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAdminDeliveryTime(user) {
        this.utilService.validateAdminRole(user);
        try {
            let settings = await this.settingService.getDeliveryTimeSlots();
            let days = await this.utilService.getArrayOfWeekdays();
            settings = JSON.parse(JSON.stringify(settings));
            settings.deliveryTimeSlots = await settings.deliveryTimeSlots.map(d => { d.date = days[d.dayCode]; return d; });
            return this.utilService.successResponseData(settings);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async saveAdminDeliveryTime(user, deliverySlotData) {
        this.utilService.validateAdminRole(user);
        try {
            let deliveryTimeSlots = await this.utilService.deliveryTimeSlotsValidation(deliverySlotData.deliveryTimeSlots);
            if (deliveryTimeSlots.status) {
                await this.settingService.updatDeliverySlot(deliveryTimeSlots.data);
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.SETTING_DELIVERY_TIME_SLOTS_UPDATED);
            }
            else {
                return this.utilService.badRequestResponseData(deliveryTimeSlots.data);
            }
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAdminCurrency(user) {
        this.utilService.validateAdminRole(user);
        try {
            let resData = await this.settingService.getCurrencyDetail();
            return this.utilService.successResponseData(resData);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateAdminCurrency(user, updateCurrencyData) {
        this.utilService.validateAdminRole(user);
        try {
            let currencyList = await this.currencyService.getAllCurrencyList();
            if (!currencyList[updateCurrencyData.currencyCode])
                this.utilService.badRequest(app_model_1.ResponseMessage.CURRENCY_INVALID);
            let resData = await this.settingService.updateCurrency(updateCurrencyData);
            return this.utilService.successResponseMsg(app_model_1.ResponseMessage.SETTING_CURRENCY_UPDATED);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAllCurrencyList(user) {
        this.utilService.validateAdminRole(user);
        try {
            let currencyList = await this.currencyService.getAllCurrencyList();
            return this.utilService.successResponseData(currencyList);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getTimeSlotsDropdown(user) {
        this.utilService.validateAdminRole(user);
        try {
            const timeSlots = await this.utilService.timeSlotsDropdown();
            return this.utilService.successResponseData(timeSlots);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/details'),
    swagger_1.ApiOperation({ title: 'Get settings detail for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return settings detail', type: settings_model_1.ResponseSettingDetails }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getDeliveryTaxSettingsForUser", null);
__decorate([
    common_1.Get('/delivery-time-slots'),
    swagger_1.ApiOperation({ title: 'Get delivery time slot for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return delivery time slot', type: settings_model_1.ResponseTimeSlotDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getDeliveryTime", null);
__decorate([
    common_1.Get('/admin/delivery-tax'),
    swagger_1.ApiOperation({ title: 'Get settings detail' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return settings detail', type: settings_model_1.ResponseTimeSlotDetails }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getDeliveryTaxSettings", null);
__decorate([
    common_1.Put('/admin/delivery-tax/update'),
    swagger_1.ApiOperation({ title: 'Update delivery tax' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, settings_model_1.DeliveryTaxSaveDTO]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "updateDeliveryTaxSettings", null);
__decorate([
    common_1.Get('/admin/delivery-time-slots'),
    swagger_1.ApiOperation({ title: 'Get delivery time slot for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return delivery time slot', type: settings_model_1.ResponseTimeDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getAdminDeliveryTime", null);
__decorate([
    common_1.Put('/admin/update/delivery-time-slots'),
    swagger_1.ApiOperation({ title: 'Update delivery time slots' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "saveAdminDeliveryTime", null);
__decorate([
    common_1.Get('/admin/currency'),
    swagger_1.ApiOperation({ title: 'Get currency detail' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return currency detail', type: settings_model_1.ResponseCurrencyDetailsAdmin }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getAdminCurrency", null);
__decorate([
    common_1.Put('/admin/update/currency'),
    swagger_1.ApiOperation({ title: 'Update currency' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, settings_model_1.UpdateCurrencyDTO]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "updateAdminCurrency", null);
__decorate([
    common_1.Get('/admin/currency/list'),
    swagger_1.ApiOperation({ title: 'List of currency' }),
    swagger_1.ApiResponse({ status: 200, description: 'List of currency', type: settings_model_1.ResponseCurrencyListDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getAllCurrencyList", null);
__decorate([
    common_1.Get('/admin/time-slots-dropdown'),
    swagger_1.ApiOperation({ title: 'Get half hour time interval list ' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of time intervals', type: settings_model_1.ResponseTimeSlotDropDown }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getTimeSlotsDropdown", null);
SettingController = __decorate([
    common_1.Controller('settings'),
    swagger_1.ApiUseTags('Settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingService,
        util_service_1.UtilService,
        currency_service_1.CurrencyService])
], SettingController);
exports.SettingController = SettingController;
//# sourceMappingURL=settings.controller.js.map