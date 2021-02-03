import { Model } from 'mongoose';
import { LanguageDTO, LanguageStatusUpdateDTO } from './language.model';
export declare class LanguageService {
    private readonly languageModel;
    constructor(languageModel: Model<any>);
    checkJson(sourceKey: any, inputKey: any): Promise<{
        isValid: boolean;
        message: string;
    }>;
    validateJson(sourcData: any, inputData: any, type: any): Promise<{
        isValid: boolean;
        message: string;
    }>;
    parseJson(sourcData: any): any;
    getAllLanguage(): Promise<Array<LanguageDTO>>;
    getAllLanguageForUser(): Promise<Array<LanguageDTO>>;
    checkExistLanguage(code: string): Promise<LanguageDTO>;
    getLanguageById(id: string): Promise<LanguageDTO>;
    getLanguageByCode(code: string): Promise<LanguageDTO>;
    getDefaultLanguage(): Promise<LanguageDTO>;
    createLanguage(languageData: LanguageDTO): Promise<LanguageDTO>;
    updateLanguage(languageId: string, languageData: LanguageDTO): Promise<LanguageDTO>;
    deleteLanguage(languageId: string): Promise<any>;
    setDefaultLanguage(languageId: string): Promise<LanguageDTO>;
    languageStatusUpdate(languageId: string, languageStatusUpdateDTO: LanguageStatusUpdateDTO): Promise<LanguageDTO>;
    getLanguageForBackend(): Promise<Array<LanguageDTO>>;
    getOtherLanguage(): Promise<Array<LanguageDTO>>;
    languageJsonUpdate(languageKeys: any, englishLanguage: any, jsonSourceKey: any, jsonType: any): Promise<any>;
    addKeyToOtherLanguage(englishLanguage: any): Promise<any>;
}
