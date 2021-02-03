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
const notifications_model_1 = require("./notifications.model");
let NotificationService = class NotificationService {
    constructor(notificationModel) {
        this.notificationModel = notificationModel;
    }
    async getAllNotification(page, limit) {
        const skip = page * limit;
        return await this.notificationModel.find({ isRead: false }, 'title notifyType isRead description orderID orderId deliveryBoyId deliveryBoyName createdAt').limit(limit).skip(skip).sort({ createdAt: -1 });
    }
    async countAllnotification() {
        return await this.notificationModel.countDocuments({});
    }
    async readNotification(notifyId) {
        return await this.notificationModel.updateOne({ _id: notifyId }, { isRead: true });
    }
    async countUnread() {
        return await this.notificationModel.countDocuments({ isRead: false });
    }
    async createForOrderPlaced(notificationData) {
        notificationData.title = "New order placed";
        notificationData.notifyType = notifications_model_1.NotificationType.ORDER_PLACED;
        return await this.notificationModel.create(notificationData);
    }
    async createForOrderCancel(notificationData) {
        notificationData.title = "Order Cancelled";
        notificationData.notifyType = notifications_model_1.NotificationType.ORDER_CANCELLED;
        return await this.notificationModel.create(notificationData);
    }
    async createForAcceptedByBoy(notificationData) {
        notificationData.title = "Order Accepted by delivery boy";
        notificationData.notifyType = notifications_model_1.NotificationType.ORDER_ACCEPTED_BY_DELIVERY_BOY;
        return await this.notificationModel.create(notificationData);
    }
    async createForRejectedByBoy(notificationData) {
        notificationData.title = "Order Rejected by delivery boy";
        notificationData.notifyType = notifications_model_1.NotificationType.ORDER_REJECTED_BY_DELIVERY_BOY;
        return await this.notificationModel.create(notificationData);
    }
    async createForProductOutOfStock(productOutOfStockData) {
        return await this.notificationModel.create(productOutOfStockData);
    }
    async deleteNotificationByordrId(orderId) {
        return await this.notificationModel.remove({ orderId: orderId });
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Notification')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notifications.service.js.map