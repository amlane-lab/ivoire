import { Model } from 'mongoose';
import { BusinessDTO, BusinessAdminDTO, BusinessSaveDTO } from './business.model';
export declare class BusinessService {
    private readonly businessModel;
    constructor(businessModel: Model<any>);
    getBussinessDetailForUser(): Promise<BusinessDTO>;
    getBusinessDetail(): Promise<BusinessAdminDTO>;
    updateBusiness(businessData: BusinessSaveDTO): Promise<BusinessAdminDTO>;
}
