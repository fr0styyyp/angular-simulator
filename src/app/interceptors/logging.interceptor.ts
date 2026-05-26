import { HttpErrorResponse, HttpEvent, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { finalize, tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
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
      }
    }),
    finalize(() => {
      console.log(`HTTP метод запроса: ${req.method}`);
      console.log(`URL запроса: ${req.url}`);
      console.log(`Статус ответа: ${status}`);
      const end: number = performance.now();
      const duration: number = end - start;
      console.log(`Время выполнения запроса: ${duration}`);
    })
  );
};
