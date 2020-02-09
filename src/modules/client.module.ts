import {Module} from '@nestjs/common';
import {APP_FILTER} from '@nestjs/core';
import {WalletService} from '../services/wallet.service';
import {HttpExceptionFilter} from '../filters/http-exception.filter';

@Module({
    providers: [
        WalletService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class ClientModule {
}
