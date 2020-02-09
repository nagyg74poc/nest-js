import {Injectable} from '@nestjs/common';
import {Properties} from '../utils/configuration';
import {WalletClient} from '../clients/wallet.client';

@Injectable()
export class WalletService extends WalletClient {

    public constructor() {
        super(Properties.getServicesProperties());
    }

    public responseHandler(response){
        super.responseHandler(response);
    }

    public errorHandler(err, status?:number){
        super.errorHandler(err, status || null);
    }
}