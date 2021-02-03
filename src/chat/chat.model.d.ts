import * as mongoose from 'mongoose';
export declare enum ChatSenyByType {
    USER = "USER",
    STORE = "STORE"
}
export declare const ChatSchema: mongoose.Schema<any>;
export declare class ChatSaveDTO {
    userId: string;
    userName: string;
    storeId: string;
    message: string;
    sentBy: string;
}
export declare class ChatDTO extends ChatSaveDTO {
    updatedAt: string;
    sentBy: string;
}
