import { Model } from 'mongoose';
import { PageSaveDTO, PageDTO } from './pages.model';
export declare class PageService {
    private readonly pageModel;
    constructor(pageModel: Model<any>);
    getPage(pageType: string): Promise<PageDTO>;
    getPageForAdmin(pageType: string): Promise<PageDTO>;
    updatePage(pageType: string, pageData: PageSaveDTO): Promise<PageDTO>;
}
