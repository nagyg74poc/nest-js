import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ClientModule} from './client.module';
import {WalletService} from '../services/wallet.service';

@Module({
    imports: [
        ClientModule,
        JwtModule.register({secretOrPrivateKey: process.env.APP_SECRET})
    ],
    providers: [WalletService],
})
export class AuthModule {}
