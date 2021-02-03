"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const mongoose_1 = require("@nestjs/mongoose");
const pages_controller_1 = require("./pages.controller");
const pages_model_1 = require("./pages.model");
const pages_service_1 = require("./pages.service");
const util_service_1 = require("../utils/util.service");
let PageModule = class PageModule {
};
PageModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Page', schema: pages_model_1.PageSchema }]),
        ],
        controllers: [pages_controller_1.PageController],
        providers: [pages_service_1.PageService, util_service_1.UtilService],
    })
], PageModule);
exports.PageModule = PageModule;
//# sourceMappingURL=pages.module.js.map