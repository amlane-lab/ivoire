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
const swagger_1 = require("@nestjs/swagger");
exports.BusinessSchema = new mongoose.Schema({
    storeName: { type: String },
    address: { type: String },
    email: { type: String },
    phoneNumber: { type: Number },
    officeLocation: { type: String }
}, {
    timestamps: true
});
class BusinessSaveDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], BusinessSaveDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], BusinessSaveDTO.prototype, "phoneNumber", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], BusinessSaveDTO.prototype, "address", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], BusinessSaveDTO.prototype, "storeName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], BusinessSaveDTO.prototype, "officeLocation", void 0);
exports.BusinessSaveDTO = BusinessSaveDTO;
class BusinessAdminDTO extends BusinessSaveDTO {
}
exports.BusinessAdminDTO = BusinessAdminDTO;
class BusinessDTO extends BusinessSaveDTO {
}
exports.BusinessDTO = BusinessDTO;
class ResponseBusinessUser {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseBusinessUser.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", BusinessAdminDTO)
], ResponseBusinessUser.prototype, "response_data", void 0);
exports.ResponseBusinessUser = ResponseBusinessUser;
class ResponseBusinessDetail {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseBusinessDetail.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", BusinessDTO)
], ResponseBusinessDetail.prototype, "response_data", void 0);
exports.ResponseBusinessDetail = ResponseBusinessDetail;
class ResponseBusinessDetailAdmin {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseBusinessDetailAdmin.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", BusinessAdminDTO)
], ResponseBusinessDetailAdmin.prototype, "response_data", void 0);
exports.ResponseBusinessDetailAdmin = ResponseBusinessDetailAdmin;
//# sourceMappingURL=business.model.js.map