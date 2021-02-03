import * as mongoose from 'mongoose';
import { AddressSaveDTO } from '../address/address.model';
import { UserCartDTO } from '../cart/cart.model';
import { DeliveryBoyRatingSaveDTO } from '../delivery-boy-ratings/delivery-boy-ratings.model';
export declare enum OrderStatusType {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export declare enum TransactionStatusType {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}
export declare enum PaymentStatusType {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}
export declare const OrderSchema: mongoose.Schema<any>;
export declare class OrderFilterQuery {
    page?: number;
    limit?: number;
    orderStatus?: string;
    subCategoryId?: string;
    assignedToId?: string;
}
export interface TransactionModel {
    paymentMethodId?: string;
    transactionId?: string;
    transactionStatus?: string;
    transactionAmount?: number;
    transactionDate?: number;
    receiptUrl?: string;
    currency?: string;
    paymentMethod?: string;
    paymentCount?: number;
}
export declare class AssignOrderDTO {
    deliveryBoyId: string;
}
export declare class OrderStatusDTO {
    status: string;
}
export declare class OrderRatingDTO {
    rating: number;
}
export declare enum PaymentType {
    COD = "COD",
    STRIPE = "STRIPE"
}
export declare enum StripePaymentStatus {
    SUCCESS = "succeeded",
    REQUIRES_CAPTURE = "requires_capture",
    MANUAL = "manual"
}
export declare enum PaymentFrom {
    WEB_APP = "WEB_APP",
    USER_APP = "USER_APP"
}
export declare class OrdersSaveDTO {
    subTotal: number;
}
export declare class OrderCreateDTO {
    paymentType: string;
    paymentId: string;
    orderFrom: string;
    deliverySlotId: string;
}
export declare class OrdersDTO {
    cart: string;
    cartId: string;
    user: string;
    subTotal: number;
    tax: number;
    grandTotal: number;
    deliveryType: string;
    deliveryAddress: string;
    deliveryCharges: number;
    deliveryDate: string;
    deliveryTime: string;
    loyalty: number;
    appTimestamp: number;
    pickUpDate: number;
    pickUpTime: string;
    deliveryInstruction: string;
    shouldCallBeforeDelivery: boolean;
    paymentType: string;
    cardId: string;
    orderFrom?: string;
    transactionDetails: TransactionModel;
    usedWalletAmount: number;
    isWalletUsed: boolean;
    orderStatus: string;
    orderID: number;
    ratings: Array<any>;
    rating: number;
    orderAssigned: boolean;
    assignedTo: string;
    isAcceptedByDeliveryBoy: boolean;
}
export declare class StartEndDTO {
    startDate: Date;
    endDate: Date;
}
export declare class GraphTotalCountDTO {
    totalOrder: number;
    totalPrice: number;
}
export declare class orderAssignDeliveryDTO {
    orderAssigned: Boolean;
    isAcceptedByDeliveryBoy: boolean;
    assignedTo: string;
}
export declare enum OrderStatusDeliveryBoyType {
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
    DELIVERED = "DELIVERED"
}
export declare class DBStatusUpdateDTO {
    status: string;
}
export declare class ResponseProductDTO {
    title: string;
    imageUrl: string;
}
export declare class ResponseUsersDTO {
    firstName: string;
    lastName: string;
    mobileNumber: string;
}
export declare class OrderResponseListDTO {
    product: ResponseProductDTO;
    _id: string;
    totalProduct: number;
    grandTotal: number;
    orderStatus: string;
    orderID: string;
    createdAt: string;
}
export declare class ResponseOrderDTO {
    response_code: string;
    response_data: OrderResponseListDTO;
}
export declare class ResponseOrderDTOPagination extends ResponseOrderDTO {
    total: string;
}
export declare class ResponseOrderByOrderDTO extends AddressSaveDTO {
    user: ResponseUsersDTO;
    paymentType: string;
    orderStatus: string;
    cartId: string;
    orderID: string;
    deliveryDate: string;
    deliveryTime: string;
    createdAt: string;
}
export declare class ResponseOrderDetails extends ResponseOrderByOrderDTO {
    _id: string;
    cart: Array<String>;
    productsIds: Array<string>;
    subTotal: number;
    tax: number;
    isFreeDelivery: boolean;
    grandTotal: number;
    deliveryCharges: number;
    deliveryAddress?: string;
    isOrderLinked: boolean;
    coupon?: string;
    couponInfo?: string;
    assignedToId?: string;
    assignedToName?: string;
    isDeliveryBoyRated?: boolean;
}
export declare class ResponseDataOfOrder {
    response_code: string;
    response_data: ResponseOrderDetails;
}
export declare class ResponseOrderAdminListDTO extends ResponseOrderByOrderDTO {
    product: ResponseProductDTO;
    isOrderAssigned: boolean;
    isAcceptedByDeliveryBoy: boolean;
    isWalletUsed: boolean;
    userId: string;
    usedWalletAmount: number;
    amountRefunded: number;
    orderFrom: string;
    rejectedByDeliveryBoy: [];
}
export declare class ResponseOrderForAdmin {
    response_code: string;
    response_data: ResponseOrderAdminListDTO;
}
export declare class ResponseOrderDetailsOrderId {
    response_code: string;
    response_data: ResponseOrderDetails;
}
export declare class ResponseAdminOrderDetails {
    order: ResponseOrderDetails;
    cart: UserCartDTO;
    deliveryBoyRating: DeliveryBoyRatingSaveDTO;
}
export declare class ResponseAdminOrderDetailsOrderId {
    response_code: string;
    response_data: ResponseAdminOrderDetails;
}
export declare class ResponseStatusListAdmin {
    PENDING: string;
    CONFIRMED: string;
    OUT_FOR_DELIVERY: string;
    DELIVERED: string;
    CANCELLED: string;
}
export declare class ResponseStatusList {
    response_code: string;
    response_data: ResponseStatusListAdmin;
}
export declare class OrderChartDTO {
    labels: [];
    data: [];
}
export declare class ResponseChartDTO {
    graph: OrderChartDTO;
    totalOrder: number;
    totalPrice: number;
    totalProduct: number;
    totalCategory: number;
}
export declare class ResponseChardOrderDTO {
    response_code: string;
    response_data: ResponseChartDTO;
}
export declare class ResposeUserData {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
}
export declare class ResposeForDeliveryBoy extends AddressSaveDTO {
    user: ResposeUserData;
    orderID: string;
    deliveryDate: string;
    deliveryTime: string;
}
export declare class ResponseDeliveryBoyDTO {
    response_code: string;
    response_data: ResposeForDeliveryBoy;
}
export declare class ResponseDeiveryBoyPagination extends ResponseDeliveryBoyDTO {
    total: number;
}
export declare class ResponseDeliveredOrder {
    _id: string;
    orderID: string;
    deliveryDate: string;
    deliveryTime: string;
}
export declare class ResponseDelivedOrder {
    response_code: string;
    response_data: ResponseDeliveredOrder;
}
export declare class ResponseDeliveredOrderPagination extends ResponseDelivedOrder {
    total: number;
}
export declare class OrderStartEndDTO {
    startDate: number;
    endDate: number;
}
export declare class SalesTable {
    totalRevenueWithTax: number;
    totalRevenueWithoutTax: number;
    totalOrders: number;
    avgOrderWithTax: number;
    avgOrderWithoutTax: number;
    avgTotalOrders: number;
    categoriesCount: number;
    productsCount: number;
    registerUser: number;
    avgRegisterUser: number;
    purchaseUser: number;
    avgPurchaseUser: number;
}
export declare class ResponseSalesTable {
    response_code: string;
    response_data: SalesTable;
}
export declare class OrderGraphsDTO {
    graphType: string;
    categoryId?: string;
}
export declare class OrderPosDTO {
    cart: Array<Object>;
    subTotal: number;
    tax: number;
    deliveryCharges: number;
    grandTotal: number;
    customerName: string;
    customerMobileNumber: string;
    deliveryAddress?: string;
    orderType: string;
    paymentType: string;
    channel: string;
    deliverySlotId?: string;
    customerEmail?: string;
    cashCollected: boolean;
}
export declare class OrderUpdateDTO {
    product?: Object;
    posOrderProduct?: Object;
    modifiedDealAmount: number;
    modifiedPrice: number;
    modifiedQuantity: number;
    modifiedVolume: string;
    productTotal: number;
}
export declare class OrderAddItemDTO {
    variant: Object;
    productId: string;
    quantity: number;
    maximumAmount: number;
    productTotal: string;
    dealAmount: number;
}
export declare class OrderPosPaymentUpdateDTO {
    cashCollected: Boolean;
}
