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
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const products_service_1 = require("./products.service");
const products_model_1 = require("./products.model");
const users_model_1 = require("../users/users.model");
const users_model_2 = require("../users/users.model");
const users_service_1 = require("../users/users.service");
const util_service_1 = require("../utils/util.service");
const app_model_1 = require("../utils/app.model");
const upload_service_1 = require("../utils/upload.service");
const sub_categories_service_1 = require("../sub-categories/sub-categories.service");
const categories_service_1 = require("../categories/categories.service");
const deals_service_1 = require("../deals/deals.service");
const cart_service_1 = require("../cart/cart.service");
const favourites_service_1 = require("../favourites/favourites.service");
const rating_service_1 = require("../rating/rating.service");
const jwt_strategy_1 = require("../utils/jwt.strategy");
const excel_service_1 = require("../utils/excel.service");
const banner_service_1 = require("../banner/banner.service");
const product_out_of_stock_service_1 = require("../product-out-of-stock/product-out-of-stock.service");
let ProductController = class ProductController {
    constructor(productService, cartService, categoryService, subCategoryService, dealService, bannerService, favouriteService, ratingService, utilService, uploadService, userService, excelService, productOutOfStockService) {
        this.productService = productService;
        this.cartService = cartService;
        this.categoryService = categoryService;
        this.subCategoryService = subCategoryService;
        this.dealService = dealService;
        this.bannerService = bannerService;
        this.favouriteService = favouriteService;
        this.ratingService = ratingService;
        this.utilService = utilService;
        this.uploadService = uploadService;
        this.userService = userService;
        this.excelService = excelService;
        this.productOutOfStockService = productOutOfStockService;
    }
    async homePage(user, userQuery) {
        try {
            let pagination = this.utilService.getUserPagination(userQuery);
            const list = await Promise.all([
                this.productService.GetProductsForUser(pagination.page, pagination.limit - 6),
                this.categoryService.getCategoryListForHome(8),
                this.dealService.dealOfTheDayForHome(4),
                this.dealService.topDealsForHome(4)
            ]);
            let products = list[0];
            if (user && user._id) {
                let cart = await this.cartService.getCartByUserId(user._id);
                products = await this.productService.addCartInProduct(cart, products);
            }
            return this.utilService.successResponseData({ products: products, categories: list[1], dealsOfDay: list[2], topDeals: list[3] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async productList(user, userQuery) {
        try {
            let pagination = this.utilService.getUserPagination(userQuery);
            const list = await Promise.all([
                await this.productService.GetProductsForUser(pagination.page, pagination.limit),
                this.productService.countAllProductForUser()
            ]);
            let products = list[0];
            if (user && user._id) {
                let cart = await this.cartService.getCartByUserId(user._id);
                products = await this.productService.addCartInProduct(cart, products);
            }
            return this.utilService.successResponseData(products, { total: list[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getRelatedProducts() {
        try {
            const products = await this.productService.GetProductsForUser(0, 5);
            return this.utilService.successResponseData(products);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getProductDetail(user, productId) {
        try {
            let product = await this.productService.getProductDetailForUser(productId);
            if (product) {
                if (user && user._id) {
                    let products = [product];
                    const list = await Promise.all([
                        this.cartService.getCartByUserId(user._id),
                        this.favouriteService.getAllFavourite(user._id)
                    ]);
                    let cart = list[0];
                    let favourite = list[1];
                    products = await this.productService.addCartInProduct(cart, products);
                    product = JSON.parse(JSON.stringify(products[0]));
                    product['isFavourite'] = false;
                    if (favourite) {
                        const index = favourite.productId.findIndex(p => p === productId);
                        if (index > -1)
                            product.isFavourite = true;
                    }
                }
                return this.utilService.successResponseData(product);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async searchProduct(user, q, userQuery) {
        try {
            q = q || '*';
            let pagination = this.utilService.getUserPagination(userQuery);
            let products = await this.productService.searchProduct(q, pagination.page, pagination.limit);
            if (user && user._id) {
                let cart = await this.cartService.getCartByUserId(user._id);
                products = await this.productService.addCartInProduct(cart, products);
            }
            return this.utilService.successResponseData(products);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getProductsByCategory(user, categoryId, userQuery) {
        try {
            let pagination = this.utilService.getUserPagination(userQuery);
            const list = await Promise.all([
                this.productService.getProductByCategoryId(categoryId, pagination.page, pagination.limit),
                this.subCategoryService.getDropdownListSubCategoryEnabled(categoryId),
                this.productService.countProductByCategoryId(categoryId)
            ]);
            let products = list[0];
            if (user && user._id) {
                let cart = await this.cartService.getCartByUserId(user._id);
                products = await this.productService.addCartInProduct(cart, products);
            }
            return this.utilService.successResponseData({ products: products, subCategories: list[1] }, { total: list[2] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getProductsBySubCategory(user, subCategoryId, userQuery) {
        try {
            let pagination = this.utilService.getUserPagination(userQuery);
            const list = await Promise.all([
                this.productService.getProductsBySubCategory(subCategoryId, pagination.page, pagination.limit),
                this.productService.countProductBySubCategoryId(subCategoryId)
            ]);
            let products = list[0];
            if (user && user._id) {
                let cart = await this.cartService.getCartByUserId(user._id);
                products = await this.productService.addCartInProduct(cart, products);
            }
            return this.utilService.successResponseData(products, { total: list[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAllProduct(user, query) {
        this.utilService.validateAdminRole(user);
        try {
            const page = Number(query.page) || app_model_1.AdminSettings.DEFAULT_PAGE_NUMBER;
            const limit = Number(query.limit) || app_model_1.AdminSettings.DEFAULT_PAGE_LIMIT;
            let productFilter = {};
            if (query.categoryId)
                productFilter["categoryId"] = query.categoryId;
            if (query.subCategoryId)
                productFilter["subCategoryId"] = query.subCategoryId;
            const products = await Promise.all([
                this.productService.getAllProduct(productFilter, page - 1, limit),
                this.productService.countAllProduct()
            ]);
            return this.utilService.successResponseData(products[0], { total: products[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getDropdownListProduct(user) {
        this.utilService.validateAdminRole(user);
        try {
            const products = await this.productService.getDropdownListProduct();
            return this.utilService.successResponseData(products);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAdminProductDetail(user, productId) {
        this.utilService.validateAdminRole(user);
        try {
            const product = await this.productService.getProductDetail(productId);
            if (product)
                return this.utilService.successResponseData(product);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAdminAllProductByCategory(user, categoryId, query) {
        this.utilService.validateAdminRole(user);
        try {
            const page = Number(query.page) || app_model_1.AdminSettings.DEFAULT_PAGE_NUMBER;
            const limit = Number(query.limit) || app_model_1.AdminSettings.DEFAULT_PAGE_LIMIT;
            const products = await Promise.all([
                this.productService.getAllProductByCategory(categoryId, page - 1, limit),
                this.productService.countAllProductByCategory(categoryId)
            ]);
            return this.utilService.successResponseData(products[0], { total: products[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAdminAllProductBySubCategory(user, subCategoryId, query) {
        this.utilService.validateAdminRole(user);
        try {
            const page = Number(query.page) || app_model_1.AdminSettings.DEFAULT_PAGE_NUMBER;
            const limit = Number(query.limit) || app_model_1.AdminSettings.DEFAULT_PAGE_LIMIT;
            const products = await Promise.all([
                this.productService.getAllProductBySubCategory(subCategoryId, page - 1, limit),
                this.productService.countAllProductBySubCategory(subCategoryId)
            ]);
            return this.utilService.successResponseData(products[0], { total: products[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async createProduct(user, productData) {
        this.utilService.validateAdminRole(user);
        try {
            const productExist = await this.productService.findProductByTitle(productData.title);
            if (productExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_ALREADY_EXIST);
            const category = await this.categoryService.getCategorieDetail(productData.categoryId);
            if (!category)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
            productData.categoryName = category.title;
            if (productData.subCategoryId) {
                const subCategory = await this.subCategoryService.findSubCategoryByIdAndCatId(productData.subCategoryId, productData.categoryId);
                if (!subCategory)
                    this.utilService.badRequest(app_model_1.ResponseMessage.SUB_CATEGORY_NOT_FOUND);
                productData.subCategoryName = subCategory.title;
            }
            else
                productData.subCategoryName = null;
            if (!productData.keyWords) {
                productData.keyWords = productData.title;
            }
            const product = await this.productService.createProduct(productData);
            if (product)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.PRODUCT_SAVED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateProduct(user, productId, productData) {
        this.utilService.validateAdminRole(user);
        try {
            const productExist = await this.productService.getProductDetail(productId);
            if (!productExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
            const category = await this.categoryService.getCategorieDetail(productData.categoryId);
            if (!category)
                this.utilService.badRequest(app_model_1.ResponseMessage.CATEGORY_NOT_FOUND);
            productData.categoryName = category.title;
            if (productData.subCategoryId) {
                const subCategory = await this.subCategoryService.findSubCategoryByIdAndCatId(productData.subCategoryId, productData.categoryId);
                if (!subCategory)
                    this.utilService.badRequest(app_model_1.ResponseMessage.SUB_CATEGORY_NOT_FOUND);
                productData.subCategoryName = subCategory.title;
            }
            else
                productData.subCategoryName = null;
            const product = await this.productService.updateProduct(productId, productData);
            this.productOutOfStockService.deleteOutOfStock(productId);
            if (product)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.PRODUCT_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateProductStatus(user, productId, productStatusData) {
        this.utilService.validateAdminRole(user);
        try {
            const productExist = await this.productService.getProductDetail(productId);
            if (!productExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
            const product = await this.productService.updateProductStatus(productId, productStatusData);
            if (product)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.PRODUCT_STATUS_UPDATED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteProduct(user, productId) {
        this.utilService.validateAdminRole(user);
        try {
            const productExist = await this.productService.getProductDetail(productId);
            if (!productExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
            const banners = await this.bannerService.countBannerByProductId(productId);
            if (banners)
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_DELETED_HAVE_BANNER);
            const deals = await this.dealService.countDealByProductId(productId);
            if (deals)
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_DELETED_HAVE_DEAL);
            const product = await this.productService.deleteProduct(productId);
            if (product)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.PRODUCT_DELETED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async productImageUpload(user, file, image) {
        this.utilService.validateAdminRole(user);
        try {
            const uploadedImage = await this.uploadService.uploadImage(file, image.type);
            if (uploadedImage.url)
                return this.utilService.successResponseData(uploadedImage);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async productImagesUpload(user, file, image) {
        this.utilService.validateAdminRole(user);
        try {
            const uploadedImage = await this.uploadService.uploadImages(file, image.type);
            if (uploadedImage.length > 0)
                return this.utilService.successResponseData(uploadedImage);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async excelExports(user) {
        this.utilService.validateAdminRole(user);
        try {
            const count = await this.productService.countAllProduct();
            if (!count)
                this.utilService.badRequest(app_model_1.ResponseMessage.PRODUCT_NOT_FOUND);
            const categories = await this.subCategoryService.getAllSubCategoriesForImport();
            const categoriesWithNoSubCat = await this.categoryService.getAllCategoriesWithNoSubCategories();
            const products = await this.productService.getAllProductForExport(0, count);
            this.excelService.exportProducts(products, categories, categoriesWithNoSubCat, user._id, this.userService);
            let obj = { productExportedFile: { url: null, status: "Processing", publicId: null } };
            const response = await this.userService.updateMyInfo(user._id, obj);
            if (response)
                return this.utilService.successResponseData(obj);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getExportFile(user) {
        this.utilService.validateAdminRole(user);
        try {
            const userInfo = await this.userService.getExportedFileInfo(user._id);
            if (userInfo)
                return this.utilService.successResponseData(userInfo);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async excelImportTemplate(user) {
        this.utilService.validateAdminRole(user);
        try {
            const categories = await this.subCategoryService.getAllEnabledSubCategories();
            const categoriesWithNoSubCat = await this.categoryService.getAllCategoriesWithNoSubCategories();
            const response = await this.excelService.createImportTemplate(categories, categoriesWithNoSubCat);
            if (response)
                return this.utilService.successResponseData(response);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async importProducts(file) {
        try {
            if (file.mimetype !== 'text/csv' && file.mimetype !== 'application/vnd.ms-excel' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                this.utilService.badRequest(app_model_1.ResponseMessage.FILE_TYPE_ERROR);
            }
            const categories = await this.subCategoryService.getAllSubCategoriesForImport();
            const categoriesWithNoSubCat = await this.categoryService.getAllCategoriesWithNoSubCategories();
            let { existProducts, newProducts } = await this.excelService.importProducts(file, categories, categoriesWithNoSubCat);
            for (let key in existProducts) {
                console.log("-----------key-------", key);
                console.log("--------------products----------", existProducts[key]);
                let product = existProducts[key];
                for (let i = 0; i < product.productImages.length; i++) {
                    let item = product.productImages[i];
                    let pathArray = item.imageUrl.split('/');
                    let protocol = pathArray[0];
                    let host = pathArray[2];
                    let url = protocol + '//' + host + '/' + pathArray[3] + '/';
                    if (process.env.IMAGEKIT_URL !== url) {
                        let fileName = Date.now() + '_original_' + i + '_' + product.title;
                        if (host === 'www.dropbox.com') {
                            let firstPart = item.imageUrl.split("=")[0];
                            item.imageUrl = firstPart + '=1';
                        }
                        let result = await this.uploadService.uploadBase64(item.imageUrl, fileName);
                        existProducts[key].productImages[i].imageId = result.key;
                        existProducts[key].productImages[i].filePath = result.filePath;
                        existProducts[key].productImages[i].imageUrl = `${process.env.IMAGEKIT_URL}tr:dpr-auto,tr:w-auto${result.filePath}`;
                    }
                    else {
                        existProducts[key].productImages[i].filePath = pathArray[5];
                    }
                    console.log("--------------products----------", existProducts[key]);
                    if (key !== 'Product Id')
                        await this.productService.updateProductByImport(key, existProducts[key]);
                }
            }
            if (newProducts && newProducts.length > 0) {
                for (let key in newProducts) {
                    console.log("-----------key-------", key);
                    console.log("-------------- new products----------", newProducts[key]);
                    let product = newProducts[key];
                    for (let i = 0; i < product.productImages.length; i++) {
                        let item = product.productImages[i];
                        let pathArray = item.imageUrl.split('/');
                        let protocol = pathArray[0];
                        let host = pathArray[2];
                        let url = protocol + '//' + host + '/' + pathArray[3] + '/';
                        if (process.env.IMAGEKIT_URL !== url) {
                            let fileName = Date.now() + '_original_' + i + '_' + product.title;
                            if (host === 'www.dropbox.com') {
                                let firstPart = item.imageUrl.split("=")[0];
                                item.imageUrl = firstPart + '=1';
                            }
                            let result = await this.uploadService.uploadBase64(item.imageUrl, fileName);
                            newProducts[key].productImages[i].imageId = result.key;
                            newProducts[key].productImages[i].filePath = result.filePath;
                            newProducts[key].productImages[i].imageUrl = `${process.env.IMAGEKIT_URL}tr:dpr-auto,tr:w-auto${result.filePath}`;
                        }
                        else {
                            newProducts[key].productImages[i].filePath = pathArray[5];
                        }
                        console.log("--------------new products----------", newProducts[key]);
                    }
                }
                await this.productService.addProductByImport(newProducts);
            }
            return this.utilService.successResponseMsg(app_model_1.ResponseMessage.PRODUCT_IMPORTED_SUCCESSFULLY);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async productExportsDelete(user, key) {
        this.utilService.validateAdminRole(user);
        try {
            await this.uploadService.deleteImage(key);
            let obj = { productExportedFile: { url: null, status: "Processing", publicId: null } };
            const response = await this.userService.updateMyInfo(user._id, obj);
            return this.utilService.successResponseMsg({ status: true });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAdminAllProductByCategoryPos(user, categoryId, query) {
        this.utilService.validateAdminRole(user);
        try {
            const page = Number(query.page) || app_model_1.AdminSettings.DEFAULT_PAGE_NUMBER;
            const limit = Number(query.limit) || app_model_1.AdminSettings.DEFAULT_PAGE_LIMIT;
            const products = await Promise.all([
                this.productService.getAllProductByCategoryForPos(categoryId, page - 1, limit),
                this.productService.countAllProductByCategory(categoryId)
            ]);
            return this.utilService.successResponseData(products[0], { total: products[1] });
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async searchAdminProduct(user, q, userQuery) {
        try {
            this.utilService.validateAdminRole(user);
            q = q || '*';
            let pagination = this.utilService.getUserPagination(userQuery);
            let products = await this.productService.searchProduct(q, pagination.page, pagination.limit);
            return this.utilService.successResponseData(products);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/home'),
    swagger_1.ApiOperation({ title: 'Get deals, categories and products for home page for user' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return deals, categories and products for user', type: products_model_1.ProductResponseDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(jwt_strategy_1.OptionalJwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.UserQuery]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "homePage", null);
__decorate([
    common_1.Get('/list'),
    swagger_1.ApiOperation({ title: 'Get all enabled product fo user' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of enabled product fo user', type: products_model_1.ProductsResponsePaginationDTO }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(jwt_strategy_1.OptionalJwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, app_model_1.UserQuery]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productList", null);
__decorate([
    common_1.Get('/related'),
    swagger_1.ApiOperation({ title: 'Get all releted product fo user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of releted product fo user' }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(jwt_strategy_1.OptionalJwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getRelatedProducts", null);
__decorate([
    common_1.Get('/detail/:productId'),
    swagger_1.ApiOperation({ title: 'Get product detail by productId for user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return product detail by productId for user', type: products_model_1.ProductDetailsByIdDTO }),
    swagger_1.ApiResponse({ status: 200, description: 'Return product detail by productId for user' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(jwt_strategy_1.OptionalJwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductDetail", null);
__decorate([
    common_1.Get('/search'),
    swagger_1.ApiOperation({ title: 'Seatch product by product title' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product', type: products_model_1.ProductResponseUserDTO }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(jwt_strategy_1.OptionalJwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query('q')), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, app_model_1.UserQuery]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "searchProduct", null);
__decorate([
    common_1.Get('/category/:categoryId'),
    swagger_1.ApiOperation({ title: 'Get all product by category for user' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product by category for user', type: products_model_1.ResponseCategoryByIdProductDTOPagenation }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product by category for user' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(jwt_strategy_1.OptionalJwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('categoryId')), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, app_model_1.UserQuery]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsByCategory", null);
__decorate([
    common_1.Get('/sub-category/:subCategoryId'),
    swagger_1.ApiOperation({ title: 'Get all product by sub-category for user' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product by sub-category for user', type: products_model_1.ProductsResponseBySubCategoryIdPagination }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product by sub-category for user' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(jwt_strategy_1.OptionalJwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('subCategoryId')), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, app_model_1.UserQuery]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsBySubCategory", null);
__decorate([
    common_1.Get('/admin/list'),
    swagger_1.ApiOperation({ title: 'Get all product' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product', type: products_model_1.ProductsAdminResponse }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, products_model_1.ProductFilterQuery]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProduct", null);
__decorate([
    common_1.Get('/admin/dropdown-list'),
    swagger_1.ApiOperation({ title: 'Get all enabled product for dropdown' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of enabled product for dropdown', type: products_model_1.ProductsDropDownResponse }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getDropdownListProduct", null);
__decorate([
    common_1.Get('/admin/detail/:productId'),
    swagger_1.ApiOperation({ title: 'Get product detail by productId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return product detail by productId', type: products_model_1.ResponseProductsDetailsDTO }),
    swagger_1.ApiResponse({ status: 200, description: 'Return product detail by productId' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAdminProductDetail", null);
__decorate([
    common_1.Get('/admin/category/:categoryId'),
    swagger_1.ApiOperation({ title: 'Get all product by category' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product by category', type: products_model_1.ResponseCategoryAndProductDTOPagenation }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('categoryId')), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, products_model_1.ProductFilterQuery]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAdminAllProductByCategory", null);
__decorate([
    common_1.Get('/admin/sub-category/:subCategoryId'),
    swagger_1.ApiOperation({ title: 'Get all product by sub-category' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product by sub-category', type: products_model_1.ResponseCategoryAndProductDTOPagenation }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product by sub-category' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('subCategoryId')), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, products_model_1.ProductFilterQuery]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAdminAllProductBySubCategory", null);
__decorate([
    common_1.Post('/admin/create'),
    swagger_1.ApiOperation({ title: 'Create product' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, products_model_1.ProductsSaveDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    common_1.Put('/admin/update/:productId'),
    swagger_1.ApiOperation({ title: 'Update product by productId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('productId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, products_model_1.ProductsSaveDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    common_1.Put('/admin/status-update/:productId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('productId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, products_model_1.PuductStatusDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductStatus", null);
__decorate([
    common_1.Delete('/admin/delete/:productId'),
    swagger_1.ApiOperation({ title: 'Delete product by productId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    common_1.Post('/admin/upload/image'),
    swagger_1.ApiOperation({ title: 'Product image upload' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return image detail', type: app_model_1.UploadImageResponseDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiImplicitFile({ name: 'file', required: true, description: 'Product image upload' }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.UploadedFile()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, Object, app_model_1.UploadImageDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productImageUpload", null);
__decorate([
    common_1.Post('/admin/upload/images'),
    swagger_1.ApiOperation({ title: 'Product images upload' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return  array of image details', type: app_model_1.UploadImagesResponseDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('file', 8)),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiImplicitFile({ name: 'file', required: true, description: 'Product image upload' }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.UploadedFiles()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, Object, app_model_1.UploadImageDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productImagesUpload", null);
__decorate([
    common_1.Get('/admin/exports'),
    swagger_1.ApiOperation({ title: 'Export all products as xlsx file' }),
    swagger_1.ApiResponse({ status: 200, description: 'Export all products as xlsx file', type: users_model_2.ExportedFileDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "excelExports", null);
__decorate([
    common_1.Get('/admin/exports/download'),
    swagger_1.ApiOperation({ title: 'Start converting all product data to xlsx file' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return imagekit file detail', type: users_model_2.ExportedFileDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getExportFile", null);
__decorate([
    common_1.Get('/admin/imports/template'),
    swagger_1.ApiOperation({ title: 'Export all products as xlsx file' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return imagekit file detail', type: users_model_2.ExportedFileDTO }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "excelImportTemplate", null);
__decorate([
    common_1.Post('/admin/imports'),
    swagger_1.ApiOperation({ title: 'Product iimports' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiImplicitFile({ name: 'file', required: true, description: 'Only xlsx file accepted' }),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "importProducts", null);
__decorate([
    common_1.Delete('/admin/exports/:key'),
    swagger_1.ApiOperation({ title: 'Delete exports file' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productExportsDelete", null);
__decorate([
    common_1.Get('/admin/pos-category/:categoryId'),
    swagger_1.ApiOperation({ title: 'Get all product by category for pos' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product by category', type: products_model_1.ResponseCategoryAndProductDTOPagenation }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('categoryId')), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, products_model_1.ProductFilterQuery]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAdminAllProductByCategoryPos", null);
__decorate([
    common_1.Get('/admin/search'),
    swagger_1.ApiOperation({ title: 'Seatch product by product title' }),
    swagger_1.ApiImplicitQuery({ name: "page", description: "page", required: false, type: Number }),
    swagger_1.ApiImplicitQuery({ name: "limit", description: "limit", required: false, type: Number }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product', type: products_model_1.ProductResponseUserDTO }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of product' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    common_1.UseGuards(jwt_strategy_1.OptionalJwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Query('q')), __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, app_model_1.UserQuery]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "searchAdminProduct", null);
ProductController = __decorate([
    common_1.Controller('products'),
    swagger_1.ApiUseTags('Products'),
    __metadata("design:paramtypes", [products_service_1.ProductService,
        cart_service_1.CartService,
        categories_service_1.CategoryService,
        sub_categories_service_1.SubCategoryService,
        deals_service_1.DealService,
        banner_service_1.BannerService,
        favourites_service_1.FavouriteService,
        rating_service_1.RatingService,
        util_service_1.UtilService,
        upload_service_1.UploadService,
        users_service_1.UserService,
        excel_service_1.ExcelService,
        product_out_of_stock_service_1.ProductOutOfStockService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=products.controller.js.map