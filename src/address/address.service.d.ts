import { Model } from 'mongoose';
import { AddressDTO, AddressSaveDTO } from './address.model';
export declare class AddressService {
    private readonly addressModel;
    constructor(addressModel: Model<any>);
    getAllAddress(userId: string): Promise<Array<AddressDTO>>;
    getAddressDetail(userId: string, addressId: string): Promise<AddressDTO>;
    createAddress(addressData: AddressSaveDTO): Promise<AddressDTO>;
    updateAddress(addressId: string, addressData: AddressSaveDTO): Promise<AddressDTO>;
    deleteAddress(userId: string, addressId: string): Promise<AddressDTO>;
    getAddressTypeList(): Promise<{}>;
}
