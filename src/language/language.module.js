"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const language_controller_1 = require("./language.controller");
const language_model_1 = require("./language.model");
const language_service_1 = require("./language.service");
let LanguageModule = class LanguageModule {
};
LanguageModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Language', schema: language_model_1.LanguageSchema }]),
        ],
        providers: [language_service_1.LanguageService],
        controllers: [language_controller_1.LanguageController],
        exports: [language_service_1.LanguageService, mongoose_1.MongooseModule]
    })
], LanguageModule);
exports.LanguageModule = LanguageModule;
//# sourceMappingURL=language.module.js.map