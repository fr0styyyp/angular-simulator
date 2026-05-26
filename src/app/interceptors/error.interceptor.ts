import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { MessageService } from '../message.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService: MessageService = inject(MessageService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorStatus: number = error.status;
      
      if (errorStatus === 0) {
        messageService.showError('Отсутствует подключение к интернету')
      }
      if (errorStatus >= 500) {
        messageService.showError('Внутренняя ошибка сервера. Попробуйте позже')
      }
      
      return throwError(() => error);
    })
  );
};
