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
let SubCategoryService = class SubCategoryService {
    constructor(subcategoryModel) {
        this.subcategoryModel = subcategoryModel;
    }
    async getAllEnabledSubCategories() {
        return await this.subcategoryModel.find({ status: true }, 'title description categoryId categoryName');
    }
    async getAllSubCategories(page, limit, search) {
        const skip = page * limit;
        let filter = {};
        if (search)
            filter = { title: { $regex: search, $options: 'i' } };
        return await this.subcategoryModel.find(filter, 'title description categoryId categoryName status').limit(limit).skip(skip).sort({ createdAt: 1 });
    }
    async getAllSubCategoriesForImport() {
        return await this.subcategoryModel.find({}, 'title description categoryId categoryName status').sort({ createdAt: 1 });
    }
    async countAllSubCategories(search) {
        let filter = {};
        if (search)
            filter = { title: { $regex: search, $options: 'i' } };
        return await this.subcategoryModel.countDocuments(filter);
    }
    async findSubCategoryByTitle(title, categoryId) {
        return await this.subcategoryModel.findOne({ title: title, categoryId: categoryId }, 'title description categoryId categoryName status');
    }
    async getSubCategoryDetail(subCategoryId) {
        return await this.subcategoryModel.findOne({ _id: subCategoryId }, 'title description categoryId status');
    }
    async findSubCategoryByIdAndCatId(subCategoryId, categoryId) {
        return await this.subcategoryModel.findOne({ _id: subCategoryId, categoryId: categoryId }, 'title ');
    }
    async createSubCategory(subCategoryData) {
        return await this.subcategoryModel.create(subCategoryData);
    }
    async deleteSubCategory(subCategoryId) {
        return await this.subcategoryModel.findByIdAndRemove(subCategoryId);
    }
    async updateSubCategory(subCategoryId, subCategoryData) {
        return await this.subcategoryModel.findByIdAndUpdate(subCategoryId, subCategoryData);
    }
    async updateSubCategoryStatus(subCategoryId, statusData) {
        return await this.subcategoryModel.findByIdAndUpdate(subCategoryId, statusData);
    }
    async updateSubCategortStatusByCategoryId(categoryId, subCategoryStatusData) {
        return await this.subcategoryModel.updateMany({ categoryId: categoryId }, subCategoryStatusData);
    }
    async getDropdownListSubCategory(categoryId) {
        return await this.subcategoryModel.find({ categoryId: categoryId }, 'title status');
    }
    async getDropdownListSubCategoryEnabled(categoryId) {
        return await this.subcategoryModel.find({ categoryId: categoryId, status: true }, 'title');
    }
};
SubCategoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('SubCategory')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubCategoryService);
exports.SubCategoryService = SubCategoryService;
//# sourceMappingURL=sub-categories.service.js.map