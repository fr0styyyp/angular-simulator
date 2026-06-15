import { inject, Injectable } from '@angular/core';
import { IAuthUser } from '../interfaces/IAuthUser';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private authUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  authUser$: Observable<IAuthUser | null> = this.authUserSubject.asObservable();
  
  initializeApp(): Observable<IAuthUser | null> {
    const token: string | null = this.localStorageService.getItem('accessToken');
    if (token) {
      return this.http.get<IAuthUser>('https://dummyjson.com/auth/me').pipe(
        tap((user: IAuthUser) => {
          this.authUserSubject.next(user);
        }),
        catchError(() => {
          this.authUserSubject.next(null);
          return of(null);
        })
      );
    }
    
    return of(null);
  }
  
  login(username: string, password: string): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>('https://dummyjson.com/auth/login', { username, password }).pipe(
      tap((res: IAuthResponse) => {
        this.localStorageService.setItem('accessToken', res.accessToken);
        this.localStorageService.setItem('refreshToken', res.refreshToken);
        this.authUserSubject.next(res);
      })
    );
  }
  
  logout(): void {
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.removeItem('refreshToken');
    this.authUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  
  refreshToken(): Observable<IAuthResponse> {
    const refreshToken: string | null = this.localStorageService.getItem('refreshToken');
    return this.http.post<IAuthResponse>('https://dummyjson.com/auth/refresh', { refreshToken }).pipe(
      tap((res: IAuthResponse) => {
        this.localStorageService.setItem('accessToken', res.accessToken);
        this.localStorageService.setItem('refreshToken', res.refreshToken);
      })
    )
  }
  
}
