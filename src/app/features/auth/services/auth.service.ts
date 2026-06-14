import { inject, Injectable } from '@angular/core';
import { IAuthUser } from '../interfaces/IAuthUser';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  
  private authSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  auth$: Observable<IAuthUser | null> = this.authSubject.asObservable();
  
  constructor() {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      this.authSubject.next(JSON.parse(user));
    }
  }
  
  login(username: string, password: string): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>('https://dummyjson.com/auth/login', {username, password}).pipe(
      tap((res: IAuthResponse) => {
        this.authSubject.next(res);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        const formattedRes: string = JSON.stringify(res);
        localStorage.setItem('user', formattedRes);
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.authSubject.next(null);
    this.router.navigate(['/login']);
  }
  
  refreshToken(): Observable<IAuthResponse> {
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    return this.http.post<IAuthResponse>('https://dummyjson.com/auth/refresh', {refreshToken}).pipe(
      tap((res: IAuthResponse) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
    )
  }
  
}
