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
const app_model_1 = require("../utils/app.model");
let LanguageService = class LanguageService {
    constructor(languageModel) {
        this.languageModel = languageModel;
    }
    async checkJson(sourceKey, inputKey) {
        let allFounded = sourceKey.filter(ai => !inputKey.includes(ai));
        if (allFounded && allFounded.length) {
            let str = "";
            allFounded.forEach((element, index) => {
                if (index > 0)
                    str += "," + element;
                else
                    str += element;
            });
            return { isValid: false, message: str };
        }
        else
            return { isValid: true, message: "Success" };
    }
    async validateJson(sourcData, inputData, type) {
        let sourceKey, inputKey;
        if (type === app_model_1.LanguageJsonType.BACKEND) {
            sourceKey = Object.keys(sourcData.backendJson);
            inputKey = Object.keys(inputData.backendJson);
        }
        else if (type === app_model_1.LanguageJsonType.DELIVERY) {
            sourceKey = Object.keys(sourcData.deliveyAppJson);
            inputKey = Object.keys(inputData.deliveyAppJson);
        }
        else if (type === app_model_1.LanguageJsonType.WEB) {
            sourceKey = Object.keys(sourcData.webJson);
            inputKey = Object.keys(inputData.webJson);
        }
        else if (type === app_model_1.LanguageJsonType.USER) {
            sourceKey = Object.keys(sourcData.mobAppJson);
            inputKey = Object.keys(inputData.mobAppJson);
        }
        else if (type === app_model_1.LanguageJsonType.CMS) {
            sourceKey = Object.keys(sourcData.cmsJson);
            inputKey = Object.keys(inputData.cmsJson);
        }
        let isValidated = await this.checkJson(sourceKey, inputKey);
        return isValidated;
    }
    parseJson(sourcData) {
        sourcData.webJson = JSON.parse(sourcData.webJson);
        sourcData.deliveyAppJson = JSON.parse(sourcData.deliveyAppJson);
        sourcData.mobAppJson = JSON.parse(sourcData.mobAppJson);
        sourcData.cmsJson = JSON.parse(sourcData.cmsJson);
        sourcData.backendJson = JSON.parse(sourcData.backendJson);
        return sourcData;
    }
    async getAllLanguage() {
        let languages = await this.languageModel.find({}, 'languageCode languageName status isDefault');
        return languages;
    }
    async getAllLanguageForUser() {
        let languages = await this.languageModel.find({ status: true }, 'languageCode languageName isDefault');
        return languages;
    }
    async checkExistLanguage(code) {
        let language = await this.languageModel.findOne({ languageCode: code }, '_id');
        return language;
    }
    async getLanguageById(id) {
        let language = await this.languageModel.findOne({ _id: id });
        return language;
    }
    async getLanguageByCode(code) {
        let language = await this.languageModel.findOne({ languageCode: code });
        return language;
    }
    async getDefaultLanguage() {
        let language = await this.languageModel.findOne({ isDefault: 1 });
        return language;
    }
    async createLanguage(languageData) {
        const language = await this.languageModel.create(languageData);
        return language;
    }
    async updateLanguage(languageId, languageData) {
        const language = await this.languageModel.findByIdAndUpdate(languageId, languageData, { new: true });
        return language;
    }
    async deleteLanguage(languageId) {
        return await this.languageModel.deleteOne({ _id: languageId });
    }
    async setDefaultLanguage(languageId) {
        await this.languageModel.updateMany({}, { isDefault: 0 });
        const language = await this.languageModel.findByIdAndUpdate(languageId, { isDefault: 1 }, { new: true });
        return language;
    }
    async languageStatusUpdate(languageId, languageStatusUpdateDTO) {
        const language = await this.languageModel.findByIdAndUpdate(languageId, languageStatusUpdateDTO, { new: true });
        return language;
    }
    async getLanguageForBackend() {
        let language = await this.languageModel.find({}, 'languageCode languageName backendJson');
        return language;
    }
    async getOtherLanguage() {
        let language = await this.languageModel.find({ languageCode: { $ne: "en" } });
        return language;
    }
    async languageJsonUpdate(languageKeys, englishLanguage, jsonSourceKey, jsonType) {
        let jsonTargetKey = Object.keys(languageKeys[jsonType]);
        let allFounded = jsonSourceKey.filter(ai => !jsonTargetKey.includes(ai));
        if (allFounded && allFounded.length) {
            for (let keys of allFounded) {
                languageKeys[jsonType][keys] = englishLanguage[jsonType][keys];
            }
        }
        return languageKeys[jsonType];
    }
    async addKeyToOtherLanguage(englishLanguage) {
        let otherLanguages = await this.getOtherLanguage();
        let backendJsonSourceKey = Object.keys(englishLanguage.backendJson);
        let mobAppJsonSourceKey = Object.keys(englishLanguage.mobAppJson);
        let deliveyAppJsonSourceKey = Object.keys(englishLanguage.deliveyAppJson);
        let webJsonSourceKey = Object.keys(englishLanguage.webJson);
        let cmsJsonSourceKey = Object.keys(englishLanguage.backendJson);
        for (let languageKeys of otherLanguages) {
            let allJson = await Promise.all([
                this.languageJsonUpdate(languageKeys, englishLanguage, backendJsonSourceKey, app_model_1.LanguageJsonType.BACKEND),
                this.languageJsonUpdate(languageKeys, englishLanguage, mobAppJsonSourceKey, app_model_1.LanguageJsonType.USER),
                this.languageJsonUpdate(languageKeys, englishLanguage, deliveyAppJsonSourceKey, app_model_1.LanguageJsonType.DELIVERY),
                this.languageJsonUpdate(languageKeys, englishLanguage, webJsonSourceKey, app_model_1.LanguageJsonType.WEB),
                this.languageJsonUpdate(languageKeys, englishLanguage, cmsJsonSourceKey, app_model_1.LanguageJsonType.CMS)
            ]);
            languageKeys[app_model_1.LanguageJsonType.BACKEND] = allJson[0];
            languageKeys[app_model_1.LanguageJsonType.USER] = allJson[1];
            languageKeys[app_model_1.LanguageJsonType.DELIVERY] = allJson[2];
            languageKeys[app_model_1.LanguageJsonType.WEB] = allJson[3];
            languageKeys[app_model_1.LanguageJsonType.CMS] = allJson[4];
            await this.updateLanguage(languageKeys._id, languageKeys);
        }
        return true;
    }
};
LanguageService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Language')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LanguageService);
exports.LanguageService = LanguageService;
//# sourceMappingURL=language.service.js.map