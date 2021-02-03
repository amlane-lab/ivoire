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
const order_model_1 = require("./order.model");
let OrderService = class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async getAllOrderForUser(userId, page, limit) {
        const skip = page * limit;
        return await this.orderModel.find({ userId: userId }, 'orderID orderStatus paymentStatus createdAt grandTotal usedWalletAmount product totalProduct').sort({ createdAt: -1 }).limit(limit).skip(skip);
    }
    async countAllOrderForUser(userId) {
        return await this.orderModel.countDocuments({ userId: userId });
    }
    async getOrderDetailForUser(userId, orderId) {
        return await this.orderModel.findOne({ _id: orderId, userId: userId }, 'cart cartId taxInfo grandTotal couponAmount deliveryCharges tax subTotal deliveryAddress paymentType isOrderModified paymentStatus orderID orderStatus deliveryDate deliveryTime address user assignedToId assignedToName isDeliveryBoyRated createdAt usedWalletAmount');
    }
    async getOrderDetailForCancel(userId, orderId) {
        return await this.orderModel.findOne({ _id: orderId, userId: userId });
    }
    async createOrder(orderData) {
        return await this.orderModel.create(orderData);
    }
    async orderCancelByUser(userId, orderId, amountRefund) {
        const updateData = {
            orderStatus: order_model_1.OrderStatusType.CANCELLED,
            amountRefunded: amountRefund
        };
        return await this.orderModel.updateOne({ _id: orderId, userId: userId }, updateData, { new: true });
    }
    async updateOrderRatedByUser(userId, orderId) {
        const updateData = { isDeliveryBoyRated: true };
        return await this.orderModel.updateOne({ _id: orderId, userId: userId }, updateData, { new: true });
    }
    async getAllDeliveredOrderForDeliveryBoy(deliveryBoyId, page, limit) {
        const orderFilter = { assignedToId: deliveryBoyId, orderStatus: order_model_1.OrderStatusType.DELIVERED };
        const skip = page * limit;
        return await this.orderModel.find(orderFilter, 'orderID deliveryDate deliveryTime').sort({ createdAt: -1 }).limit(limit).skip(skip);
    }
    async countAllDeliveredOrderForDeliveryBoy(deliveryBoyId) {
        const orderFilter = { assignedToId: deliveryBoyId, orderStatus: order_model_1.OrderStatusType.DELIVERED };
        return await this.orderModel.countDocuments(orderFilter);
    }
    async getOrderDetailForBoy(boyId, orderId) {
        return await this.orderModel.findOne({ _id: orderId, assignedToId: boyId, isOrderAssigned: true }, 'cartId paymentType orderID paymentStatus orderStatus deliveryDate deliveryTime address user');
    }
    async getAllAssginedOrderForDeliveryBoy(deliveryBoyId, page, limit) {
        const orderFilter = { $or: [{ assignedToId: deliveryBoyId, orderStatus: order_model_1.OrderStatusType.CONFIRMED }, { assignedToId: deliveryBoyId, orderStatus: order_model_1.OrderStatusType.OUT_FOR_DELIVERY }] };
        const skip = page * limit;
        const orders = await this.orderModel.find(orderFilter, 'orderId orderID deliveryDate deliveryTime user address isAcceptedByDeliveryBoy').sort({ createdAt: -1 }).limit(limit).skip(skip);
        return orders;
    }
    async countAllAssginedOrderForDeliveryBoy(deliveryBoyId) {
        const orderFilter = { assignedToId: deliveryBoyId, orderStatus: order_model_1.OrderStatusType.CONFIRMED };
        const orders = await this.orderModel.countDocuments(orderFilter);
        return orders;
    }
    async orderAcceptByDelivery(orderId) {
        return await this.orderModel.findByIdAndUpdate(orderId, { isAcceptedByDeliveryBoy: true });
    }
    async orderRejectedByDelivery(orderId, deliveryBoyId, deliveryBoyName) {
        const updateData = {
            isAcceptedByDeliveryBoy: false,
            isOrderAssigned: false,
            assignedToId: null,
            assignedToName: null,
            "$push": { rejectedByDeliveryBoy: { deliveryBoyId: deliveryBoyId, deliveryBoyName: deliveryBoyName } }
        };
        const order = await this.orderModel.findByIdAndUpdate(orderId, updateData);
        return order;
    }
    async orderStatusUpdateByDelivery(orderId, orderStatus, paymentStatus) {
        let updateData = { orderStatus: orderStatus };
        if (paymentStatus)
            updateData['paymentStatus'] = paymentStatus;
        const order = await this.orderModel.findByIdAndUpdate(orderId, updateData);
        return order;
    }
    async getAllOrder(orderFilter, page, limit) {
        const skip = page * limit;
        return await this.orderModel.find(orderFilter).sort({ createdAt: -1 }).limit(limit).skip(skip);
    }
    async countAllOrder(orderFilter) {
        return await this.orderModel.countDocuments(orderFilter);
    }
    async getOrderDetail(orderId) {
        return await this.orderModel.findById(orderId);
    }
    async getOrderDetailByToken(orderId, token) {
        return await this.orderModel.findOne({ _id: orderId, invoiceToken: token });
    }
    async orderStatusUpdate(orderId, orderStatus) {
        return await this.orderModel.findByIdAndUpdate(orderId, { orderStatus: orderStatus }, { new: true });
    }
    async orderAssignToDelivery(orderId, orderAssignData) {
        return await this.orderModel.findByIdAndUpdate(orderId, orderAssignData, { new: true });
    }
    async getOrderStatusTypeList() {
        const list = {};
        for (var key in order_model_1.OrderStatusType) {
            const val = order_model_1.OrderStatusType[key];
            list[val] = val;
        }
        return list;
    }
    async orderCancelByAdmin(orderId, amountRefund) {
        const updateData = {
            orderStatus: order_model_1.OrderStatusType.CANCELLED,
            amountRefunded: amountRefund
        };
        return await this.orderModel.updateOne({ _id: orderId }, updateData, { new: true });
    }
    async getTotalOrderAmdSum() {
        const orders = await this.orderModel.aggregate([
            { $match: { orderStatus: order_model_1.OrderStatusType.DELIVERED } },
            { $group: { _id: {}, data: { $sum: '$grandTotal' }, count: { $sum: 1 } } }
        ]);
        let totalOrder = 0, totalPrice = 0;
        if (orders && orders.length) {
            totalOrder = orders[0].count;
            totalPrice = orders[0].data;
        }
        return { totalOrder, totalPrice };
    }
    async getOrdersPriceInLast7Days() {
        let date = new Date();
        let today = date.setHours(0, 0, 0, 0);
        let sevenDaysBack = new Date(today - 6 * 24 * 60 * 60 * 1000);
        const result = await this.orderModel.aggregate([
            { $match: { orderStatus: order_model_1.OrderStatusType.DELIVERED, createdAt: { $gt: sevenDaysBack, $lt: date } } },
            {
                $group: {
                    _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' }, date: { $dayOfMonth: '$createdAt' } },
                    data: { $sum: '$grandTotal' }
                }
            }
        ]);
        return result;
    }
    async totalSalesByFilter(startDate, endDate) {
        startDate = startDate.setHours(0, 0, 0, 0);
        console.log("startDate", startDate);
        const result = await this.orderModel.aggregate([
            { $match: { orderStatus: order_model_1.OrderStatusType.DELIVERED, createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) } } },
            {
                $group: {
                    _id: {},
                    totalSalesWithTax: { $sum: '$grandTotal' },
                    totalTax: { $sum: '$tax' },
                    count: { $sum: 1 }
                }
            }
        ]);
        return result;
    }
    async totalPuchaseUserFilter(startDate, endDate) {
        startDate = startDate.setHours(0, 0, 0, 0);
        const result = await this.orderModel.distinct("userId", { createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) } });
        return result.length;
    }
    async categoryModeGraph(startDate, endDate) {
        let query = { createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) } };
        console.log("categoryModeGraph query", query);
        const result = await this.orderModel.aggregate([
            { $match: query },
            { '$unwind': '$cart' },
            { $group: { _id: { "category": "$cart.categoryId" }, count: { $sum: "$cart.quantity" }, total: { $sum: "$cart.productTotal" } } }
        ]);
        return result;
    }
    async productModeGraph(startDate, endDate, categoryId) {
        let query = { "cart.categoryId": categoryId, createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) } };
        console.log("productModeGraph query", query);
        const result = await this.orderModel.aggregate([
            { $match: query },
            { '$unwind': '$cart' },
            { $group: { _id: { "productName": "$cart.productName" }, count: { $sum: "$cart.quantity" }, total: { $sum: "$cart.productTotal" } } }
        ]);
        return result;
    }
    async productModeTable(startDate, endDate) {
        let query = { createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) } };
        console.log("productModeGraph query", query);
        const result = await this.orderModel.aggregate([
            { $match: query },
            { '$unwind': '$cart' },
            { $group: { _id: { "productName": "$cart.productName" }, count: { $sum: "$cart.quantity" }, total: { $sum: "$cart.productTotal" } } },
            { "$sort": { "count": -1 } },
            { "$limit": 10 }
        ]);
        return result;
    }
    async salesGraph(startDate, endDate, type) {
        let query = { createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) } };
        console.log("productModeGraph query", query);
        let result;
        if (type === "DAILY") {
            result = await this.orderModel.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' }, date: { $dayOfMonth: '$createdAt' } },
                        data: { $sum: '$grandTotal' }
                    }
                }
            ]);
        }
        else {
            result = await this.orderModel.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                        data: { $sum: '$grandTotal' }
                    }
                }
            ]);
        }
        return result;
    }
    async paymentModeGraph(startDate, endDate) {
        let query = { createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) } };
        console.log("paymentModeGraph query", query);
        const result = await this.orderModel.aggregate([
            { $match: query },
            { $group: { _id: { "paymentType": "$paymentType" }, total: { $sum: "$grandTotal" } } },
        ]);
        return result;
    }
    async orderScriptToUpdate(orderFilter, skip, limit) {
        return await this.orderModel.find(orderFilter).sort({ createdAt: -1 }).limit(limit).skip(skip);
    }
    async orderScriptToUpdateDetail(orderId, orderInfo) {
        const order = await this.orderModel.findByIdAndUpdate(orderId, orderInfo, { new: true });
        return order;
    }
    async orderDetailUpdate(orderId, orderData) {
        return await this.orderModel.findByIdAndUpdate(orderId, orderData, { new: true });
    }
    async deleteOrder(orderId) {
        return await this.orderModel.findByIdAndDelete(orderId);
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Order')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map