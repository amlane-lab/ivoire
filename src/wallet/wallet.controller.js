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
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../users/users.model");
const app_model_1 = require("../utils/app.model");
const wallet_service_1 = require("./wallet.service");
const wallet_model_1 = require("./wallet.model");
const util_service_1 = require("../utils/util.service");
const jwt_strategy_1 = require("../utils/jwt.strategy");
let WalletController = class WalletController {
    constructor(walletService, utilService) {
        this.walletService = walletService;
        this.utilService = utilService;
    }
    async walletHistory(user, userQuery) {
        this.utilService.validateUserRole(user);
        try {
            let pagination = this.utilService.getUserPagination(userQuery);
            const wallets = await Promise.all([
                this.walletService.walletHistory(user._id, pagination.page, pagination.limit),
                this.walletService.countWalletHistory(user._id)
            ]);
            return this.utilService.successResponseData(wallets[0], { total: wallets[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/history'),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiOperation({ title: 'Get wallet transaction history' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list wallet transaction', type: wallet_model_1.ResponseWalletHistory }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.UserQuery]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "walletHistory", null);
WalletController = __decorate([
    common_1.Controller('wallets'),
    swagger_1.ApiUseTags('Wallets'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService,
        util_service_1.UtilService])
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map