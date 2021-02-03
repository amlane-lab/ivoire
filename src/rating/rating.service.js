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
let RatingService = class RatingService {
    constructor(ratingModel) {
        this.ratingModel = ratingModel;
    }
    async getProductRate(userId, productId) {
        return await this.ratingModel.findOne({ userId: userId, productId: productId });
    }
    async saveRating(userId, ratingData) {
        ratingData.userId = userId;
        return await this.ratingModel.create(ratingData);
    }
    async updateRating(userId, productId, rate) {
        return await this.ratingModel.updateOne({ userId: userId, productId: productId }, { rate: rate });
    }
};
RatingService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Rating')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RatingService);
exports.RatingService = RatingService;
//# sourceMappingURL=rating.service.js.map