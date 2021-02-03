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
const address_model_1 = require("../address/address.model");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const settings_model_1 = require("../settings/settings.model");
const cart_model_1 = require("../cart/cart.model");
const delivery_boy_ratings_model_1 = require("../delivery-boy-ratings/delivery-boy-ratings.model");
var OrderStatusType;
(function (OrderStatusType) {
    OrderStatusType["PENDING"] = "PENDING";
    OrderStatusType["CONFIRMED"] = "CONFIRMED";
    OrderStatusType["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    OrderStatusType["DELIVERED"] = "DELIVERED";
    OrderStatusType["CANCELLED"] = "CANCELLED";
})(OrderStatusType = exports.OrderStatusType || (exports.OrderStatusType = {}));
var TransactionStatusType;
(function (TransactionStatusType) {
    TransactionStatusType["PENDING"] = "PENDING";
    TransactionStatusType["SUCCESS"] = "SUCCESS";
    TransactionStatusType["FAILED"] = "FAILED";
})(TransactionStatusType = exports.TransactionStatusType || (exports.TransactionStatusType = {}));
var PaymentStatusType;
(function (PaymentStatusType) {
    PaymentStatusType["PENDING"] = "PENDING";
    PaymentStatusType["SUCCESS"] = "SUCCESS";
    PaymentStatusType["FAILED"] = "FAILED";
})(PaymentStatusType = exports.PaymentStatusType || (exports.PaymentStatusType = {}));
exports.OrderSchema = new mongoose.Schema({
    cartId: { type: String },
    userId: { type: String },
    subTotal: { type: Number },
    tax: { type: Number },
    taxInfo: { type: Object },
    grandTotal: { type: Number },
    couponAmount: { type: Number },
    couponCode: { type: String },
    orderFrom: { type: String },
    deliveryType: { type: settings_model_1.DeliveryType },
    deliveryAddress: { type: String },
    deliveryDate: { type: String },
    deliveryTime: { type: String },
    deliveryInstruction: { type: String },
    deliveryCharges: { type: Number },
    paymentType: { type: settings_model_1.PaymentMethod },
    transactionDetails: {
        paymentMethodId: String,
        transactionId: String,
        transactionStatus: String,
        transactionAmount: Number,
        transactionDate: Number,
        receiptUrl: String,
        currency: String,
        paymentMethod: String,
        paymentCount: Number
    },
    orderStatus: { type: OrderStatusType },
    paymentStatus: { type: PaymentStatusType },
    orderID: { type: Number },
    isOrderAssigned: { type: Boolean, default: false },
    assignedToId: { type: String },
    assignedToName: { type: String },
    isAcceptedByDeliveryBoy: { type: Boolean, default: false },
    isDeliveryBoyRated: { type: Boolean, default: false },
    amountRefunded: { type: Number },
    usedWalletAmount: { type: Number },
    isWalletUsed: { type: Boolean, default: false },
    address: { type: Object },
    user: { type: Object },
    product: {
        title: { type: String },
        imageUrl: { type: String }
    },
    totalProduct: { type: Number },
    currencyCode: { type: String },
    currencySymbol: { type: String },
    invoiceToken: { type: String },
    rejectedByDeliveryBoy: [{
            deliveryBoyId: { type: String },
            deliveryBoyName: { type: String },
        }],
    cart: { type: Array },
    orderType: { type: String },
    isOrderModified: { type: Boolean },
    amountRefundedOrderModified: { type: Number, default: 0 },
    isProductDeleted: { type: Boolean },
    itemCancellList: { type: Array, default: [] },
    cashCollected: { type: Boolean },
}, {
    timestamps: true
});
class OrderFilterQuery {
}
exports.OrderFilterQuery = OrderFilterQuery;
class AssignOrderDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], AssignOrderDTO.prototype, "deliveryBoyId", void 0);
exports.AssignOrderDTO = AssignOrderDTO;
class OrderStatusDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty({ enum: Object.keys(OrderStatusType) }),
    class_validator_1.IsEnum(OrderStatusType, { message: 'Order status type must be one of these ' + Object.keys(OrderStatusType) }),
    __metadata("design:type", String)
], OrderStatusDTO.prototype, "status", void 0);
exports.OrderStatusDTO = OrderStatusDTO;
class OrderRatingDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderRatingDTO.prototype, "rating", void 0);
exports.OrderRatingDTO = OrderRatingDTO;
var PaymentType;
(function (PaymentType) {
    PaymentType["COD"] = "COD";
    PaymentType["STRIPE"] = "STRIPE";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
var StripePaymentStatus;
(function (StripePaymentStatus) {
    StripePaymentStatus["SUCCESS"] = "succeeded";
    StripePaymentStatus["REQUIRES_CAPTURE"] = "requires_capture";
    StripePaymentStatus["MANUAL"] = "manual";
})(StripePaymentStatus = exports.StripePaymentStatus || (exports.StripePaymentStatus = {}));
var PaymentFrom;
(function (PaymentFrom) {
    PaymentFrom["WEB_APP"] = "WEB_APP";
    PaymentFrom["USER_APP"] = "USER_APP";
})(PaymentFrom = exports.PaymentFrom || (exports.PaymentFrom = {}));
class OrdersSaveDTO {
}
exports.OrdersSaveDTO = OrdersSaveDTO;
class OrderCreateDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty({ enum: Object.keys(PaymentType) }),
    class_validator_1.IsEnum(PaymentType, { message: 'Payment type must be one of these ' + Object.keys(PaymentType) }),
    __metadata("design:type", String)
], OrderCreateDTO.prototype, "paymentType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderCreateDTO.prototype, "paymentId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderCreateDTO.prototype, "orderFrom", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderCreateDTO.prototype, "deliverySlotId", void 0);
exports.OrderCreateDTO = OrderCreateDTO;
class OrdersDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsMongoId(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "cart", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "user", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], OrdersDTO.prototype, "subTotal", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], OrdersDTO.prototype, "tax", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], OrdersDTO.prototype, "grandTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "deliveryType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "deliveryAddress", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "deliveryDate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "deliveryTime", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrdersDTO.prototype, "loyalty", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrdersDTO.prototype, "appTimestamp", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrdersDTO.prototype, "pickUpDate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "pickUpTime", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], OrdersDTO.prototype, "shouldCallBeforeDelivery", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "paymentType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "cardId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "orderFrom", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], OrdersDTO.prototype, "transactionDetails", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], OrdersDTO.prototype, "usedWalletAmount", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], OrdersDTO.prototype, "isWalletUsed", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "orderStatus", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], OrdersDTO.prototype, "orderID", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], OrdersDTO.prototype, "ratings", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrdersDTO.prototype, "rating", void 0);
exports.OrdersDTO = OrdersDTO;
class StartEndDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Date)
], StartEndDTO.prototype, "startDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Date)
], StartEndDTO.prototype, "endDate", void 0);
exports.StartEndDTO = StartEndDTO;
class GraphTotalCountDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], GraphTotalCountDTO.prototype, "totalOrder", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], GraphTotalCountDTO.prototype, "totalPrice", void 0);
exports.GraphTotalCountDTO = GraphTotalCountDTO;
class orderAssignDeliveryDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], orderAssignDeliveryDTO.prototype, "orderAssigned", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], orderAssignDeliveryDTO.prototype, "isAcceptedByDeliveryBoy", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], orderAssignDeliveryDTO.prototype, "assignedTo", void 0);
exports.orderAssignDeliveryDTO = orderAssignDeliveryDTO;
var OrderStatusDeliveryBoyType;
(function (OrderStatusDeliveryBoyType) {
    OrderStatusDeliveryBoyType["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    OrderStatusDeliveryBoyType["DELIVERED"] = "DELIVERED";
})(OrderStatusDeliveryBoyType = exports.OrderStatusDeliveryBoyType || (exports.OrderStatusDeliveryBoyType = {}));
class DBStatusUpdateDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiModelProperty({ enum: Object.keys(OrderStatusDeliveryBoyType) }),
    class_validator_1.IsEnum(OrderStatusDeliveryBoyType, { message: 'status must be one of these ' + Object.keys(OrderStatusDeliveryBoyType) }),
    __metadata("design:type", String)
], DBStatusUpdateDTO.prototype, "status", void 0);
exports.DBStatusUpdateDTO = DBStatusUpdateDTO;
class ResponseProductDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseProductDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseProductDTO.prototype, "imageUrl", void 0);
exports.ResponseProductDTO = ResponseProductDTO;
class ResponseUsersDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseUsersDTO.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseUsersDTO.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseUsersDTO.prototype, "mobileNumber", void 0);
exports.ResponseUsersDTO = ResponseUsersDTO;
class OrderResponseListDTO {
}
__decorate([
    swagger_1.ApiModelProperty({}),
    __metadata("design:type", ResponseProductDTO)
], OrderResponseListDTO.prototype, "product", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderResponseListDTO.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderResponseListDTO.prototype, "totalProduct", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderResponseListDTO.prototype, "grandTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderResponseListDTO.prototype, "orderStatus", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderResponseListDTO.prototype, "orderID", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderResponseListDTO.prototype, "createdAt", void 0);
exports.OrderResponseListDTO = OrderResponseListDTO;
class ResponseOrderDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", OrderResponseListDTO)
], ResponseOrderDTO.prototype, "response_data", void 0);
exports.ResponseOrderDTO = ResponseOrderDTO;
class ResponseOrderDTOPagination extends ResponseOrderDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderDTOPagination.prototype, "total", void 0);
exports.ResponseOrderDTOPagination = ResponseOrderDTOPagination;
class ResponseOrderByOrderDTO extends address_model_1.AddressSaveDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseUsersDTO)
], ResponseOrderByOrderDTO.prototype, "user", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderByOrderDTO.prototype, "paymentType", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderByOrderDTO.prototype, "orderStatus", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderByOrderDTO.prototype, "cartId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderByOrderDTO.prototype, "orderID", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderByOrderDTO.prototype, "deliveryDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderByOrderDTO.prototype, "deliveryTime", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderByOrderDTO.prototype, "createdAt", void 0);
exports.ResponseOrderByOrderDTO = ResponseOrderByOrderDTO;
class ResponseOrderDetails extends ResponseOrderByOrderDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderDetails.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ResponseOrderDetails.prototype, "cart", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ResponseOrderDetails.prototype, "productsIds", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseOrderDetails.prototype, "subTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseOrderDetails.prototype, "tax", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ResponseOrderDetails.prototype, "isFreeDelivery", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseOrderDetails.prototype, "grandTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseOrderDetails.prototype, "deliveryCharges", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderDetails.prototype, "deliveryAddress", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ResponseOrderDetails.prototype, "isOrderLinked", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderDetails.prototype, "coupon", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderDetails.prototype, "couponInfo", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], ResponseOrderDetails.prototype, "assignedToId", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], ResponseOrderDetails.prototype, "assignedToName", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Boolean)
], ResponseOrderDetails.prototype, "isDeliveryBoyRated", void 0);
exports.ResponseOrderDetails = ResponseOrderDetails;
class ResponseDataOfOrder {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDataOfOrder.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseOrderDetails)
], ResponseDataOfOrder.prototype, "response_data", void 0);
exports.ResponseDataOfOrder = ResponseDataOfOrder;
class ResponseOrderAdminListDTO extends ResponseOrderByOrderDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseProductDTO)
], ResponseOrderAdminListDTO.prototype, "product", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ResponseOrderAdminListDTO.prototype, "isOrderAssigned", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ResponseOrderAdminListDTO.prototype, "isAcceptedByDeliveryBoy", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], ResponseOrderAdminListDTO.prototype, "isWalletUsed", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderAdminListDTO.prototype, "userId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseOrderAdminListDTO.prototype, "usedWalletAmount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseOrderAdminListDTO.prototype, "amountRefunded", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderAdminListDTO.prototype, "orderFrom", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ResponseOrderAdminListDTO.prototype, "rejectedByDeliveryBoy", void 0);
exports.ResponseOrderAdminListDTO = ResponseOrderAdminListDTO;
class ResponseOrderForAdmin {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderForAdmin.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResponseOrderAdminListDTO)
], ResponseOrderForAdmin.prototype, "response_data", void 0);
exports.ResponseOrderForAdmin = ResponseOrderForAdmin;
class ResponseOrderDetailsOrderId {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseOrderDetailsOrderId.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResponseOrderDetails)
], ResponseOrderDetailsOrderId.prototype, "response_data", void 0);
exports.ResponseOrderDetailsOrderId = ResponseOrderDetailsOrderId;
class ResponseAdminOrderDetails {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseOrderDetails)
], ResponseAdminOrderDetails.prototype, "order", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", cart_model_1.UserCartDTO)
], ResponseAdminOrderDetails.prototype, "cart", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", delivery_boy_ratings_model_1.DeliveryBoyRatingSaveDTO)
], ResponseAdminOrderDetails.prototype, "deliveryBoyRating", void 0);
exports.ResponseAdminOrderDetails = ResponseAdminOrderDetails;
class ResponseAdminOrderDetailsOrderId {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseAdminOrderDetailsOrderId.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResponseAdminOrderDetails)
], ResponseAdminOrderDetailsOrderId.prototype, "response_data", void 0);
exports.ResponseAdminOrderDetailsOrderId = ResponseAdminOrderDetailsOrderId;
class ResponseStatusListAdmin {
}
exports.ResponseStatusListAdmin = ResponseStatusListAdmin;
class ResponseStatusList {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseStatusList.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseStatusListAdmin)
], ResponseStatusList.prototype, "response_data", void 0);
exports.ResponseStatusList = ResponseStatusList;
class OrderChartDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], OrderChartDTO.prototype, "labels", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], OrderChartDTO.prototype, "data", void 0);
exports.OrderChartDTO = OrderChartDTO;
class ResponseChartDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", OrderChartDTO)
], ResponseChartDTO.prototype, "graph", void 0);
__decorate([
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseChartDTO.prototype, "totalOrder", void 0);
__decorate([
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseChartDTO.prototype, "totalPrice", void 0);
__decorate([
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseChartDTO.prototype, "totalProduct", void 0);
__decorate([
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseChartDTO.prototype, "totalCategory", void 0);
exports.ResponseChartDTO = ResponseChartDTO;
class ResponseChardOrderDTO {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseChardOrderDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResponseChartDTO)
], ResponseChardOrderDTO.prototype, "response_data", void 0);
exports.ResponseChardOrderDTO = ResponseChardOrderDTO;
class ResposeUserData {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResposeUserData.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResposeUserData.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResposeUserData.prototype, "mobileNumber", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResposeUserData.prototype, "email", void 0);
exports.ResposeUserData = ResposeUserData;
class ResposeForDeliveryBoy extends address_model_1.AddressSaveDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", ResposeUserData)
], ResposeForDeliveryBoy.prototype, "user", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResposeForDeliveryBoy.prototype, "orderID", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResposeForDeliveryBoy.prototype, "deliveryDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResposeForDeliveryBoy.prototype, "deliveryTime", void 0);
exports.ResposeForDeliveryBoy = ResposeForDeliveryBoy;
class ResponseDeliveryBoyDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDeliveryBoyDTO.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResposeForDeliveryBoy)
], ResponseDeliveryBoyDTO.prototype, "response_data", void 0);
exports.ResponseDeliveryBoyDTO = ResponseDeliveryBoyDTO;
class ResponseDeiveryBoyPagination extends ResponseDeliveryBoyDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseDeiveryBoyPagination.prototype, "total", void 0);
exports.ResponseDeiveryBoyPagination = ResponseDeiveryBoyPagination;
class ResponseDeliveredOrder {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDeliveredOrder.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDeliveredOrder.prototype, "orderID", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDeliveredOrder.prototype, "deliveryDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDeliveredOrder.prototype, "deliveryTime", void 0);
exports.ResponseDeliveredOrder = ResponseDeliveredOrder;
class ResponseDelivedOrder {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseDelivedOrder.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ isArray: true }),
    __metadata("design:type", ResponseDeliveredOrder)
], ResponseDelivedOrder.prototype, "response_data", void 0);
exports.ResponseDelivedOrder = ResponseDelivedOrder;
class ResponseDeliveredOrderPagination extends ResponseDelivedOrder {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ResponseDeliveredOrderPagination.prototype, "total", void 0);
exports.ResponseDeliveredOrderPagination = ResponseDeliveredOrderPagination;
class OrderStartEndDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderStartEndDTO.prototype, "startDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderStartEndDTO.prototype, "endDate", void 0);
exports.OrderStartEndDTO = OrderStartEndDTO;
class SalesTable {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "totalRevenueWithTax", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "totalRevenueWithoutTax", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "totalOrders", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "avgOrderWithTax", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "avgOrderWithoutTax", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "avgTotalOrders", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "categoriesCount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "productsCount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "registerUser", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "avgRegisterUser", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "purchaseUser", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SalesTable.prototype, "avgPurchaseUser", void 0);
exports.SalesTable = SalesTable;
class ResponseSalesTable {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ResponseSalesTable.prototype, "response_code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", SalesTable)
], ResponseSalesTable.prototype, "response_data", void 0);
exports.ResponseSalesTable = ResponseSalesTable;
class OrderGraphsDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderGraphsDTO.prototype, "graphType", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderGraphsDTO.prototype, "categoryId", void 0);
exports.OrderGraphsDTO = OrderGraphsDTO;
class OrderPosDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], OrderPosDTO.prototype, "cart", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderPosDTO.prototype, "subTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderPosDTO.prototype, "tax", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderPosDTO.prototype, "deliveryCharges", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderPosDTO.prototype, "grandTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderPosDTO.prototype, "customerName", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderPosDTO.prototype, "customerMobileNumber", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderPosDTO.prototype, "deliveryAddress", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderPosDTO.prototype, "orderType", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderPosDTO.prototype, "paymentType", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderPosDTO.prototype, "channel", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderPosDTO.prototype, "deliverySlotId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderPosDTO.prototype, "customerEmail", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], OrderPosDTO.prototype, "cashCollected", void 0);
exports.OrderPosDTO = OrderPosDTO;
class OrderUpdateDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], OrderUpdateDTO.prototype, "product", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], OrderUpdateDTO.prototype, "posOrderProduct", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderUpdateDTO.prototype, "modifiedDealAmount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderUpdateDTO.prototype, "modifiedPrice", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderUpdateDTO.prototype, "modifiedQuantity", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderUpdateDTO.prototype, "modifiedVolume", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderUpdateDTO.prototype, "productTotal", void 0);
exports.OrderUpdateDTO = OrderUpdateDTO;
class OrderAddItemDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], OrderAddItemDTO.prototype, "variant", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderAddItemDTO.prototype, "productId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderAddItemDTO.prototype, "quantity", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderAddItemDTO.prototype, "maximumAmount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderAddItemDTO.prototype, "productTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderAddItemDTO.prototype, "dealAmount", void 0);
exports.OrderAddItemDTO = OrderAddItemDTO;
class OrderPosPaymentUpdateDTO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], OrderPosPaymentUpdateDTO.prototype, "cashCollected", void 0);
exports.OrderPosPaymentUpdateDTO = OrderPosPaymentUpdateDTO;
//# sourceMappingURL=order.model.js.map