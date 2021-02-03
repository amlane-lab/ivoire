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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var AddressType;
(function (AddressType) {
    AddressType["HOME"] = "HOME";
    AddressType["WORK"] = "WORK";
    AddressType["OTHERS"] = "OTHERS";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
class LLLocationDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], LLLocationDTO.prototype, "latitude", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], LLLocationDTO.prototype, "longitude", void 0);
exports.LLLocationDTO = LLLocationDTO;
exports.AddressSchema = new mongoose.Schema({
    address: { type: String },
    flatNo: { type: String },
    apartmentName: { type: String },
    landmark: { type: String, required: false },
    postalCode: { type: String },
    mobileNumber: { type: String },
    addressType: { type: AddressType },
    userId: { type: String },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
}, {
    timestamps: true
});
class AddressSaveDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty({ enum: Object.keys(AddressType) }),
    class_validator_1.IsString(),
    class_validator_1.IsEnum(AddressType, { message: 'addressType must be one of these ' + Object.keys(AddressType) }),
    __metadata("design:type", String)
], AddressSaveDTO.prototype, "addressType", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddressSaveDTO.prototype, "flatNo", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddressSaveDTO.prototype, "apartmentName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddressSaveDTO.prototype, "landmark", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddressSaveDTO.prototype, "address", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddressSaveDTO.prototype, "postalCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => LLLocationDTO),
    __metadata("design:type", LLLocationDTO)
], AddressSaveDTO.prototype, "location", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AddressSaveDTO.prototype, "mobileNumber", void 0);
exports.AddressSaveDTO = AddressSaveDTO;
class AddressDTO extends AddressSaveDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AddressDTO.prototype, "_id", void 0);
exports.AddressDTO = AddressDTO;
class ResponseAddress {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseAddress.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", AddressDTO)
], ResponseAddress.prototype, "response_data", void 0);
exports.ResponseAddress = ResponseAddress;
class ResponseAddressList {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseAddressList.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", AddressDTO)
], ResponseAddressList.prototype, "response_data", void 0);
exports.ResponseAddressList = ResponseAddressList;
class ResponseAddressDropdown {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseAddressDropdown.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], ResponseAddressDropdown.prototype, "response_data", void 0);
exports.ResponseAddressDropdown = ResponseAddressDropdown;
//# sourceMappingURL=address.model.js.map