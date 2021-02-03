import { ProductService } from './products.service';
import { PuductStatusDTO, ProductFilterQuery, ProductsSaveDTO } from './products.model';
import { UsersDTO } from '../users/users.model';
import { UserService } from '../users/users.service';
import { UtilService } from '../utils/util.service';
import { UploadImageDTO, CommonResponseModel, UserQuery } from '../utils/app.model';
import { UploadService } from '../utils/upload.service';
import { SubCategoryService } from '../sub-categories/sub-categories.service';
import { CategoryService } from '../categories/categories.service';
import { DealService } from '../deals/deals.service';
import { CartService } from '../cart/cart.service';
import { FavouriteService } from '../favourites/favourites.service';
import { RatingService } from '../rating/rating.service';
import { ExcelService } from '../utils/excel.service';
import { BannerService } from '../banner/banner.service';
import { ProductOutOfStockService } from '../product-out-of-stock/product-out-of-stock.service';
export declare class ProductController {
    private productService;
    private cartService;
    private categoryService;
    private subCategoryService;
    private dealService;
    private bannerService;
    private favouriteService;
    private ratingService;
    private utilService;
    private uploadService;
    private userService;
    private excelService;
    private productOutOfStockService;
    constructor(productService: ProductService, cartService: CartService, categoryService: CategoryService, subCategoryService: SubCategoryService, dealService: DealService, bannerService: BannerService, favouriteService: FavouriteService, ratingService: RatingService, utilService: UtilService, uploadService: UploadService, userService: UserService, excelService: ExcelService, productOutOfStockService: ProductOutOfStockService);
    homePage(user: UsersDTO, userQuery: UserQuery): Promise<CommonResponseModel>;
    productList(user: UsersDTO, userQuery: UserQuery): Promise<CommonResponseModel>;
    getRelatedProducts(): Promise<CommonResponseModel>;
    getProductDetail(user: UsersDTO, productId: string): Promise<CommonResponseModel>;
    searchProduct(user: UsersDTO, q: string, userQuery: UserQuery): Promise<{
        response_code: any;
        response_data: string;
    }>;
    getProductsByCategory(user: UsersDTO, categoryId: string, userQuery: UserQuery): Promise<CommonResponseModel>;
    getProductsBySubCategory(user: UsersDTO, subCategoryId: string, userQuery: UserQuery): Promise<CommonResponseModel>;
    getAllProduct(user: UsersDTO, query: ProductFilterQuery): Promise<CommonResponseModel>;
    getDropdownListProduct(user: UsersDTO): Promise<CommonResponseModel>;
    getAdminProductDetail(user: UsersDTO, productId: string): Promise<CommonResponseModel>;
    getAdminAllProductByCategory(user: UsersDTO, categoryId: string, query: ProductFilterQuery): Promise<CommonResponseModel>;
    getAdminAllProductBySubCategory(user: UsersDTO, subCategoryId: string, query: ProductFilterQuery): Promise<CommonResponseModel>;
    createProduct(user: UsersDTO, productData: ProductsSaveDTO): Promise<CommonResponseModel>;
    updateProduct(user: UsersDTO, productId: string, productData: ProductsSaveDTO): Promise<CommonResponseModel>;
    updateProductStatus(user: UsersDTO, productId: string, productStatusData: PuductStatusDTO): Promise<CommonResponseModel>;
    deleteProduct(user: UsersDTO, productId: string): Promise<CommonResponseModel>;
    productImageUpload(user: UsersDTO, file: any, image: UploadImageDTO): Promise<CommonResponseModel>;
    productImagesUpload(user: UsersDTO, file: any, image: UploadImageDTO): Promise<{
        response_code: any;
        response_data: string;
    }>;
    excelExports(user: UsersDTO): Promise<{
        response_code: any;
        response_data: string;
    }>;
    getExportFile(user: UsersDTO): Promise<CommonResponseModel>;
    excelImportTemplate(user: UsersDTO): Promise<{
        response_code: any;
        response_data: string;
    }>;
    importProducts(file: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    productExportsDelete(user: UsersDTO, key: string): Promise<CommonResponseModel>;
    getAdminAllProductByCategoryPos(user: UsersDTO, categoryId: string, query: ProductFilterQuery): Promise<CommonResponseModel>;
    searchAdminProduct(user: UsersDTO, q: string, userQuery: UserQuery): Promise<{
        response_code: any;
        response_data: string;
    }>;
}
