import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat/chat.service';
import { ChatSaveDTO } from './chat/chat.model';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    constructor(chatService: ChatService);
    server: Server;
    private logger;
    handleConnection(client: Socket, ...args: any[]): any;
    handleDisconnect(client: Socket): any;
    afterInit(server: Server): any;
    messageUserToStore(chatData: ChatSaveDTO): Promise<void>;
    messageStoreToUser(chatData: ChatSaveDTO): Promise<void>;
    sendOrderStatusNotificationToAdmin(orderData: any): void;
    newOrderForDeliveryBoy(orderData: any): void;
    sendProductOutOfStocksNotificationToAdmin(productOutOfStockData: any): void;
}
