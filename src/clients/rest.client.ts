import * as Client from'node-rest-client';
import {HttpException} from '@nestjs/common';
import {Injectable} from '@nestjs/common';
import winston from 'winston';
import {Logger} from '../utils/logger';

export interface Arguments {
    headers: any;
    requestConfig: any;
}

interface ExtendedArguments extends Arguments {
    data?: any;
    parameters?: any;
}

export interface ClientData {
    pathParameters?: any;
    queryParameters?: any;
    data?: any;
}

export interface ClientConfig {
    properties: {
        PORT: number;
        NODE_ENV: string;
        ENVIRONMENT: string;
        WINSTON_LOG_LEVEL: string;
        APP_SECRET: string;
        BASIC_AUTHENTICATION: string;
        APP_COOKIE_DOMAIN_NAME: string;
        AUTH_TOKEN: string;
        CONNECTION_TIMEOUT: number;
        USERNAME: string;
        PASSWORD: string;
    };
    services: any;
}

@Injectable()
export abstract class RestClient {
    private client: any;

    private baseConfig: ClientConfig;

    private logger: winston.Logger = Logger.getInstance();

    private requestConfig: any;

    private headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'content-type': 'application/json'
    };

    protected constructor(baseConfig: ClientConfig) {
        this.baseConfig = baseConfig;

        this.client = new Client.Client({ user: baseConfig.properties.USERNAME, password: baseConfig.properties.PASSWORD });

        if (baseConfig.properties.CONNECTION_TIMEOUT) {
            this.requestConfig = {
                timeout: baseConfig.properties.CONNECTION_TIMEOUT
            };
        }
    }

    protected getCallArgs(): Arguments {
        return {
            headers: this.headers,
            requestConfig: this.requestConfig
        };
    }

    protected replacePathParameters(url: string, parameters: any): string {
        if (!parameters) return url;

        let result: string = url;

        for (let parameter in parameters) {
            let regex = new RegExp(`{${parameter}}`, 'i');
            result = result.replace(regex, parameters[parameter]);
        }

        return result;
    }

    private doCall(method: Function, url: string, requestData: ClientData): Promise<any> {
        let completedUrl = url;
        let args: ExtendedArguments = this.getCallArgs();

        if (requestData.data && requestData.data.sessionToken) {
            args.headers = Object.assign({}, args.headers, {
                'X-AUTH-TOKEN': requestData.data.sessionToken
            });
        }

        if (requestData) {
            completedUrl = this.replacePathParameters(url, requestData.pathParameters);

            args.data = requestData.data;
            args.parameters = requestData.queryParameters;
        }

        this.logger.info(`Calling ${completedUrl}`);

        if (args.data) {
            this.logger.debug(`Calling ${completedUrl} with payload: ${JSON.stringify(args.data)}`);
        }

        return new Promise((resolve, reject) => {
            method(completedUrl, args, (data: any, response: any) => {
                if (response.statusCode.toString().startsWith('20')) {
                    this.logger.info(`Call to ${completedUrl} was successful`);
                    this.logger.debug(`Response to ${completedUrl} was: `, data);
                    resolve(data);
                } else if (data.errors) {
                    this.logger.info(`Call to ${completedUrl} has errors`);
                    this.logger.debug(`Response to ${completedUrl} was: `, data);
                    reject(data);
                } else {
                    this.logger.info(`Call to ${completedUrl} has errors`);
                    this.logger.debug(`Response to ${completedUrl} was: `, response);
                    reject(data);
                }
            })
                .on('error', (err: any) => {
                    this.logger.error(`Error calling ${completedUrl}: ${err.message}`);
                    reject(err);
                })
                .on('requestTimeout', (err: any) => {
                    this.logger.error(`Connection to server timed out: ${completedUrl}`);
                    reject(err);
                });
        });
    }

    protected post(url: string, requestData: ClientData): Promise<any> {
        return this.doCall(this.client.post, url, requestData);
    }

    protected get(url: string, requestData: ClientData): Promise<any> {
        return this.doCall(this.client.get, url, requestData);
    }

    protected put(url: string, requestData: ClientData): Promise<any> {
        return this.doCall(this.client.put, url, requestData);
    }

    protected del(url: string, requestData: ClientData): Promise<any> {
        return this.doCall(this.client.delete, url, requestData);
    }

    protected responseHandler(response){
        return response;
    }

    protected errorHandler(err, status?: number){
        if (err.errors){
            let error = err.errors[0];
            throw new HttpException({
                status: error.code,
                error: error.description,
            }, status || 500);
        }
    }
}
