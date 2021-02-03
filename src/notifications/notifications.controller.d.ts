import { UsersDTO } from '../users/users.model';
import { NotificationService } from './notifications.service';
import { UtilService } from '../utils/util.service';
import { CommonResponseModel, AdminQuery } from '../utils/app.model';
import { SendNotificationDTO, readNotificationDTO } from './notifications.model';
import { PushService } from '../utils/push.service';
export declare class NotificationController {
    private notificationService;
    private utilService;
    private pushService;
    constructor(notificationService: NotificationService, utilService: UtilService, pushService: PushService);
    getAllNotification(user: UsersDTO, adminQuery: AdminQuery): Promise<CommonResponseModel>;
    getLastNotifications(user: UsersDTO): Promise<CommonResponseModel>;
    sendToAll(user: UsersDTO, notificationData: SendNotificationDTO): Promise<CommonResponseModel>;
    readNotification(user: UsersDTO, notificationData: readNotificationDTO): Promise<CommonResponseModel>;
}
