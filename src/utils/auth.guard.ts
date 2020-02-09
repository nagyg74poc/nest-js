import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Observable} from 'rxjs';
import {authService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return authService.validate(request.user);
    }
}
