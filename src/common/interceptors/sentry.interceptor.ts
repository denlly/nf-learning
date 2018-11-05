import { Interceptor, NestInterceptor, ExecutionContext, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as Raven from 'raven';
import getEnv from '../tools/env';

const raven = Raven.config('https://caf8114e9ce84035a9387bf34cf9cc1d@sentry.io/1181332', {
    environment: getEnv(),
});

@Interceptor()
export class SentryInterceptor implements NestInterceptor {
    intercept(dataOrRequest: any, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
        // Filter exceptions of type HttpException. Ignore those that
        // have status code of less than 500
        return stream$.do(null, exception => {
            if (exception.getStatus() >= 500) {
                raven.captureException(exception as any, {
                    req: dataOrRequest,
                    user: dataOrRequest.user,
                });
            }
        });
    }
}
