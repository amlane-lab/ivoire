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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const util_service_1 = require("../utils/util.service");
let SettingService = class SettingService {
    constructor(settingModel, utilService) {
        this.settingModel = settingModel;
        this.utilService = utilService;
    }
    async getSettingsForUser() {
        const deliveryTax = await this.settingModel.findOne({}, '-_id minimumOrderAmountToPlaceOrder location paymentMethod currencySymbol currencyCode');
        return deliveryTax;
    }
    async getDeliveryTimeSlots() {
        let WorkingHourUpdateRes = await this.settingModel.findOne({}, 'deliveryTimeSlots');
        return WorkingHourUpdateRes;
    }
    async getDeliveryTaxSettings() {
        const deliveryTax = await this.settingModel.findOne({});
        return deliveryTax;
    }
    async getCurrencyDetail() {
        let WorkingHourUpdateRes = await this.settingModel.findOne({}, 'currencySymbol currencyCode');
        return WorkingHourUpdateRes;
    }
    async updateCurrency(updateCurrencyData) {
        let WorkingHourUpdateRes = await this.settingModel.update({}, updateCurrencyData);
        return WorkingHourUpdateRes;
    }
    async updatDeliverySlot(deliverySlotData) {
        let settingWorkingHourRes = await this.settingModel.update({}, { deliveryTimeSlots: deliverySlotData });
        return settingWorkingHourRes;
    }
    async updateDeliveryTaxSettings(deliveryTaxData) {
        const deliveryTax = await this.settingModel.updateOne({}, deliveryTaxData, { new: true });
        return deliveryTax;
    }
    dateFormat(i) {
        var date = new Date();
        date.setDate(date.getDate() + i);
        if (process.env.TIME_SLOT_FORMAT_24HR === 'false') {
            var arrayOfWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            return arrayOfWeekdays[date.getDay()] + ' ' + date.getDate() + "-" + monthNames[date.getMonth()];
        }
        else {
            return date.getDate() + '/' + (date.getMonth() + 1) + "/" + date.getFullYear();
        }
    }
    async getAvailableTimeSlot(deliveryTimeSlots) {
        var currentDate = new Date();
        const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes() + 30;
        let isNextDay = 0;
        if (currentMinutes > 1230) {
            currentDate.setDate(currentDate.getDate() + 1);
            isNextDay = 1;
        }
        let temp = deliveryTimeSlots;
        let slots = deliveryTimeSlots.slice(currentDate.getDay(), 7);
        slots = slots.concat(temp.slice(0, currentDate.getDay()));
        slots = JSON.parse(JSON.stringify(slots));
        if (isNextDay == 0)
            slots[0].timings = slots[0].timings.filter(s => s.closeTime > currentMinutes);
        slots = slots.map((s, i) => {
            s.timings = s.timings.filter(c => {
                delete c.openTime;
                delete c.closeTime;
                delete c.deliveryCount;
                return c.isOpen == true;
            });
            s.date = this.dateFormat(i + isNextDay);
            return s;
        });
        slots = slots.filter(s => {
            delete s.dayCode;
            return s.isOpen == true && s.timings.length > 0;
        });
        return slots;
    }
    async getWorkingHour() {
        let WorkingHourUpdateRes = await this.settingModel.findOne({}, 'workingHours startDeliveryFrom');
        return WorkingHourUpdateRes;
    }
    async createWorkingHour(workingHours) {
        const workingHourCreateRes = await this.settingModel.create({ workingHours: workingHours });
        return workingHourCreateRes;
    }
    async updateWorkingHour(settingWorkingHours) {
        let settingWorkingHourRes = await this.settingModel.findByIdAndUpdate(settingWorkingHours._id, settingWorkingHours);
        return settingWorkingHourRes;
    }
    async getCurrencyAndLanguage() {
        const currencyLanguageRes = await this.settingModel.findOne({}, 'languageCode currencySymbol currencyCode');
        return currencyLanguageRes;
    }
    async getCurrencyAndLanguageList() {
        const currencyLanguageListRes = await this.settingModel.findOne({}, 'currencyList languageList');
        return currencyLanguageListRes;
    }
    async getCurrencyLanguageCode() {
        const currencyLanguageCodeRes = await this.settingModel.findOne({}, 'languageCode currencySymbol');
        return currencyLanguageCodeRes;
    }
    async getMaxWalletAmountUsed() {
        const setting = await this.settingModel.findOne({}, 'maxWalletAmountUsed');
        return setting.maxWalletAmountUsed;
    }
};
SettingService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Setting')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        util_service_1.UtilService])
], SettingService);
exports.SettingService = SettingService;
//# sourceMappingURL=settings.service.js.map