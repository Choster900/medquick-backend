import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { buildErrorResponse } from '../helpers/error-response';

@Injectable()
export class HttpExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error.status === 401) {
                    return throwError(() =>
                        buildErrorResponse(
                            error.message?.message || 'No autorizado',
                            401,
                            error.message?.errorDetails,
                            context.switchToHttp().getRequest().url
                        )
                    );
                }
                return throwError(() => error);
            })
        );
    }
}
