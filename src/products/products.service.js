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
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async GetProductsForUser(page, limit) {
        const skip = page * limit;
        let products = await this.productModel.find({ status: true }, 'title filePath imageUrl productImages isDealAvailable dealPercent categoryName variant averageRating productImages').limit(limit).skip(skip).sort({ createdAt: -1 });
        return products;
    }
    async countAllProductForUser() {
        const products = await this.productModel.countDocuments({ status: true });
        return products;
    }
    async searchProduct(searchKey, page, limit) {
        const skip = page * limit;
        searchKey = searchKey.trim();
        let filter = { status: true };
        let response = await this.productModel.aggregate([
            {
                $search: {
                    "autocomplete": {
                        "query": searchKey,
                        "path": "keyWords"
                    }
                }
            },
            { $match: filter },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $project: {
                    "_id": 1,
                    "title": 1,
                    "filePath": 1,
                    "imageUrl": 1,
                    "isDealAvailable": 1,
                    "dealPercent": 1,
                    "categoryName": 1,
                    "variant": 1,
                    "averageRating": 1,
                    "productImages": 1
                }
            }
        ]);
        return response;
    }
    async getAllProduct(productFilter, page, limit) {
        const skip = page * limit;
        const products = await this.productModel.find(productFilter, 'title categoryName subCategoryName isDealAvailable dealPercent status imageUrl productImages').limit(limit).skip(skip);
        return products;
    }
    async countAllProduct() {
        const products = await this.productModel.countDocuments({});
        return products;
    }
    async getAllProductByCategory(categoryId, page, limit) {
        const skip = page * limit;
        const products = await this.productModel.find({ categoryId: categoryId }, 'title categoryName subCategoryName isDealAvailable dealPercent status imageUrl productImages').limit(limit).skip(skip);
        return products;
    }
    async countAllProductByCategory(categoryId) {
        const products = await this.productModel.countDocuments({ categoryId: categoryId });
        return products;
    }
    async getAllProductBySubCategory(subCategoryId, page, limit) {
        const skip = page * limit;
        const products = await this.productModel.find({ subCategoryId: subCategoryId }, 'title categoryName subCategoryName isDealAvailable dealPercent status imageUrl productImages').limit(limit).skip(skip);
        return products;
    }
    async countAllProductBySubCategory(subCategoryId) {
        const products = await this.productModel.countDocuments({ subCategoryId: subCategoryId });
        return products;
    }
    async getDropdownListProduct() {
        const products = await this.productModel.find({}, 'title status isDealAvailable dealId');
        return products;
    }
    async findProductByTitle(title) {
        const response = await this.productModel.findOne({ title: title });
        return response;
    }
    async getProductDetail(productId) {
        const product = await this.productModel.findById(productId);
        return product;
    }
    async getProductDetailForUser(productId) {
        const product = await this.productModel.findById(productId, 'title description sku filePath imageUrl productImages isDealAvailable dealPercent categoryId categoryName subCategoryId subCategoryName variant averageRating totalRating noOfUsersRated keyWords');
        return product;
    }
    async createProduct(productData) {
        const product = await this.productModel.create(productData);
        return product;
    }
    async updateProduct(productId, productData) {
        const product = await this.productModel.findByIdAndUpdate(productId, productData, { new: true });
        return product;
    }
    async updateProductStatus(productId, productStatusData) {
        const product = await this.productModel.findByIdAndUpdate(productId, productStatusData, { new: true });
        return product;
    }
    async deleteProduct(productId) {
        const response = await this.productModel.findByIdAndRemove(productId);
        return response;
    }
    async getDealProductByIds(productIds, page, limit) {
        const skip = page * limit;
        const products = await this.productModel.find({ _id: { $in: productIds } }, 'title description status sku filePath imageUrl productImages isDealAvailable dealPercent variant averageRating').limit(limit).skip(skip);
        return products;
    }
    async getProductByIds(productIds) {
        const products = await this.productModel.find({ _id: { $in: productIds } }, 'title description status sku filePath imageUrl productImages isDealAvailable dealPercent variant averageRating');
        return products;
    }
    async countProductByCategoryId(categoryId) {
        const count = await this.productModel.countDocuments({ categoryId: categoryId });
        return count;
    }
    async countProductBySubCategoryId(subCategoryId) {
        const count = await this.productModel.countDocuments({ subCategoryId: subCategoryId });
        return count;
    }
    async updateProductStatusByCategoryId(categoryId, productStatusData) {
        const products = await this.productModel.updateMany({ categoryId: categoryId }, productStatusData);
        return products;
    }
    async addCartInProduct(cartData, products) {
        if (!cartData)
            return products;
        for (let item of cartData.products) {
            let unit = item.unit;
            let quantity = item.quantity;
            const productIndex = products.findIndex(val => val._id.toString() == item.productId);
            if (productIndex !== -1) {
                let obj = JSON.parse(JSON.stringify(products[productIndex]));
                if (obj && obj.variant.length > 1) {
                    const unitIndex = obj.variant.findIndex(val => val.unit == unit);
                    if (unitIndex !== -1) {
                        var temp = obj.variant[unitIndex];
                        obj.variant[unitIndex] = obj.variant[0];
                        obj.variant[0] = temp;
                        obj.unitInCart = unit;
                    }
                }
                obj.quantityToCart = quantity;
                obj.isAddedToCart = true;
                products.splice(productIndex, 1, obj);
            }
        }
        return products;
    }
    async updateDealByCategoryId(categoryId, dealData) {
        const products = await this.productModel.updateMany({ categoryId: categoryId }, dealData);
        return products;
    }
    async updateDealById(productId, dealData) {
        const products = await this.productModel.updateOne({ _id: productId }, dealData);
        return products;
    }
    async updateProductStock(productId, variantData) {
        const products = await this.productModel.updateOne({ _id: productId }, { variant: variantData });
        return products;
    }
    async findProductStock(productId, unit) {
        const products = await this.productModel.findOne({ _id: productId });
        return products;
    }
    async updateRating(productId, ratingData) {
        const products = await this.productModel.updateOne({ _id: productId }, ratingData);
        return products;
    }
    async getAllProductForExport(page, limit) {
        const skip = page * limit;
        let products = await this.productModel.find({ status: true }, 'title description imageUrl productImages categoryId subCategoryId variant keyWords').limit(limit).skip(skip).sort({ createdAt: -1 });
        return products;
    }
    async updateProductByImport(productId, productData) {
        console.log("-----------productupfate data--------------", productData);
        const product = await this.productModel.updateOne({ _id: productId }, productData, { new: true });
        console.log("-------------product-----------", product);
        return product;
    }
    async addProductByImport(productData) {
        const product = await this.productModel.insertMany(productData);
        return product;
    }
    async getAllProductByCategoryForPos(categoryId, page, limit) {
        const skip = page * limit;
        const products = await this.productModel.find({ categoryId: categoryId }).limit(limit).skip(skip);
        return products;
    }
    async getProductByCategoryId(categoryId, page, limit) {
        const skip = page * limit;
        let products = await this.productModel.find({ categoryId: categoryId, status: true }, 'title imageUrl productImages filePath category isDealAvailable dealPercent variant averageRating').limit(limit).skip(skip)
            .sort({ createdAt: -1 });
        return products;
    }
    async getProductsBySubCategory(subCategoryId, page, limit) {
        const skip = page * limit;
        let response = await this.productModel.find({ subCategoryId: subCategoryId, status: true }, 'title imageUrl productImages filePath category subcategory isDealAvailable dealPercent variant averageRating').limit(limit).skip(skip)
            .sort({ createdAt: -1 });
        return response;
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=products.service.js.map