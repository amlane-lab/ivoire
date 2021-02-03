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
const notifications_service_1 = require("./notifications.service");
const util_service_1 = require("../utils/util.service");
const app_model_1 = require("../utils/app.model");
const jwt_strategy_1 = require("../utils/jwt.strategy");
const notifications_model_1 = require("./notifications.model");
const push_service_1 = require("../utils/push.service");
let NotificationController = class NotificationController {
    constructor(notificationService, utilService, pushService) {
        this.notificationService = notificationService;
        this.utilService = utilService;
        this.pushService = pushService;
    }
    async getAllNotification(user, adminQuery) {
        this.utilService.validateAdminRole(user);
        try {
            let pagination = this.utilService.getAdminPagination(adminQuery);
            const notifications = await Promise.all([
                this.notificationService.getAllNotification(pagination.page - 1, pagination.limit),
                this.notificationService.countAllnotification()
            ]);
            return this.utilService.successResponseData(notifications[0], { total: notifications[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getLastNotifications(user) {
        this.utilService.validateAdminRole(user);
        try {
            const notifications = await Promise.all([
                this.notificationService.getAllNotification(0, 5),
                this.notificationService.countUnread()
            ]);
            return this.utilService.successResponseData(notifications[0], { unread: notifications[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async sendToAll(user, notificationData) {
        this.utilService.validateAdminRole(user);
        try {
            const response = await this.pushService.sendNotificationToUser(null, notificationData.title, notificationData.body, true);
            if (response)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.PUSH_NOTIFICATION_SENT);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.PUSH_NOTIFICATION_NOT_SENT);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async readNotification(user, notificationData) {
        this.utilService.validateAdminRole(user);
        try {
            let response = await this.notificationService.readNotification(notificationData.notificationId);
            if (response)
                return this.utilService.successResponseData({ status: true });
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/admin/list'),
    swagger_1.ApiOperation({ title: 'Get all notification' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of notification', type: notifications_model_1.ResponseNotificationListDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.AdminQuery]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getAllNotification", null);
__decorate([
    common_1.Get('/admin/latest'),
    swagger_1.ApiOperation({ title: 'Get last 5 notifications' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of unread notification', type: notifications_model_1.ResponseNotificationListDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getLastNotifications", null);
__decorate([
    common_1.Post('/admin/send'),
    swagger_1.ApiOperation({ title: 'Send notification to all' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, notifications_model_1.SendNotificationDTO]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendToAll", null);
__decorate([
    common_1.Post('/admin/read'),
    swagger_1.ApiOperation({ title: 'Read notification' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, notifications_model_1.readNotificationDTO]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "readNotification", null);
NotificationController = __decorate([
    common_1.Controller('notifications'),
    swagger_1.ApiUseTags('Notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationService,
        util_service_1.UtilService,
        push_service_1.PushService])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notifications.controller.js.map