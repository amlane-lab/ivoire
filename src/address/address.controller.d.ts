import { AddressService } from './address.service';
import { UsersDTO } from '../users/users.model';
import { AddressSaveDTO } from './address.model';
import { UtilService } from '../utils/util.service';
import { CommonResponseModel } from '../utils/app.model';
import { SettingService } from '../settings/settings.service';
export declare class AddressController {
    private addressService;
    private settingService;
    private utilService;
    constructor(addressService: AddressService, settingService: SettingService, utilService: UtilService);
    getAddress(user: UsersDTO): Promise<CommonResponseModel>;
    getAddressDetails(user: UsersDTO, addressId: string): Promise<CommonResponseModel>;
    saveAddress(user: UsersDTO, addressData: AddressSaveDTO): Promise<CommonResponseModel>;
    updateAddress(user: UsersDTO, addressId: string, addressData: AddressSaveDTO): Promise<CommonResponseModel>;
    deleteAddress(user: UsersDTO, addressId: string): Promise<CommonResponseModel>;
    getAddressTypeList(user: UsersDTO): Promise<CommonResponseModel>;
}
