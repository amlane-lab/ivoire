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
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async getAllEnabledCategories() {
        const categories = await this.categoryModel.find({ status: true }, 'title filePath imageUrl description').sort({ createdAt: 1 });
        return categories;
    }
    async getCategoryListForHome(limit) {
        limit = limit || 10;
        const categories = await this.categoryModel.find({ status: true }, 'title filePath imageUrl').limit(limit).sort({ createdAt: 1 });
        return categories;
    }
    async getAllCategories(page, limit, search) {
        const skip = page * limit;
        let filter = {};
        if (search)
            filter = { title: { $regex: search, $options: 'i' } };
        return await this.categoryModel.find(filter, 'title subCategoryCount imageUrl status isDealAvailable dealPercent').limit(limit).skip(skip).sort({ createdAt: 1 });
    }
    async countAllCategory(search) {
        let filter = {};
        if (search)
            filter = { title: { $regex: search, $options: 'i' } };
        return await this.categoryModel.countDocuments(filter);
    }
    async countActiveCategory() {
        return await this.categoryModel.countDocuments({ status: true });
    }
    async getCategorieDetail(categoryId) {
        const category = await this.categoryModel.findOne({ _id: categoryId }, 'title description imageUrl imageId filePath status isDealAvailable dealPercent subCategoryCount');
        return category;
    }
    async findCategoryByTitle(title) {
        const category = await this.categoryModel.findOne({ title: title }, 'title');
        return category;
    }
    async createCategory(categoryData) {
        const response = await this.categoryModel.create(categoryData);
        return response;
    }
    async updateCategory(categoryId, categoryData) {
        const response = await this.categoryModel.findByIdAndUpdate(categoryId, categoryData);
        return response;
    }
    async deleteCategory(categoryId) {
        const response = await this.categoryModel.findByIdAndRemove(categoryId);
        return response;
    }
    async statusUpdate(categoryId, categoryStatusData) {
        const response = await this.categoryModel.findByIdAndUpdate(categoryId, categoryStatusData);
        return response;
    }
    async increaseSubCategoryCount(categoryId) {
        const category = await this.categoryModel.findByIdAndUpdate(categoryId, { $inc: { subCategoryCount: 1 } });
        return category;
    }
    async descreaseSubCategoryCount(categoryId) {
        const category = await this.categoryModel.findByIdAndUpdate(categoryId, { $inc: { subCategoryCount: -1 } });
        return category;
    }
    async updateDeal(categoryId, dealData) {
        const category = await this.categoryModel.findByIdAndUpdate(categoryId, dealData, { new: true });
        return category;
    }
    async getDropdownListCategory() {
        const products = await this.categoryModel.find({}, 'title status');
        return products;
    }
    async getAllCategoriesWithNoSubCategories() {
        return await this.categoryModel.find({ subCategoryCount: 0 });
    }
    async getCategoryTitle(IDS) {
        return await this.categoryModel.find({ _id: { $in: IDS } }, 'title');
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Category')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=categories.service.js.map