import { CommonResponseModel, AdminQuery, UserQuery } from '../utils/app.model';
import { UtilService } from '../utils/util.service';
import { ChatService } from './chat.service';
import { UsersDTO } from '../users/users.model';
export declare class ChatController {
    private chatService;
    private utilService;
    constructor(chatService: ChatService, utilService: UtilService);
    getAllChatForUser(user: UsersDTO, userQuery: UserQuery): Promise<CommonResponseModel>;
    getAllChatGroup(user: UsersDTO, adminQuery: AdminQuery): Promise<CommonResponseModel>;
    getAllChatByUserId(user: UsersDTO, userId: string, page: number, adminQuery: AdminQuery): Promise<CommonResponseModel>;
}
