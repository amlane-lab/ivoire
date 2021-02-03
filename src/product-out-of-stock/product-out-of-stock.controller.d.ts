import { ProductOutOfStockService } from './product-out-of-stock.service';
import { UsersDTO } from '../users/users.model';
import { CommonResponseModel, AdminQuery } from '../utils/app.model';
import { UtilService } from '../utils/util.service';
export declare class ProductOutOfStockController {
    private productOutOfStockService;
    private utilService;
    constructor(productOutOfStockService: ProductOutOfStockService, utilService: UtilService);
    getList(user: UsersDTO, adminQuery: AdminQuery): Promise<CommonResponseModel>;
}
