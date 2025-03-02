import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

/**
 * @description check if session cookie is provided
 * @throws {UnauthorizedException} session cookie is not provided
 */
@Injectable()
export default class SessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        if (!context.switchToHttp().getRequest().session.ip) {
            throw new UnauthorizedException('session cookie is not provided');
        }

        return true;
    }
}
