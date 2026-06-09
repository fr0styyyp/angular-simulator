import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { MessageService } from '../message.service';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const messageService: MessageService = inject(MessageService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorStatus: number = error.status;
      
      if (errorStatus === 0) {
        messageService.showError('Отсутствует подключение к интернету');
      }
      
      if (errorStatus >= 500) {
        messageService.showError('Внутренняя ошибка сервера. Попробуйте позже');
      }
      if (errorStatus >= 400) {
        messageService.showError('Неправильный URL или отсутствие прав')
      }
      
      return throwError(() => error);
    })
  );
};
