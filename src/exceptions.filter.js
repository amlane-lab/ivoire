"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let AllExceptionsFilter = class AllExceptionsFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = (exception instanceof Error) ? exception.message : exception.message.error;
        let errors = [];
        console.log(exception);
        if (exception.status === common_1.HttpStatus.NOT_FOUND) {
            if (message.message)
                errors.push(message.message);
            status = common_1.HttpStatus.NOT_FOUND;
        }
        if (exception.status === common_1.HttpStatus.SERVICE_UNAVAILABLE) {
            status = common_1.HttpStatus.SERVICE_UNAVAILABLE;
        }
        if (exception.status === common_1.HttpStatus.NOT_ACCEPTABLE) {
            status = common_1.HttpStatus.NOT_ACCEPTABLE;
        }
        if (exception.status === common_1.HttpStatus.EXPECTATION_FAILED) {
            status = common_1.HttpStatus.EXPECTATION_FAILED;
        }
        if (exception.status === common_1.HttpStatus.BAD_REQUEST) {
            if (message && message.message) {
                const msg = message.message;
                if (Array.isArray(msg)) {
                    for (var i = 0, l = msg.length; i < l; i++) {
                        if (msg[i] && msg[i].constraints) {
                            errors = errors.concat(Object.values(msg[i].constraints));
                        }
                        else {
                            errors = errors.concat(msg[i]);
                        }
                    }
                }
                else
                    errors.push(msg);
            }
            status = common_1.HttpStatus.BAD_REQUEST;
        }
        if (exception.status === common_1.HttpStatus.UNAUTHORIZED) {
            status = common_1.HttpStatus.UNAUTHORIZED;
        }
        response
            .status(status)
            .json({
            status,
            success: false,
            errors: errors,
            message: (status === common_1.HttpStatus.INTERNAL_SERVER_ERROR) ? 'Sorry we are experiencing technical problems.' : '',
        });
    }
};
AllExceptionsFilter = __decorate([
    common_1.Catch()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=exceptions.filter.js.map