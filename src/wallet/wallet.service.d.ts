import { Model } from 'mongoose';
import { WalletDTO, WalletSaveDTO } from './wallet.model';
export declare class WalletService {
    private readonly walletModel;
    constructor(walletModel: Model<any>);
    walletHistory(userId: string, page: number, limit: number): Promise<Array<WalletDTO>>;
    countWalletHistory(userId: string): Promise<number>;
    cancelOrder(walletData: WalletSaveDTO): Promise<WalletDTO>;
    orderModified(walletData: WalletSaveDTO): Promise<WalletDTO>;
    madeOrder(walletData: WalletSaveDTO): Promise<WalletDTO>;
}
