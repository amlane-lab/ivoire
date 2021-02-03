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
const mongoose = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var NotificationType;
(function (NotificationType) {
    NotificationType["ORDER_PLACED"] = "ORDER_PLACED";
    NotificationType["ORDER_CANCELLED"] = "ORDER_CANCELLED";
    NotificationType["ORDER_ACCEPTED_BY_DELIVERY_BOY"] = "ORDER_ACCEPTED_BY_DELIVERY_BOY";
    NotificationType["ORDER_REJECTED_BY_DELIVERY_BOY"] = "ORDER_REJECTED_BY_DELIVERY_BOY";
    NotificationType["PRODUCT_OUT_OF_STOCK"] = "PRODUCT_OUT_OF_STOCK";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
exports.NotificationSchema = new mongoose.Schema({
    title: { type: String },
    notifyType: { type: NotificationType },
    isRead: { type: Boolean, default: false },
    description: { type: String },
    orderID: { type: Number },
    orderId: { type: String },
    deliveryBoyId: { type: String },
    deliveryBoyName: { type: String },
    productId: { type: String },
    unit: { type: String },
}, {
    timestamps: true
});
class NotificationSaveDTO {
}
exports.NotificationSaveDTO = NotificationSaveDTO;
class NotificationDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], NotificationDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], NotificationDTO.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], NotificationDTO.prototype, "notifyType", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], NotificationDTO.prototype, "orderId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], NotificationDTO.prototype, "orderID", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], NotificationDTO.prototype, "deliveryBoyId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], NotificationDTO.prototype, "deliveryBoyName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], NotificationDTO.prototype, "isRead", void 0);
exports.NotificationDTO = NotificationDTO;
class ResponseNotificationListDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseNotificationListDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", NotificationDTO)
], ResponseNotificationListDTO.prototype, "response_data", void 0);
exports.ResponseNotificationListDTO = ResponseNotificationListDTO;
class SendNotificationDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SendNotificationDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SendNotificationDTO.prototype, "body", void 0);
exports.SendNotificationDTO = SendNotificationDTO;
class readNotificationDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], readNotificationDTO.prototype, "notificationId", void 0);
exports.readNotificationDTO = readNotificationDTO;
//# sourceMappingURL=notifications.model.js.map