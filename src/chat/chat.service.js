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
const util_service_1 = require("../utils/util.service");
let ChatService = class ChatService {
    constructor(chatModel, utilService) {
        this.chatModel = chatModel;
        this.utilService = utilService;
    }
    async getAllUserChat(userId, page, limit) {
        const skip = (page) * limit;
        const chats = await this.chatModel.find({ userId: userId }, 'userId message sentBy updatedAt').limit(limit).sort({ createdAt: 1 });
        return chats;
    }
    async getAllChatGroup(page, limit) {
        const filter = [
            {
                $group: {
                    "updatedAt": { $last: "$updatedAt" },
                    "_id": "$userId",
                    "lastMessage": { $last: "$message" },
                    "userName": { $last: "$userName" },
                }
            },
            { "$sort": { "createdAt": 1 } },
            { "$limit": limit },
            { "$skip": (page - 1) * limit },
        ];
        const chats = await this.chatModel.aggregate(filter);
        return chats;
    }
    async saveChat(chatData) {
        const chat = await this.chatModel.create(chatData);
        return chat;
    }
};
ChatService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Chat')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        util_service_1.UtilService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map