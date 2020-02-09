import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import winston from 'winston';
import {Logger} from '../utils/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    private logger: winston.Logger = Logger.getInstance();

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();


        this.logger.info(`Call to ${request.url} was successful`);
        this.logger.debug(`Response to ${request.url} was errorous: ${JSON.stringify(exception.message)}`, new Date().toISOString());
        response
            .status(status)
            .json(exception.message);
    }
}