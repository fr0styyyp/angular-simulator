import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { IAppConfig } from '../interfaces/IAppConfig';
import { inject } from '@angular/core';
import { APP_CONFIG_TOKEN } from '../tokens/app-config.token';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const appConfig: IAppConfig = inject(APP_CONFIG_TOKEN);
  
  if (!appConfig.enableLogs) {
    return next(req);
  }
  
  const start: number = performance.now();
  let status: number;
  
  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        if (event.type === HttpEventType.Response) {
          status = event.status;
        }
      },
      error: (error: HttpErrorResponse) => {
        status = error.status;
      },
    }),
    finalize(() => {
      const end: number = performance.now();
      const duration: number = end - start;

      console.log('HTTP Request Info:', {
        method: req.method,
        url: req.url,
        status: status,
        durationMs: parseFloat(duration.toFixed(2)),
      });
    }),
  );
};
