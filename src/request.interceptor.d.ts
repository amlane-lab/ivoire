import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UtilService } from './utils/util.service';
export declare class RequestInterceptor implements NestInterceptor {
    private utilService;
    constructor(utilService: UtilService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
