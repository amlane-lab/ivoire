import { UsersDTO } from '../users/users.model';
import { PageService } from './pages.service';
import { PageSaveDTO } from './pages.model';
import { UtilService } from '../utils/util.service';
import { CommonResponseModel } from '../utils/app.model';
export declare class PageController {
    private pageService;
    private utilService;
    constructor(pageService: PageService, utilService: UtilService);
    getAboutUs(): Promise<CommonResponseModel>;
    getTermsConditions(): Promise<CommonResponseModel>;
    getPrivacyPage(): Promise<CommonResponseModel>;
    getAboutUsForAdmin(user: UsersDTO): Promise<CommonResponseModel>;
    getTermsConditionsForAdmin(user: UsersDTO): Promise<CommonResponseModel>;
    getPrivacyPageForAdmin(user: UsersDTO): Promise<CommonResponseModel>;
    updatePage(user: UsersDTO, pageData: PageSaveDTO): Promise<CommonResponseModel>;
}
