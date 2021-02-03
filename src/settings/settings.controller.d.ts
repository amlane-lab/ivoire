import { SettingService } from './settings.service';
import { UsersDTO } from '../users/users.model';
import { UtilService } from '../utils/util.service';
import { CurrencyService } from '../utils/currency.service';
import { DeliveryTaxSaveDTO, UpdateCurrencyDTO } from './settings.model';
import { CommonResponseModel } from '../utils/app.model';
export declare class SettingController {
    private settingService;
    private utilService;
    private currencyService;
    constructor(settingService: SettingService, utilService: UtilService, currencyService: CurrencyService);
    getDeliveryTaxSettingsForUser(user: UsersDTO): Promise<CommonResponseModel>;
    getDeliveryTime(user: UsersDTO): Promise<CommonResponseModel>;
    getDeliveryTaxSettings(user: UsersDTO): Promise<CommonResponseModel>;
    updateDeliveryTaxSettings(user: UsersDTO, deliveryTaxData: DeliveryTaxSaveDTO): Promise<CommonResponseModel>;
    getAdminDeliveryTime(user: UsersDTO): Promise<CommonResponseModel>;
    saveAdminDeliveryTime(user: UsersDTO, deliverySlotData: any): Promise<CommonResponseModel>;
    getAdminCurrency(user: UsersDTO): Promise<CommonResponseModel>;
    updateAdminCurrency(user: UsersDTO, updateCurrencyData: UpdateCurrencyDTO): Promise<CommonResponseModel>;
    getAllCurrencyList(user: UsersDTO): Promise<CommonResponseModel>;
    getTimeSlotsDropdown(user: UsersDTO): Promise<CommonResponseModel>;
}
