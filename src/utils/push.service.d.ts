export declare class PushService {
    appId: any;
    secretKey: any;
    constructor();
    sendNotificationToUser(playerId: any, title: any, message: any, isAll?: boolean): Promise<unknown>;
    sendNotificationToDeliveryBoy(playerId: any, title: any, message: any): Promise<unknown>;
    sendNotification(playerId: any, title: any, message: any, isAll?: boolean): Promise<unknown>;
}
