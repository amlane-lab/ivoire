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
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ChatSenyByType;
(function (ChatSenyByType) {
    ChatSenyByType["USER"] = "USER";
    ChatSenyByType["STORE"] = "STORE";
})(ChatSenyByType = exports.ChatSenyByType || (exports.ChatSenyByType = {}));
exports.ChatSchema = new mongoose.Schema({
    userId: { type: String },
    userName: { type: String },
    storeId: { type: String },
    message: { type: String },
    sentBy: { type: ChatSenyByType },
}, {
    timestamps: true
});
class ChatSaveDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ChatSaveDTO.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ChatSaveDTO.prototype, "userName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ChatSaveDTO.prototype, "storeId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ChatSaveDTO.prototype, "message", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ChatSaveDTO.prototype, "sentBy", void 0);
exports.ChatSaveDTO = ChatSaveDTO;
class ChatDTO extends ChatSaveDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ChatDTO.prototype, "updatedAt", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ChatDTO.prototype, "sentBy", void 0);
exports.ChatDTO = ChatDTO;
//# sourceMappingURL=chat.model.js.map