import * as mongoose from 'mongoose';
export declare const ProductSchema: mongoose.Schema<any>;
export declare class ProductFilterQuery {
    page?: number;
    limit?: number;
    categoryId?: string;
    subCategoryId?: string;
}
export declare class ProductImagesDTO {
    imageUrl: string;
    imageId: string;
    filePath: string;
}
export declare class VariantDTO {
    productStock: number;
    unit: string;
    price: number;
    enable: boolean;
}
export declare class ProductsSaveDTO {
    title: string;
    sku: string;
    description: string;
    categoryId: string;
    variant: Array<VariantDTO>;
    imageUrl: string;
    filePath: string;
    imageId: string;
    subCategoryId: string;
    productImages: Array<ProductImagesDTO>;
    keyWords: string;
    categoryName: string;
    subCategoryName: string;
}
export declare class ProductsDTO {
    _id: string;
    sku: string;
    title: string;
    description: string;
    price: number;
    userId: string;
    type: String;
    categoryId: string;
    variant: VariantDTO[];
    isDealAvailable: boolean;
    dealPercent: number;
    dealId: string;
    imageUrl: string;
    filePath: string;
    unit: String;
    imageId: string;
    productImages: Array<ProductImagesDTO>;
    subCategoryId: string;
    status: boolean;
    averageRating: number;
    totalRating: number;
    noOfUsersRated: number;
    quantityToCart: number;
    isAddedToCart: boolean;
    categoryName: string;
    subCategoryName: string;
}
export declare class VariantData {
    productStock: Number;
    unit: String;
    price: Number;
    enable: Boolean;
    offerAmount: number;
}
export declare class PuductStatusDTO {
    status: boolean;
}
export declare class DealProductDTO {
    dealPercent: number;
    isDealAvailable: boolean;
    dealId: string;
}
export declare class ProductFilterDTO {
    category: string;
    subCategory: string;
}
export declare class ProductCategoryDTO {
    _id?: string;
    category?: string;
}
export declare class ProductListAdminDTO {
    _id: string;
    title: String;
    imageUrl: String;
    filePath: string;
    status: Boolean;
    isDealAvailable: Boolean;
    dealPercent: Number;
    dealId: string;
    subcategory: string;
    category: string;
}
export declare class ProductTitleListAdminDTO {
    _id: string;
    title: String;
    status: string;
}
export declare class FavourutesResponseDTO {
    _id: string;
    sku: string;
    title: string;
    description: string;
    price: number;
    variant: VariantDTO[];
    isDealAvailable: boolean;
    imageUrl: string;
    filePath: string;
    imageId: string;
    averageRating: number;
}
export declare class ProductListResponseDTO extends PuductStatusDTO {
    _id: string;
    title: String;
    imageUrl: String;
    filePath: string;
    isDealAvailable: Boolean;
    dealPercent: Number;
    variant: VariantDTO[];
    categoryName: string;
    averageRating: number;
    unitInCart: number;
    quantityToCart: boolean;
    categories: [];
    dealsOfDay: [];
    topDeals: [];
}
export declare class ProductResponseDTO {
    response_code: string;
    response_data: ProductListResponseDTO;
}
export declare class ResponseListDTO {
    _id: string;
    title: String;
    imageUrl: String;
    filePath: string;
    isDealAvailable: Boolean;
    dealPercent: Number;
    variant: VariantDTO[];
    categoryName: string;
    averageRating: number;
    unitInCart: number;
    quantityToCart: boolean;
}
export declare class ProductResponseUserDTO {
    response_code: string;
    response_data: ResponseListDTO;
}
export declare class ProductsResponsePaginationDTO extends ProductResponseUserDTO {
    total: number;
}
export declare class ProductsResponseByIdDTO extends ProductsSaveDTO {
    averageRating: number;
    totalRating: number;
    noOfUsersRated: number;
    quantityToCart: number;
    isAddedToCart: boolean;
    categoryName: string;
    subCategoryName: string;
    isFavourite: boolean;
}
export declare class ProductDetailsByIdDTO {
    response_code: string;
    response_data: ProductsResponseByIdDTO;
}
export declare class ProductsDetailsResponseDTO {
    isDealAvailable: boolean;
    averageRating: number;
    _id: string;
    title: string;
    variant: VariantDTO[];
    imageUrl: string;
    filePath: string;
    subCategories: ProductTitleListAdminDTO;
}
export declare class ProductResponseByCategoryIdDTO {
    response_code: string;
    response_data: ProductsDetailsResponseDTO;
}
export declare class ProductResponseBySubCategoryIdDTO {
    response_code: string;
    response_data: ResponseListDTO;
}
export declare class ProductAdminResponseDTO extends PuductStatusDTO {
    isDealAvailable: boolean;
    _id: string;
    title: string;
    imageUrl: string;
    subCategoryName: string;
    dealPercent: number;
    productImages: Array<ProductImagesDTO>;
}
export declare class AdminProdutsResponseDTO {
    response_code: string;
    response_data: ProductAdminResponseDTO;
}
export declare class ProductsAdminResponse extends AdminProdutsResponseDTO {
    tolal: number;
}
export declare class ProductsDropDownResponse {
    response_code: string;
    response_data: ProductTitleListAdminDTO;
}
export declare class ProductsDetalsForAdmin extends ProductListAdminDTO {
    averageRating: string;
    totalRating: number;
    noOfUsersRated: number;
    categoryId: string;
    imageId: string;
    subCategoryId: string;
    categoryName: string;
    subCategoryName: string;
    dealId: string;
    dealPercent: number;
    dealType: string;
    userId: string;
}
export declare class ResponseProductsDetailsDTO {
    response_code: string;
    response_data: ProductsDetalsForAdmin;
}
export declare class ResponseDataForCategoryAndProducts extends PuductStatusDTO {
    isDealAvailable: boolean;
    _id: string;
    title: string;
    imageUrl: string;
    categoryName: string;
    subCategoryName: string;
    dealPercent: number;
    productImages: Array<ProductImagesDTO>;
}
export declare class ResponseCategoryAndProductDTO {
    response_code: string;
    response_data: ResponseDataForCategoryAndProducts;
}
export declare class ResponseCategoryAndProductDTOPagenation extends ResponseCategoryAndProductDTO {
    total: number;
}
export declare class ImportProductDTO {
    id?: string;
    title: string;
    description: string;
    categoryId: string;
    categoryName?: string;
    subCategoryId?: string;
    subCategoryName?: string;
    variant: VariantDTO[];
    productImages: ProductImagesDTO[];
}
export declare class ResponseCategoryByIdProductDTOPagenation extends ProductResponseByCategoryIdDTO {
    total: number;
}
export declare class ProductsResponseBySubCategoryIdPagination extends ProductResponseBySubCategoryIdDTO {
    total: number;
}
