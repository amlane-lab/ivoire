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
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const address_service_1 = require("./address.service");
const users_model_1 = require("../users/users.model");
const address_model_1 = require("./address.model");
const util_service_1 = require("../utils/util.service");
const app_model_1 = require("../utils/app.model");
const settings_service_1 = require("../settings/settings.service");
const jwt_strategy_1 = require("../utils/jwt.strategy");
let AddressController = class AddressController {
    constructor(addressService, settingService, utilService) {
        this.addressService = addressService;
        this.settingService = settingService;
        this.utilService = utilService;
    }
    async getAddress(user) {
        this.utilService.validateUserRole(user);
        try {
            const addresses = await this.addressService.getAllAddress(user._id);
            return this.utilService.successResponseData(addresses);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAddressDetails(user, addressId) {
        this.utilService.validateUserRole(user);
        try {
            const address = await this.addressService.getAddressDetail(user._id, addressId);
            if (address)
                return this.utilService.successResponseData(address);
            else
                this.utilService.pageNotFound();
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async saveAddress(user, addressData) {
        this.utilService.validateUserRole(user);
        try {
            const mobileNumber = this.utilService.convertToNumber(addressData.mobileNumber);
            if (mobileNumber == 0)
                this.utilService.badRequest(app_model_1.ResponseMessage.REQUIRED_VALID_MOBILE_NUMBER);
            addressData.userId = user._id;
            const deliveryTax = await this.settingService.getDeliveryTaxSettings();
            const storeLocation = { latitude: deliveryTax.location.latitude, longitude: deliveryTax.location.longitude };
            const userLocation = { latitude: addressData.location.latitude, longitude: addressData.location.longitude };
            const preciseDistance = this.utilService.calculateDistance(userLocation, storeLocation);
            if (preciseDistance <= deliveryTax.deliveryCoverage) {
                const address = await this.addressService.createAddress(addressData);
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.ADDRESS_SAVED);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.ADDDRESS_DELIVERY_LOCATION_NOT_AVAILABLE);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async updateAddress(user, addressId, addressData) {
        this.utilService.validateUserRole(user);
        try {
            const addressExist = await this.addressService.getAddressDetail(user._id, addressId);
            if (!addressExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.ADDRESS_NOT_FOUND);
            const deliveryTax = await this.settingService.getDeliveryTaxSettings();
            const storeLocation = { latitude: deliveryTax.location.latitude, longitude: deliveryTax.location.longitude };
            const userLocation = { latitude: addressData.location.latitude, longitude: addressData.location.longitude };
            const preciseDistance = this.utilService.calculateDistance(userLocation, storeLocation);
            if (preciseDistance <= deliveryTax.deliveryCoverage) {
                const address = await this.addressService.updateAddress(addressId, addressData);
                if (address)
                    return this.utilService.successResponseMsg(app_model_1.ResponseMessage.ADDRESS_UPDATED);
                else
                    this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
            }
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.ADDDRESS_DELIVERY_LOCATION_NOT_AVAILABLE);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async deleteAddress(user, addressId) {
        this.utilService.validateUserRole(user);
        try {
            const addressExist = await this.addressService.getAddressDetail(user._id, addressId);
            if (!addressExist)
                this.utilService.badRequest(app_model_1.ResponseMessage.ADDRESS_NOT_FOUND);
            const address = await this.addressService.deleteAddress(user._id, addressId);
            if (address)
                return this.utilService.successResponseMsg(app_model_1.ResponseMessage.ADDRESS_DELETED);
            else
                this.utilService.badRequest(app_model_1.ResponseMessage.SOMETHING_WENT_WRONG);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
    async getAddressTypeList(user) {
        this.utilService.validateUserRole(user);
        try {
            const addressTypeList = await this.addressService.getAddressTypeList();
            return this.utilService.successResponseData(addressTypeList);
        }
        catch (e) {
            this.utilService.errorResponse(e);
        }
    }
};
__decorate([
    common_1.Get('/list'),
    swagger_1.ApiOperation({ title: 'Get all address for logged-in user' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of address', type: address_model_1.ResponseAddressList }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAddress", null);
__decorate([
    common_1.Get('/:addressId'),
    swagger_1.ApiOperation({ title: 'Get address detail by addressId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return address detail', type: address_model_1.ResponseAddress }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('addressId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAddressDetails", null);
__decorate([
    common_1.Post('/create'),
    swagger_1.ApiOperation({ title: 'Create address' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, address_model_1.AddressSaveDTO]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "saveAddress", null);
__decorate([
    common_1.Put('/update/:addressId'),
    swagger_1.ApiOperation({ title: 'Update address by addressId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('addressId')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String, address_model_1.AddressSaveDTO]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "updateAddress", null);
__decorate([
    common_1.Delete('/delete/:addressId'),
    swagger_1.ApiOperation({ title: 'Delete address by addressId' }),
    swagger_1.ApiResponse({ status: 200, description: 'Success message', type: app_model_1.ResponseSuccessMessage }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad request message', type: app_model_1.ResponseBadRequestMessage }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()), __param(1, common_1.Param('addressId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO, String]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "deleteAddress", null);
__decorate([
    common_1.Get('/type/list'),
    swagger_1.ApiOperation({ title: 'Get all address type for dropdown' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return list of address type', type: address_model_1.ResponseAddressDropdown }),
    swagger_1.ApiResponse({ status: 404, description: 'Unauthorized or Not found', type: app_model_1.ResponseErrorMessage }),
    __param(0, jwt_strategy_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAddressTypeList", null);
AddressController = __decorate([
    common_1.Controller('address'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('Address'),
    __metadata("design:paramtypes", [address_service_1.AddressService,
        settings_service_1.SettingService,
        util_service_1.UtilService])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map