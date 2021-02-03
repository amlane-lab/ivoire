import { UserService } from '../users/users.service';
import { UtilService } from './util.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    private utilService;
    constructor(userService: UserService, utilService: UtilService);
    validate(payload: any): Promise<import("../users/users.model").UsersDTO>;
}
declare const OptionalJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class OptionalJwtAuthGuard extends OptionalJwtAuthGuard_base {
    handleRequest(err: any, user: any, info: any, context: any): any;
}
export declare const GetUser: (...dataOrPipes: any[]) => ParameterDecorator;
export {};
