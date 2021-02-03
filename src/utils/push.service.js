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
const common_1 = require("@nestjs/common");
const request = require('request');
let PushService = class PushService {
    constructor() {
        this.appId = null;
        this.secretKey = null;
        if (!(process.env.ONE_SIGNAL_APP_ID_USER && process.env.ONE_SIGNAL_SECRET_KEY_USER))
            console.log("ONE_SIGNAL_APP_ID_USER or ONE_SIGNAL_SECRET_KEY_USER not set.");
        if (!(process.env.ONE_SIGNAL_APP_ID_DELIVERY && process.env.ONE_SIGNAL_SECRET_KEY_DELIVERY))
            console.log("ONE_SIGNAL_APP_ID_DELIVERY or ONE_SIGNAL_SECRET_KEY_DELIVERY not set.");
    }
    async sendNotificationToUser(playerId, title, message, isAll = false) {
        this.appId = process.env.ONE_SIGNAL_APP_ID_USER;
        this.secretKey = process.env.ONE_SIGNAL_SECRET_KEY_USER;
        return await this.sendNotification(playerId, title, message, isAll);
    }
    async sendNotificationToDeliveryBoy(playerId, title, message) {
        this.appId = process.env.ONE_SIGNAL_APP_ID_DELIVERY;
        this.secretKey = process.env.ONE_SIGNAL_SECRET_KEY_DELIVERY;
        return await this.sendNotification(playerId, title, message);
    }
    async sendNotification(playerId, title, message, isAll = false) {
        return new Promise((resolve, reject) => {
            let body = {
                'app_id': this.appId,
                'contents': { en: message },
                'headings': { en: title }
            };
            if (isAll)
                body['included_segments'] = ["Subscribed Users"];
            else
                body['include_player_ids'] = Array.isArray(playerId) ? playerId : [playerId];
            return request({
                method: 'POST',
                uri: 'https://onesignal.com/api/v1/notifications',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this.secretKey
                },
                json: true,
                body: body
            }, function (error, response, body) {
                if (body) {
                    console.log(body);
                    resolve(true);
                }
                else {
                    console.error('Error:', error);
                    reject(false);
                }
            });
        });
    }
};
PushService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], PushService);
exports.PushService = PushService;
//# sourceMappingURL=push.service.js.map