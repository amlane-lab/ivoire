import { LanguageService } from './language.service';
import { LanguageDTO, LanguageStatusUpdateDTO } from './language.model';
import { UsersDTO } from '../users/users.model';
import { UtilService } from '../utils/util.service';
import { CommonResponseModel } from '../utils/app.model';
export declare class LanguageController {
    private languageService;
    private utilService;
    constructor(languageService: LanguageService, utilService: UtilService);
    getLanguageListForUser(user: UsersDTO): Promise<CommonResponseModel>;
    getLanguageList(user: UsersDTO): Promise<CommonResponseModel>;
    createLanguage(user: UsersDTO, languageData: LanguageDTO): Promise<CommonResponseModel>;
    updateLanguage(user: UsersDTO, languageId: string, languageData: LanguageDTO): Promise<CommonResponseModel>;
    DeleteLanguage(user: UsersDTO, languageId: string): Promise<CommonResponseModel>;
    getLanguageDetail(user: UsersDTO, languageId: string): Promise<CommonResponseModel>;
    setDefaultLanguage(user: UsersDTO, languageId: string): Promise<CommonResponseModel>;
    statusUpdate(user: UsersDTO, languageId: string, languageStatusUpdateDTO: LanguageStatusUpdateDTO): Promise<CommonResponseModel>;
    getLanguageCms(query: any): Promise<CommonResponseModel>;
    getLanguageWeb(query: any): Promise<CommonResponseModel>;
    getLanguageUser(query: any): Promise<CommonResponseModel>;
    getLanguageDelivey(query: any): Promise<CommonResponseModel>;
}
