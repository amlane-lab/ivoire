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
const common_1 = require("@nestjs/common");
const geoLib = require("geolib");
const uuid = require("uuid/v1");
const app_model_1 = require("./app.model");
const mongoose_1 = require("mongoose");
let language = "en";
let languageList = [];
let UtilService = class UtilService {
    constructor() {
        this.categoryModeGraph = async (data, category) => {
            for (let item of data) {
                let findCategoryTitle = await category.find(data => data._id == item._id.category);
                if (findCategoryTitle) {
                    item._id = findCategoryTitle.title;
                }
            }
            return data;
        };
        this.salesGraph = (data, type) => {
            let labelArray = [];
            let dataArray = [];
            if (type === "DAILY") {
                data.sort((a, b) => (a._id.date > b._id.date) ? 1 : -1);
                for (var i = 0; i < data.length; i++) {
                    let label = data[i]._id.date + '/' + data[i]._id.month + '/' + data[i]._id.year;
                    let totalDepoits = data[i].data;
                    labelArray.push(label);
                    dataArray.push(totalDepoits);
                    if (data.length == labelArray.length) {
                        let dailyGraph = {
                            label: labelArray,
                            total: dataArray,
                        };
                        return dailyGraph;
                    }
                }
            }
            else {
                data.sort((a, b) => (a._id.month > b._id.month) ? 1 : -1);
                let month;
                for (var i = 0; i < data.length; i++) {
                    let month1 = data[i]._id.month;
                    let totalDepoits = data[i].data;
                    switch (month1) {
                        case 1:
                            month = "January";
                            break;
                        case 2:
                            month = "February";
                            break;
                        case 3:
                            month = "March";
                            break;
                        case 4:
                            month = "April";
                            break;
                        case 5:
                            month = "May";
                            break;
                        case 6:
                            month = "June";
                            break;
                        case 7:
                            month = "July";
                            break;
                        case 8:
                            month = "August";
                            break;
                        case 9:
                            month = "September";
                            break;
                        case 10:
                            month = "October";
                            break;
                        case 11:
                            month = "November";
                            break;
                        case 12:
                            month = "December";
                    }
                    labelArray.push(month);
                    dataArray.push(totalDepoits);
                    if (data.length == labelArray.length) {
                        let graph = {
                            label: labelArray,
                            total: dataArray,
                        };
                        return graph;
                    }
                }
            }
        };
        this.userGraph = (data, type) => {
            let labelArray = [];
            let dataArray = [];
            if (type === "DAILY") {
                data.sort((a, b) => (a._id.date > b._id.date) ? 1 : -1);
                for (var i = 0; i < data.length; i++) {
                    let label = data[i]._id.date + '/' + data[i]._id.month + '/' + data[i]._id.year;
                    let totalCount = data[i].count;
                    labelArray.push(label);
                    dataArray.push(totalCount);
                    if (data.length == labelArray.length) {
                        let dailyGraph = {
                            label: labelArray,
                            total: dataArray,
                        };
                        return dailyGraph;
                    }
                }
            }
            else {
                data.sort((a, b) => (a._id.month > b._id.month) ? 1 : -1);
                let month;
                for (var i = 0; i < data.length; i++) {
                    let month1 = data[i]._id.month;
                    let totalCount = data[i].count;
                    switch (month1) {
                        case 1:
                            month = "January";
                            break;
                        case 2:
                            month = "February";
                            break;
                        case 3:
                            month = "March";
                            break;
                        case 4:
                            month = "April";
                            break;
                        case 5:
                            month = "May";
                            break;
                        case 6:
                            month = "June";
                            break;
                        case 7:
                            month = "July";
                            break;
                        case 8:
                            month = "August";
                            break;
                        case 9:
                            month = "September";
                            break;
                        case 10:
                            month = "October";
                            break;
                        case 11:
                            month = "November";
                            break;
                        case 12:
                            month = "December";
                    }
                    labelArray.push(month);
                    dataArray.push(totalCount);
                    if (data.length == labelArray.length) {
                        let graph = {
                            label: labelArray,
                            total: dataArray,
                        };
                        return graph;
                    }
                }
            }
        };
    }
    validateUserRole(user) {
        if (user.role !== app_model_1.UserRoles.USER) {
            const msg = this.getTranslatedMessage('NOT_FOUND');
            throw new common_1.NotFoundException(msg);
        }
    }
    validateSuperAdminRole(user) {
        if (!user.isSuperAdmin) {
            const msg = this.getTranslatedMessage('NOT_FOUND');
            throw new common_1.NotFoundException(msg);
        }
    }
    validateAdminRole(user) {
        if (user.role !== app_model_1.UserRoles.ADMIN) {
            const msg = this.getTranslatedMessage('NOT_FOUND');
            throw new common_1.NotFoundException(msg);
        }
    }
    validateDeliveryBoyRole(user) {
        if (user.role !== app_model_1.UserRoles.DELIVERY_BOY) {
            const msg = this.getTranslatedMessage('NOT_FOUND');
            throw new common_1.NotFoundException(msg);
        }
    }
    validateAllRole(user) {
        if (!(user.role === app_model_1.UserRoles.USER || user.role === app_model_1.UserRoles.DELIVERY_BOY || user.role === app_model_1.UserRoles.ADMIN)) {
            const msg = this.getTranslatedMessage('NOT_FOUND');
            throw new common_1.NotFoundException(msg);
        }
    }
    validateAdminAndUserAllRole(user) {
        if (!(user.role === app_model_1.UserRoles.USER || user.role === app_model_1.UserRoles.ADMIN)) {
            const msg = this.getTranslatedMessage('NOT_FOUND');
            throw new common_1.NotFoundException(msg);
        }
    }
    async successResponseData(responseData, extra) {
        if (!extra)
            return await this.res(common_1.HttpStatus.OK, responseData);
        let res = await this.res(common_1.HttpStatus.OK, responseData);
        for (var key in extra)
            res[key] = extra[key];
        return res;
    }
    async successResponseMsg(key) {
        return await this.res(common_1.HttpStatus.OK, "", key);
    }
    async badRequestResponseData(responseData, extra) {
        if (!extra)
            return await this.res(common_1.HttpStatus.BAD_REQUEST, responseData);
        let res = await this.res(common_1.HttpStatus.BAD_REQUEST, responseData);
        for (var key in extra)
            res[key] = extra[key];
        return res;
    }
    async resetContentResponseMsg(key) {
        return await this.res(common_1.HttpStatus.RESET_CONTENT, "", key);
    }
    async processingResponseMsg(key) {
        key = key || "PAYMENT_PROCESSING";
        return await this.res(common_1.HttpStatus.PROCESSING, "", key);
    }
    async paymentRequiredResponseMsg(key) {
        key = key || "PAYMENT_REQUIRED";
        return await this.res(common_1.HttpStatus.PAYMENT_REQUIRED, "", key);
    }
    errorResponse(e) {
        console.log(e);
        if (e.kind === 'ObjectId' && e.path === '_id') {
            throw new common_1.NotFoundException("NOT_FOUND");
        }
        if (e.message && e.message.statusCode == common_1.HttpStatus.BAD_REQUEST) {
            throw new common_1.BadRequestException(e.message);
        }
        if (e.message && e.message.statusCode == common_1.HttpStatus.NOT_FOUND) {
            throw new common_1.NotFoundException(e.message.message);
        }
    }
    unauthorized() {
        const msg = this.getTranslatedMessage('UNAUTHORIZED');
        throw new common_1.UnauthorizedException(msg);
    }
    badRequest(key) {
        const msg = this.getTranslatedMessage(key);
        throw new common_1.BadRequestException(msg);
    }
    pageNotFound() {
        const msg = this.getTranslatedMessage('NOT_FOUND');
        throw new common_1.NotFoundException(msg);
    }
    async notFoundResponseMsg(key) {
        key = key || "NOT_FOUND";
        return await this.res(common_1.HttpStatus.NOT_FOUND, "", key);
    }
    async notFoundResponse(responseData, key) {
        return await this.res(common_1.HttpStatus.NOT_FOUND, responseData);
    }
    async internalErrorResponseKey(key) {
        key = key || "INTERNAL_SERVER_ERR";
        return await this.res(common_1.HttpStatus.INTERNAL_SERVER_ERROR, "", key);
    }
    async resetContentResponseKey(key) {
        return await this.res(common_1.HttpStatus.RESET_CONTENT, "", key);
    }
    async resetContentResponseData(responseData) {
        return await this.res(common_1.HttpStatus.RESET_CONTENT, responseData);
    }
    getTranslatedMessage(key) {
        let message = "";
        if (languageList && languageList[language] && languageList[language][key]) {
            message = languageList[language][key];
        }
        else {
            message = languageList["en"][key];
        }
        return message ? message : key;
    }
    async getTranslatedMessageByKey(key) {
        let message = "";
        if (languageList && languageList[language] && languageList[language][key]) {
            message = languageList[language][key];
        }
        else {
            message = languageList["en"][key];
        }
        message = message || key;
        return message;
    }
    async res(responseCode, responseData, key) {
        let message = "";
        if (responseData) {
            message = responseData;
        }
        else {
            if (languageList && languageList[language] && languageList[language][key]) {
                message = languageList[language][key];
            }
            else {
                message = languageList["en"][key];
            }
        }
        message = message || key;
        return {
            response_code: responseCode,
            response_data: message
        };
    }
    async response(responseCode, responseData) {
        return {
            response_code: responseCode,
            response_data: responseData
        };
    }
    setLanguage(lang) {
        language = lang;
    }
    getLanguage() { return language; }
    setLanguageList(list) {
        list.forEach(l => { languageList[l.languageCode] = l.backendJson; });
    }
    getLanguageData(code) {
        return languageList[code];
    }
    async getUUID() {
        return uuid();
    }
    async getArrayOfWeekdays() {
        return mongoose_1.Promise.all([
            this.getTranslatedMessageByKey(app_model_1.ResponseMessage.DAYS_SUNDAY),
            this.getTranslatedMessageByKey(app_model_1.ResponseMessage.DAYS_MONDAY),
            this.getTranslatedMessageByKey(app_model_1.ResponseMessage.DAYS_TUESDAY),
            this.getTranslatedMessageByKey(app_model_1.ResponseMessage.DAYS_WEDNESDAY),
            this.getTranslatedMessageByKey(app_model_1.ResponseMessage.DAYS_THURSDAY),
            this.getTranslatedMessageByKey(app_model_1.ResponseMessage.DAYS_FRIDAY),
            this.getTranslatedMessageByKey(app_model_1.ResponseMessage.DAYS_SATURDAY),
        ]);
    }
    async getXminutesAheadTime(minutes) {
        var d1 = new Date();
        var d2 = new Date(d1);
        d2.setMinutes(d1.getMinutes() + minutes);
        return d2.getTime();
    }
    convertToDecimal(value) {
        return Number(value).toFixed(2);
    }
    convertToNumber(input) {
        var number = Number(input);
        if (!isNaN(number)) {
            return number;
        }
        else
            return 0;
    }
    calculateDistance(userLocation, storeLocation) {
        const preciseDistance = geoLib.getPreciseDistance(storeLocation, userLocation);
        return preciseDistance / 1000;
    }
    async timeSlotsDropdown() {
        let timeInterval = 30;
        let timeSlots = [];
        let startTime = 0;
        let maxTime = 24 * 60;
        for (var i = 0; startTime < maxTime; i++) {
            timeSlots[i] = { time: this.minutesConversion(startTime), minutes: startTime };
            startTime += timeInterval;
        }
        return timeSlots;
    }
    statusMessage(status, message) {
        return {
            status: status,
            data: message
        };
    }
    minutesConversion(m) {
        if (process.env.TIME_SLOT_FORMAT_24HR === 'false') {
            let a = 'AM';
            let h = m / 60 ^ 0;
            if (h >= 12)
                a = 'PM';
            if (h > 12)
                h = h - 12;
            return `0${h}`.slice(-2) + ':' + ('0' + m % 60).slice(-2) + " " + a;
        }
        else {
            let h = m / 60 ^ 0;
            if (h > 24)
                h = h - 24;
            return `0${h}`.slice(-2) + ':' + ('0' + m % 60).slice(-2);
        }
    }
    deliveryTimeSlotsValidation(deliveryTimeSlots) {
        for (let i = 0; i < 7; i++) {
            deliveryTimeSlots[i].timings.sort((a, b) => a.openTime > b.openTime);
            const selectedDate = deliveryTimeSlots[i].date;
            const timings = deliveryTimeSlots[i].timings;
            for (var j = 0; j < timings.length; j++) {
                if (timings[j].openTime < 0 || timings[j].openTime > 1410)
                    return this.statusMessage(false, "Open time should be in range of 0 - 1410 for " + selectedDate);
                if (timings[j].closeTime < 0 || timings[j].closeTime > 1410)
                    return this.statusMessage(false, "Close time should be in range of 0 - 1410 for " + selectedDate);
                if (timings[j].openTime === timings[j].closeTime)
                    return this.statusMessage(false, "Open and close time must not be same " + this.minutesConversion(timings[j].openTime) + " for " + selectedDate);
                if (timings[j].openTime % 30 !== 0)
                    return this.statusMessage(false, "Invalid time " + this.minutesConversion(timings[j].openTime) + ", must be in 30 minutes format" + " for " + selectedDate);
                if (timings[j].closeTime % 30 !== 0)
                    return this.statusMessage(false, "Invalid time " + this.minutesConversion(timings[j].closeTime) + ", must be in 30 minutes format" + " for " + selectedDate);
                if (timings[j].openTime > timings[j].closeTime)
                    return this.statusMessage(false, this.minutesConversion(timings[j].closeTime) + " must be greater than " + this.minutesConversion(timings[j].openTime) + " for " + selectedDate);
                if (j !== 0 && timings[j - 1].closeTime > timings[j].openTime)
                    return this.statusMessage(false, this.minutesConversion(timings[j - 1].closeTime) + " is overlapping with slot " + this.minutesConversion(timings[j].openTime) + " for " + selectedDate + ", please add non overlapping time slots.");
                timings[j].slot = this.minutesConversion(timings[j].openTime) + " - " + this.minutesConversion(timings[j].closeTime);
            }
        }
        ;
        return { status: true, data: deliveryTimeSlots };
    }
    getAdminPagination(query) {
        return {
            page: Number(query.page) || app_model_1.AdminSettings.DEFAULT_PAGE_NUMBER,
            limit: Number(query.limit) || app_model_1.AdminSettings.DEFAULT_PAGE_LIMIT,
            q: query.q || ''
        };
    }
    getUserPagination(query) {
        return {
            page: Number(query.page) || app_model_1.UserSettings.DEFAULT_PAGE_NUMBER,
            limit: Number(query.limit) || app_model_1.UserSettings.DEFAULT_PAGE_LIMIT
        };
    }
};
UtilService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], UtilService);
exports.UtilService = UtilService;
//# sourceMappingURL=util.service.js.map