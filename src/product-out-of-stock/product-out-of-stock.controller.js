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
const product_out_of_stock_service_1 = require("./product-out-of-stock.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("../utils/jwt.strategy");
const users_model_1 = require("../users/users.model");
const app_model_1 = require("../utils/app.model");
const product_out_of_stock_model_1 = require("./product-out-of-stock.model");
const util_service_1 = require("../utils/util.service");
let ProductOutOfStockController = class ProductOutOfStockController {
    constructor(productOutOfStockService, utilService) {
        this.productOutOfStockService = productOutOfStockService;
        this.utilService = utilService;
    }
    async getList(user, adminQuery) {
        this.utilService.validateAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const productStocklist = await Promise.all([
                this.productOutOfStockService.getAllList(pagination.page - 1, pagination.limit),
                this.productOutOfStockService.countAllList()
            ]);
            return this.utilService.successResponseData(productStocklist[0], { total: productStocklist[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/admin/list'),
    swagger_1.ApiOperation({ title: 'Get all list of Productstock' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of order ', type: product_out_of_stock_model_1.StockVariantDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], ProductOutOfStockController.prototype, "getList", null);
ProductOutOfStockController = __decorate([
    common_1.Controller('product-out-of-stock'),
    swagger_1.ApiUseTags('Product Out of Stock'),
    __metadata("design:paramtypes", [product_out_of_stock_service_1.ProductOutOfStockService,
        util_service_1.UtilService])
], ProductOutOfStockController);
exports.ProductOutOfStockController = ProductOutOfStockController;
//# sourceMappingURL=product-out-of-stock.controller.js.map