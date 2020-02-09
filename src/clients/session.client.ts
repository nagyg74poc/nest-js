import {ClientConfig, RestClient} from './rest.client';

export class SessionClient extends RestClient {
    private config: ClientConfig;

    public constructor(config: ClientConfig) {
        super(config);

        this.config = config;
    }

    public sessionData(sessionToken: string) {
        return this.get(`${this.config.services.session.SESSION_URL}/${sessionToken}`, {});
    }

    public responseHandler(response){
        super.responseHandler(response);
    }

    public errorHandler(err, status?:number){
        super.errorHandler(err, status || null);
    }
}