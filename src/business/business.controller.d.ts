import { BusinessService } from './business.service';
import { BusinessSaveDTO } from './business.model';
import { UsersDTO } from '../users/users.model';
import { CommonResponseModel } from '../utils/app.model';
import { UtilService } from '../utils/util.service';
export declare class BusinessController {
    private businessService;
    private utilService;
    constructor(businessService: BusinessService, utilService: UtilService);
    getBussinessDetailUser(): Promise<CommonResponseModel>;
    getBusinessinfomation(user: UsersDTO): Promise<CommonResponseModel>;
    updateBusiness(user: UsersDTO, businesData: BusinessSaveDTO): Promise<CommonResponseModel>;
}
