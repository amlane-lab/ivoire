"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const common_2 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const util_service_1 = require("./util.service");
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(userService, utilService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        });
        this.userService = userService;
        this.utilService = utilService;
        if (!process.env.SECRET)
            console.log("SECRET not set.");
    }
    async validate(payload) {
        const { _id } = payload;
        const userInfo = await this.userService.getUserById(_id);
        if (userInfo && !userInfo.status)
            this.utilService.unauthorized();
        return userInfo;
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UserService,
        util_service_1.UtilService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
class OptionalJwtAuthGuard extends passport_1.AuthGuard('jwt') {
    handleRequest(err, user, info, context) {
        return user;
    }
}
exports.OptionalJwtAuthGuard = OptionalJwtAuthGuard;
exports.GetUser = common_2.createParamDecorator((data, req) => {
    return req.user;
});
//# sourceMappingURL=jwt.strategy.js.map