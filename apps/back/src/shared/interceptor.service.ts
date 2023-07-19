import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ReqInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req: Request = context.switchToHttp().getRequest();
    if (req.headers['maple']) {
      return next.handle().pipe(catchError(() => throwError(() => 'DB Error')));
    }
    return throwError(() => new BadRequestException('Not from MC...', { cause: new Error() }));
  }
}
