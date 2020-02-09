import {Injectable, HttpException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {jwtService} from '../services/jwt.service';
import {SessionClient} from '../clients/session.client';
import {Properties} from "../utils/configuration";

@Injectable()
class AuthService {

    constructor(private readonly jwtService: JwtService, private sessionClient: SessionClient) {}

    public async verifySession(sessionToken) {
        try {
            let session = await this.sessionClient.sessionData(sessionToken);
            return !!session.sessionActive;
        } catch (err) {
            this.sessionClient.errorHandler(err, 401);
        }
    }

    public validate(user) {
        try {
            const jwtContent = this.jwtService.verify(user.jwt);
            if (jwtContent.sessionToken) {
                return this.verifySession(jwtContent.sessionToken);
            }
            return false;
        } catch (err) {
            throw new HttpException(err, 401);
        }
    }
}

export const authService = new AuthService(jwtService, new SessionClient(Properties.getServicesProperties()));