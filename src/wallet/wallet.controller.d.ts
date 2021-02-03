import { UsersDTO } from '../users/users.model';
import { CommonResponseModel, UserQuery } from '../utils/app.model';
import { WalletService } from './wallet.service';
import { UtilService } from '../utils/util.service';
export declare class WalletController {
    private walletService;
    private utilService;
    constructor(walletService: WalletService, utilService: UtilService);
    walletHistory(user: UsersDTO, userQuery: UserQuery): Promise<CommonResponseModel>;
}
