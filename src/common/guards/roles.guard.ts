import { Guard, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';

const logger = new Logger('RolesGuard');

@Guard()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(req, context: ExecutionContext): boolean {
        const { parent, handler } = context;
        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        }

        const user = req.user;

        if (user && user.userName === 'fanxiaodong') {
            console.log('****');
            console.log(req);
            console.log('****');
            console.log(user);
            console.log('****');
            console.log(user && user.roles && !!user.roles.find(role => !!roles.find(item => item === role)));
            console.log('****');
        }

        const hasRole = () => !!user.roles.find(role => !!roles.find(item => item === role));

        return user && user.roles && hasRole();
    }
}
