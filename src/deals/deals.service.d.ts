import { Model } from 'mongoose';
import { DealsDTO, DealStatusDTO, DealSaveDTO } from './deals.model';
export declare class DealService {
    private readonly dealsModel;
    constructor(dealsModel: Model<any>);
    getAllDeal(page: number, limit: number, search: string): Promise<Array<any>>;
    countAllDeal(search: string): Promise<number>;
    getDealDetail(dealId: string): Promise<DealsDTO>;
    getDealByCategoryId(categoryId: string): Promise<any>;
    getDealByProductId(productId: string): Promise<any>;
    countDealByCategoryId(categoryId: string): Promise<number>;
    countDealByProductId(productId: string): Promise<number>;
    createDeal(dealData: DealSaveDTO): Promise<DealsDTO>;
    updateDeal(dealId: string, dealData: DealSaveDTO): Promise<DealsDTO>;
    deleteDeal(dealId: string): Promise<DealsDTO>;
    updateDealStatus(dealId: string, dealStatusData: DealStatusDTO): Promise<DealsDTO>;
    topDeals(): Promise<Array<any>>;
    topDealsForHome(limit: number): Promise<Array<any>>;
    dealOfTheDay(): Promise<Array<any>>;
    dealOfTheDayForHome(limit: number): Promise<Array<any>>;
    getDealTypeList(): Promise<{}>;
}
