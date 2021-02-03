import * as mongoose from 'mongoose';
export declare enum WalletTransactionType {
    ORDER_CANCELLED = "ORDER_CANCELLED",
    ORDER_PAYMENT = "ORDER_PAYMENT",
    ORDER_MODIFIED = "ORDER_MODIFIED"
}
export declare const WalletSchema: mongoose.Schema<any>;
export declare class WalletSaveDTO {
    userId: string;
    amount: number;
    transactionType?: WalletTransactionType;
    description?: string;
    isCredited?: boolean;
    orderId: string;
    orderID: number;
}
export declare class WalletDTO {
    amount: number;
    transactionType?: string;
    description: string;
    isCredit: boolean;
    orderId: string;
    orderID: number;
    userId: string;
    createdAt: number;
}
export declare class ResponseWalletHistory {
    response_code: string;
    response_data: WalletDTO;
    total: number;
}
