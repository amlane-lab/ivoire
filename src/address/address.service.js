"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const address_model_1 = require("./address.model");
let AddressService = class AddressService {
    constructor(addressModel) {
        this.addressModel = addressModel;
    }
    async getAllAddress(userId) {
        const address = await this.addressModel.find({ userId: userId }, 'address addressType flatNo apartmentName landmark postalCode mobileNumber location');
        return address;
    }
    async getAddressDetail(userId, addressId) {
        const address = await this.addressModel.findOne({ _id: addressId, userId: userId }, 'address addressType flatNo apartmentName landmark postalCode mobileNumber location');
        return address;
    }
    async createAddress(addressData) {
        const address = await this.addressModel.create(addressData);
        return address;
    }
    async updateAddress(addressId, addressData) {
        const address = await this.addressModel.findOneAndUpdate({ _id: addressId }, addressData);
        return address;
    }
    async deleteAddress(userId, addressId) {
        const address = await this.addressModel.findOneAndRemove({ _id: addressId, userId: userId });
        return address;
    }
    async getAddressTypeList() {
        const list = {};
        for (var key in address_model_1.AddressType) {
            const val = address_model_1.AddressType[key];
            list[val] = val;
        }
        return list;
    }
};
AddressService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Address')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map