import {Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import {APP_FILTER} from '@nestjs/core';
import {CookieParserMiddleware} from '@nest-middlewares/cookie-parser';
import {LoggerMiddleware} from '../middlewares/logger.middleware';
import {JWTMiddleware} from '../middlewares/jwt.middleware';
import {WalletModule} from './wallet.module';
import {HttpExceptionFilter} from '../filters/http-exception.filter';

@Module({
    imports: [WalletModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        }
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                CookieParserMiddleware,
                JWTMiddleware,
                LoggerMiddleware
            )
            .with('ApplicationModule')
            .forRoutes('*');
    }
}
