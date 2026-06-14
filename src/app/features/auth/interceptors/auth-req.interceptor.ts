import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { LocalStorageService } from '../../../local-storage.service';

export const authReqInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  
  const token: string | null = localStorageService.getItem('accessToken');
  if (token) {
    const authReq: HttpRequest<unknown> = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`
      }
    });
    return next(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return authService.refreshToken().pipe(
            switchMap((res: IAuthResponse) => {
              return next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${ res.accessToken }`
                  }
                })
              );
            }),
            catchError((refreshErr: HttpErrorResponse) => {
              authService.logout();
              return throwError(() => refreshErr);
            })
          );
        }
        return throwError(() => err);
      })
    );
  }
  
  return next(req);
};
