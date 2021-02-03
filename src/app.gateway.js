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
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat/chat.service");
const chat_model_1 = require("./chat/chat.model");
let AppGateway = class AppGateway {
    constructor(chatService) {
        this.chatService = chatService;
        this.logger = new common_1.Logger();
    }
    handleConnection(client, ...args) {
        this.logger.log('CLIENT CONNECTED');
        console.log('Client info', client.id);
    }
    handleDisconnect(client) {
        this.logger.log('CLIENT DISCONNECTED');
        console.log('CLIENT info', client.id);
    }
    afterInit(server) {
        this.logger.log('WEBSOCKET GATWEAY INITIALIZED');
    }
    async messageUserToStore(chatData) {
        chatData.sentBy = 'USER';
        const res = await this.chatService.saveChat(chatData);
        this.server.emit(`message-store`, chatData);
    }
    async messageStoreToUser(chatData) {
        chatData.sentBy = 'STORE';
        const res = await this.chatService.saveChat(chatData);
        this.server.emit(`message-user-${chatData.userId}`, chatData);
        this.server.emit(`message-store`, res);
    }
    sendOrderStatusNotificationToAdmin(orderData) {
        this.server.emit(`order-status-update`, orderData);
    }
    newOrderForDeliveryBoy(orderData) {
        this.server.emit(`new-order-delivery-boy-${orderData.deliveryBoyId}`, orderData);
    }
    sendProductOutOfStocksNotificationToAdmin(productOutOfStockData) {
        this.server.emit('products-out-of-stock');
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], AppGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('message-user-to-store'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_model_1.ChatSaveDTO]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "messageUserToStore", null);
__decorate([
    websockets_1.SubscribeMessage('message-store-to-user'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_model_1.ChatSaveDTO]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "messageStoreToUser", null);
AppGateway = __decorate([
    common_1.Injectable(),
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map