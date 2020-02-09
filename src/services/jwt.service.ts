import {JwtService, JwtModuleOptions} from '@nestjs/jwt';
import {Properties} from '../utils/configuration';

const jwtOptions: JwtModuleOptions = {
    secretOrPrivateKey: Properties.getProperty('APP_SECRET')
};

export const jwtService: JwtService = new JwtService(jwtOptions);