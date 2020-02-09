import {Module} from '@nestjs/common';
import {Controllers} from '../controllers/v1/index';
import {Managers} from '../managers/v1/index';
import {ClientModule} from './client.module';
import {WalletService} from '../services/wallet.service';
import {AuthModule} from './auth.module';

@Module({
    imports: [
        ClientModule,
        AuthModule
    ],
    controllers: [...Controllers],
    providers: [...Managers, WalletService],
})
export class WalletModule {}
