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
const language_service_1 = require("./language.service");
const language_model_1 = require("./language.model");
const users_model_1 = require("../users/users.model");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const util_service_1 = require("../utils/util.service");
const app_model_1 = require("../utils/app.model");
const jwt_strategy_1 = require("../utils/jwt.strategy");
let LanguageController = class LanguageController {
    constructor(languageService, utilService) {
        this.languageService = languageService;
        this.utilService = utilService;
    }
    async getLanguageListForUser(user) {
        try {
            const languages = await this.languageService.getAllLanguageForUser();
            return this.utilService.successResponseData(languages);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getLanguageList(user) {
        this.utilService.validateAdminRole(user);
        try {
            const languages = await this.languageService.getAllLanguage();
            return this.utilService.successResponseData(languages);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async createLanguage(user, languageData) {
        this.utilService.validateAdminRole(user);
        try {
            let validatedRes;
            languageData = await this.languageService.parseJson(languageData);
            let languageExist = await this.languageService.checkExistLanguage(languageData.languageCode);
            if (languageExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.LANGUAGE_ALREADY_EXIST);
            let validateKeys = await this.languageService.getLanguageByCode("en");
            if (validateKeys) {
                let resMsg = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.LANGUAGE_VALIDATED);
                validatedRes = await this.languageService.validateJson(validateKeys, languageData, "backendJson");
                if (!validatedRes.isValid)
                    this.utilService.badRequest(`${validatedRes.message} ${resMsg}`);
                validatedRes = await this.languageService.validateJson(validateKeys, languageData, "deliveyAppJson");
                if (!validatedRes.isValid)
                    this.utilService.badRequest(`${validatedRes.message} ${resMsg}`);
                validatedRes = await this.languageService.validateJson(validateKeys, languageData, "webJson");
                if (!validatedRes.isValid)
                    this.utilService.badRequest(`${validatedRes.message} ${resMsg}`);
                validatedRes = await this.languageService.validateJson(validateKeys, languageData, "mobAppJson");
                if (!validatedRes.isValid)
                    this.utilService.badRequest(`${validatedRes.message} ${resMsg}`);
                validatedRes = await this.languageService.validateJson(validateKeys, languageData, "cmsJson");
                if (!validatedRes.isValid)
                    this.utilService.badRequest(`${validatedRes.message} ${resMsg}`);
                const language = await this.languageService.createLanguage(languageData);
                if (language) {
                    this.languageService.getLanguageForBackend().then(data => this.utilService.setLanguageList(data));
                    return this.utilService.successResponseMsg(app_model_1.ResponseMessage.LANGUAGE_SAVED);
                }
                else
                    this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateLanguage(user, languageId, languageData) {
        this.utilService.validateAdminRole(user);
        try {
            let validatedRes;
            languageData = await this.languageService.parseJson(languageData);
            if (languageData.languageCode == "en") {
                const language = await this.languageService.updateLanguage(languageId, languageData);
                if (language) {
                    this.languageService.addKeyToOtherLanguage(language);
                    this.languageService.getLanguageForBackend().then(data => this.utilService.setLanguageList(data));
                    return this.utilService.successResponseMsg(app_model_1.ResponseMessage.LANGUAGE_UPDATED);
                }
                else
                    this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
            }
            else {
                let validateKeys = await this.languageService.getLanguageByCode("en");
                if (validateKeys) {
                    let resMsg = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.LANGUAGE_VALIDATED);
                    validatedRes = await this.languageService.validateJson(validateKeys, languageData, "backendJson");
                    if (!validatedRes.isValid)
                        this.utilService.badRequest(`${validatedRes.message} ${resMsg}`);
                    validatedRes = await this.languageService.validateJson(validateKeys, languageData, "deliveyAppJson");
                    if (!validatedRes.isValid)
                        this.utilService.badRequest(`${validatedRes.message} ${resMsg}`);
                    validatedRes = await this.languageService.validateJson(validateKeys, languageData, "webJson");
                    if (!validatedRes.isValid)
                        this.utilService.badRequest(`${validatedRes.message} ${resMsg}`);
                    validatedRes = await this.languageService.validateJson(validateKeys, languageData, "mobAppJson");
                    if (!validatedRes.isValid)
                        this.utilService.badRequest(`${validatedRes.message} ${resMsg}`);
                    validatedRes = await this.languageService.validateJson(validateKeys, languageData, "cmsJson");
                    if (!validatedRes.isValid)
                        this.utilService.badRequest(`${validatedRes.message} ${resMsg}`);
                    const language = await this.languageService.updateLanguage(languageId, languageData);
                    if (language) {
                        this.languageService.getLanguageForBackend().then(data => this.utilService.setLanguageList(data));
                        return this.utilService.successResponseMsg(app_model_1.ResponseMessage.LANGUAGE_UPDATED);
                    }
                    else
                        this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
                }
                else
                    this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
            }
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async DeleteLanguage(user, languageId) {
        this.utilService.validateAdminRole(user);
        try {
            const languageExist = await this.languageService.getLanguageById(languageId);
            if (!languageExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.LANGUAGE_NOT_FOUND);
            if (languageExist && languageExist.isDefault)
                this.utilService.badRequest(app_model_1.ResponseMessage.DEFAULT_LANGUAGE_NOT_DELETED);
            const language = await this.languageService.deleteLanguage(languageId);
            if (language)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.LANGUAGE_DELETED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getLanguageDetail(user, languageId) {
        this.utilService.validateAdminRole(user);
        try {
            const language = await this.languageService.getLanguageById(languageId);
            if (language)
                return this.utilService.successResponseData(language);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.LANGUAGE_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async setDefaultLanguage(user, languageId) {
        this.utilService.validateAdminRole(user);
        try {
            const language = await this.languageService.setDefaultLanguage(languageId);
            if (language)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.LANGUAGE_DEFAULT_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.LANGUAGE_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async statusUpdate(user, languageId, languageStatusUpdateDTO) {
        this.utilService.validateAdminRole(user);
        try {
            const language = await this.languageService.languageStatusUpdate(languageId, languageStatusUpdateDTO);
            if (language)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.LANGUAGE_STATUS_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.LANGUAGE_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getLanguageCms(query) {
        try {
            let language, code = query.code, languageData = {};
            if (code)
                language = await this.languageService.getLanguageByCode(code);
            else
                language = await this.languageService.getDefaultLanguage();
            if (language) {
                languageData[language['languageCode']] = language[app_model_1.LanguageJsonType.CMS];
                return this.utilService.successResponseData(languageData);
            }
            else {
                language = await this.languageService.getDefaultLanguage();
                languageData[language['languageCode']] = language[app_model_1.LanguageJsonType.CMS];
                return this.utilService.successResponseData(languageData);
            }
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getLanguageWeb(query) {
        try {
            let language, code = query.code, languageData = {};
            if (code)
                language = await this.languageService.getLanguageByCode(code);
            else
                language = await this.languageService.getDefaultLanguage();
            if (language) {
                languageData[language['languageCode']] = language[app_model_1.LanguageJsonType.WEB];
                return this.utilService.successResponseData(languageData);
            }
            else {
                language = await this.languageService.getDefaultLanguage();
                languageData[language['languageCode']] = language[app_model_1.LanguageJsonType.WEB];
                return this.utilService.successResponseData(languageData);
            }
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getLanguageUser(query) {
        try {
            let language, code = query.code, languageData = {};
            if (code)
                language = await this.languageService.getLanguageByCode(code);
            else
                language = await this.languageService.getDefaultLanguage();
            if (language) {
                languageData[language['languageCode']] = language[app_model_1.LanguageJsonType.USER];
                return this.utilService.successResponseData({ json: languageData, languageCode: language.languageCode });
            }
            else {
                language = await this.languageService.getDefaultLanguage();
                languageData[language['languageCode']] = language[app_model_1.LanguageJsonType.USER];
                return this.utilService.successResponseData({ json: languageData, languageCode: language.languageCode });
            }
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getLanguageDelivey(query) {
        try {
            let language, code = query.code, languageData = {};
            if (code)
                language = await this.languageService.getLanguageByCode(code);
            else
                language = await this.languageService.getDefaultLanguage();
            if (language) {
                languageData[language['languageCode']] = language[app_model_1.LanguageJsonType.DELIVERY];
                return this.utilService.successResponseData({ json: languageData, languageCode: language.languageCode });
            }
            else {
                language = await this.languageService.getDefaultLanguage();
                languageData[language['languageCode']] = language[app_model_1.LanguageJsonType.DELIVERY];
                return this.utilService.successResponseData({ json: languageData, languageCode: language.languageCode });
            }
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/list'),
    swagger_1.ApiOperation({ title: 'Get all enabled languages for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of enabled languges', type: language_model_1.ResponseFavouritesDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguageListForUser", null);
__decorate([
    common_1.Get('/admin/list'),
    swagger_1.ApiOperation({ title: 'Get all languages for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of languges', type: language_model_1.ResponseFavouritesDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguageList", null);
__decorate([
    common_1.Post('/admin/create'),
    swagger_1.ApiOperation({ title: 'Create new language' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, language_model_1.LanguageDTO]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "createLanguage", null);
__decorate([
    common_1.Put('/admin/update/:languageId'),
    swagger_1.ApiOperation({ title: 'Update language by languaeId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('languageId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, language_model_1.LanguageDTO]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "updateLanguage", null);
__decorate([
    common_1.Delete('/admin/delete/:languageId'),
    swagger_1.ApiOperation({ title: 'Delete language by languaeId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('languageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "DeleteLanguage", null);
__decorate([
    common_1.Get('/admin/detail/:languageId'),
    swagger_1.ApiOperation({ title: 'Get language detail by languageId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return language detail by languageId', type: language_model_1.ResponseLanguageDetails }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('languageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguageDetail", null);
__decorate([
    common_1.Get('/admin/default/:languageId'),
    swagger_1.ApiOperation({ title: 'Set default language' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return language detail by languageId' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('languageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "setDefaultLanguage", null);
__decorate([
    common_1.Put('/admin/status-update/:languageId'),
    swagger_1.ApiOperation({ title: 'Update status of language' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('languageId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, language_model_1.LanguageStatusUpdateDTO]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "statusUpdate", null);
__decorate([
    common_1.Get('/cms'),
    swagger_1.ApiOperation({ title: 'Get language for cms' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list', type: language_model_1.ResponseLanguageCMSDetailsDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguageCms", null);
__decorate([
    common_1.Get('/web'),
    swagger_1.ApiOperation({ title: 'Get language for web' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list', type: language_model_1.ResponseLanguageCMSDetailsDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguageWeb", null);
__decorate([
    common_1.Get('/user'),
    swagger_1.ApiOperation({ title: 'Get language for user app' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list', type: language_model_1.ResponseLanguageCMSDetailsDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguageUser", null);
__decorate([
    common_1.Get('/delivery'),
    swagger_1.ApiOperation({ title: 'Get language for delivery app' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list', type: language_model_1.ResponseLanguageCMSDetailsDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguageDelivey", null);
LanguageController = __decorate([
    common_1.Controller('languages'),
    swagger_1.ApiUseTags('Languages'),
    __metadata("design:paramtypes", [language_service_1.LanguageService,
        util_service_1.UtilService])
], LanguageController);
exports.LanguageController = LanguageController;
//# sourceMappingURL=language.controller.js.map