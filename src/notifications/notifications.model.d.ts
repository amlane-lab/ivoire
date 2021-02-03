import * as mongoose from 'mongoose';
export declare enum NotificationType {
    ORDER_PLACED = "ORDER_PLACED",
    ORDER_CANCELLED = "ORDER_CANCELLED",
    ORDER_ACCEPTED_BY_DELIVERY_BOY = "ORDER_ACCEPTED_BY_DELIVERY_BOY",
    ORDER_REJECTED_BY_DELIVERY_BOY = "ORDER_REJECTED_BY_DELIVERY_BOY",
    PRODUCT_OUT_OF_STOCK = "PRODUCT_OUT_OF_STOCK"
}
export declare const NotificationSchema: mongoose.Schema<any>;
export declare class NotificationSaveDTO {
    title?: string;
    description?: string;
    notifyType?: NotificationType;
    orderId: string;
    orderID: number;
    deliveryBoyId?: string;
    deliveryBoyName?: string;
    productId?: string;
    unit?: string;
}
export declare class NotificationDTO {
    title: string;
    description: string;
    notifyType: NotificationType;
    orderId: string;
    orderID: number;
    deliveryBoyId: string;
    deliveryBoyName: string;
    isRead: boolean;
    productId: string;
    unit: string;
}
export declare class ResponseNotificationListDTO {
    response_code: string;
    response_data: NotificationDTO;
}
export declare class SendNotificationDTO {
    title: string;
    body: string;
}
export declare class readNotificationDTO {
    notificationId: string;
}
