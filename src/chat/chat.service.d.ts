import { Model } from 'mongoose';
import { UtilService } from '../utils/util.service';
import { ChatSaveDTO, ChatDTO } from './chat.model';
export declare class ChatService {
    private readonly chatModel;
    private utilService;
    constructor(chatModel: Model<any>, utilService: UtilService);
    getAllUserChat(userId: string, page: number, limit: number): Promise<Array<any>>;
    getAllChatGroup(page: number, limit: number): Promise<Array<any>>;
    saveChat(chatData: ChatSaveDTO): Promise<ChatDTO>;
}
