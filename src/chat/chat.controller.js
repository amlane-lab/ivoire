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
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const app_model_1 = require("../utils/app.model");
const util_service_1 = require("../utils/util.service");
const jwt_strategy_1 = require("../utils/jwt.strategy");
const chat_service_1 = require("./chat.service");
const users_model_1 = require("../users/users.model");
let ChatController = class ChatController {
    constructor(chatService, utilService) {
        this.chatService = chatService;
        this.utilService = utilService;
    }
    async getAllChatForUser(user, userQuery) {
        this.utilService.validateUserRole(user);
        try {
            let pagination = this.utilService.getUserPagination(userQuery);
            const chats = await this.chatService.getAllUserChat(user._id, pagination.page, pagination.limit);
            return this.utilService.successResponseData(chats);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAllChatGroup(user, adminQuery) {
        this.utilService.validateAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const chatGroups = await this.chatService.getAllChatGroup(pagination.page, pagination.limit);
            return this.utilService.successResponseData(chatGroups);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAllChatByUserId(user, userId, page, adminQuery) {
        this.utilService.validateAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const chats = await this.chatService.getAllUserChat(userId, pagination.page, pagination.limit);
            return this.utilService.successResponseData(chats);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/list'),
    swagger_1.ApiOperation({ title: 'Get my chats' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of chats' }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.UserQuery]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getAllChatForUser", null);
__decorate([
    common_1.Get('/admin/group'),
    swagger_1.ApiOperation({ title: 'Get users list of chats' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return users list of chats' }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getAllChatGroup", null);
__decorate([
    common_1.Get('/admin/:userId'),
    swagger_1.ApiOperation({ title: 'Get all chat by user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of chat by user' }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('userId')), __param(2, common_1.Query('page')), __param(3, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, Number, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getAllChatByUserId", null);
ChatController = __decorate([
    common_1.Controller('chats'),
    swagger_1.ApiUseTags('Chats'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        util_service_1.UtilService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map