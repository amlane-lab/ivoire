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
const settings_controller_1 = require("./settings.controller");
const settings_model_1 = require("./settings.model");
const settings_service_1 = require("./settings.service");
let SettingModule = class SettingModule {
};
SettingModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Setting', schema: settings_model_1.SettingSchema }])
        ],
        providers: [settings_service_1.SettingService],
        controllers: [settings_controller_1.SettingController],
        exports: [settings_service_1.SettingService, mongoose_1.MongooseModule]
    })
], SettingModule);
exports.SettingModule = SettingModule;
//# sourceMappingURL=settings.module.js.map