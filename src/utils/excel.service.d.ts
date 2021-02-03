import { UploadService } from './upload.service';
import { UserService } from '../users/users.service';
import { ImportProductDTO } from '../products/products.model';
import { UtilService } from './util.service';
export declare class ExcelService {
    private uploadService;
    private utilService;
    constructor(uploadService: UploadService, utilService: UtilService);
    getHeaders(): Promise<{
        header: string;
        key: string;
        width: number;
    }[]>;
    getCategoryHeaders(): Promise<{
        header: string;
        key: string;
        width: number;
    }[]>;
    exportProducts(products: any, categories: any, categoriesWithNoSubCat: any, userId: any, userService: UserService): Promise<boolean>;
    createImportTemplate(categories: any, categoriesWithNoSubCat: any): Promise<{
        url: string;
        publicId: string;
    }>;
    importProducts(file: any, categories: any, categoriesWithNoSubCat: any): Promise<{
        existProducts: ImportProductDTO[];
        newProducts: any[];
    }>;
}
