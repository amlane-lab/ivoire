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
const util_service_1 = require("./utils/util.service");
const language_service_1 = require("./language/language.service");
let AppController = class AppController {
    constructor(utilService, languageService) {
        this.utilService = utilService;
        this.languageService = languageService;
        this.languageService.getLanguageForBackend().then(data => this.utilService.setLanguageList(data));
    }
};
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [util_service_1.UtilService, language_service_1.LanguageService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map