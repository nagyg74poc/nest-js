import {ClientConfig, RestClient, ClientData} from './rest.client';

export class WalletClient extends RestClient {
    private config: ClientConfig;

    public constructor(config: ClientConfig) {
        const walletConfig = Object.assign({}, config);
        if (walletConfig.services.wallet.PASSWORD){
            walletConfig.properties.PASSWORD = walletConfig.services.wallet.PASSWORD;
        }
        if (walletConfig.services.wallet.USERNAME){
            walletConfig.properties.USERNAME = walletConfig.services.wallet.USERNAME;
        }
        super(walletConfig);

        this.config = walletConfig;
    }

    public customerBalances(customerID: number) {
        const data: ClientData = {};

        data.data = { sessionToken: '' };
        return this.get(`${this.config.services.wallet.BALANCE_URL}/${customerID}`, data);
    }

    public responseHandler(response){
        super.responseHandler(response);
    }

    public errorHandler(err, status?:number){
        super.errorHandler(err, status || null);
    }
}