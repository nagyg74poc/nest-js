import {Injectable} from '@nestjs/common';
import {WalletService} from '../../services/wallet.service';

@Injectable()
export class WalletManager {

    constructor(private readonly walletService: WalletService) {}

    getBalance(customerId: number): any {
        return this.walletService.customerBalances(customerId);
    }

    responseHandler(response){
        this.walletService.responseHandler(response);
    }

    errorHandler(err, status?: number){
        this.walletService.errorHandler(err, status || null);
    }
}
