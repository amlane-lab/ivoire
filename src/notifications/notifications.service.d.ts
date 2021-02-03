import { Model } from 'mongoose';
import { NotificationSaveDTO, NotificationDTO } from './notifications.model';
export declare class NotificationService {
    private readonly notificationModel;
    constructor(notificationModel: Model<any>);
    getAllNotification(page: number, limit: number): Promise<Array<NotificationDTO>>;
    countAllnotification(): Promise<number>;
    readNotification(notifyId: any): Promise<number>;
    countUnread(): Promise<number>;
    createForOrderPlaced(notificationData: NotificationSaveDTO): Promise<NotificationDTO>;
    createForOrderCancel(notificationData: NotificationSaveDTO): Promise<NotificationDTO>;
    createForAcceptedByBoy(notificationData: NotificationSaveDTO): Promise<NotificationDTO>;
    createForRejectedByBoy(notificationData: NotificationSaveDTO): Promise<NotificationDTO>;
    createForProductOutOfStock(productOutOfStockData: NotificationSaveDTO): Promise<NotificationDTO>;
    deleteNotificationByordrId(orderId: string): Promise<any>;
}
