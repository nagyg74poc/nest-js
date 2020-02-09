import {Injectable, NestMiddleware, MiddlewareFunction, HttpException, HttpStatus} from '@nestjs/common';
import {jwtService} from '../services/jwt.service';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            if (!req.user) {
                req.user = {};
            }
            req.user.jwt = req.get(process.env.AUTH_TOKEN) || req.cookies.JWT;
            if (req.user.jwt) {
                let jwtContent = jwtService.decode(req.user.jwt, null);
                if (jwtContent && jwtContent['sessionToken']) {
                    req.user.sessionToken = jwtContent['sessionToken'];
                } else {
                    throw new HttpException({
                        status: HttpStatus.UNAUTHORIZED,
                        message: 'Invalid JWT Token'}, HttpStatus.UNAUTHORIZED);
                }
            }
            next();
        };
    }
}