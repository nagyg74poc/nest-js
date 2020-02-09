import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import {Logger} from '../utils/logger';
import winston from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    private logger: winston.Logger = Logger.getInstance();

    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            this.logger.info(`${req.method} ${req.baseUrl}`);
            next();
        };
    }
}