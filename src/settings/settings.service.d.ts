import { Model } from 'mongoose';
import { SettingDTO, UpdateCurrencyDTO, SettingCurrencyAndLanguageListDTO, SettingWorkingHoursDTO, SettingCurrencyAndLanguageCodeDTO, SettingCurrencyAndLanguageDTO, WorkingHoursDTO, DeliveryTaxSaveDTO } from './settings.model';
import { UtilService } from '../utils/util.service';
export declare class SettingService {
    private readonly settingModel;
    private utilService;
    constructor(settingModel: Model<any>, utilService: UtilService);
    getSettingsForUser(): Promise<DeliveryTaxSaveDTO>;
    getDeliveryTimeSlots(): Promise<any>;
    getDeliveryTaxSettings(): Promise<any>;
    getCurrencyDetail(): Promise<UpdateCurrencyDTO>;
    updateCurrency(updateCurrencyData: UpdateCurrencyDTO): Promise<UpdateCurrencyDTO>;
    updatDeliverySlot(deliverySlotData: any): Promise<SettingDTO>;
    updateDeliveryTaxSettings(deliveryTaxData: any): Promise<any>;
    dateFormat(i: any): string;
    getAvailableTimeSlot(deliveryTimeSlots: any): Promise<any>;
    getWorkingHour(): Promise<SettingWorkingHoursDTO>;
    createWorkingHour(workingHours: Array<WorkingHoursDTO>): Promise<SettingWorkingHoursDTO>;
    updateWorkingHour(settingWorkingHours: SettingWorkingHoursDTO): Promise<SettingDTO>;
    getCurrencyAndLanguage(): Promise<SettingCurrencyAndLanguageDTO>;
    getCurrencyAndLanguageList(): Promise<SettingCurrencyAndLanguageListDTO>;
    getCurrencyLanguageCode(): Promise<SettingCurrencyAndLanguageCodeDTO>;
    getMaxWalletAmountUsed(): Promise<any>;
}
