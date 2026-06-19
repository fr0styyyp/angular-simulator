import { inject, Injectable } from '@angular/core';
import { IAuthUser } from '../interfaces/IAuthUser';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../local-storage.service';
import { IToken } from '../interfaces/IToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private authUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  authUser$: Observable<IAuthUser | null> = this.authUserSubject.asObservable();
  
  private readonly apiUrl: string = 'https://dummyjson.com';
  
  initializeApp(): Observable<IAuthUser | null> {
    const tokens: IToken | null = this.localStorageService.getItem<IToken>('authTokens');
    
    if (tokens?.accessToken) {
      return this.http.get<IAuthUser>(`${ this.apiUrl }/auth/me`).pipe(
        tap((user: IAuthUser) => this.authUserSubject.next(user)),
        catchError(() => {
          this.authUserSubject.next(null);
          return of(null);
        })
      );
    }
    
    return of(null);
  }
  
  getUserById(id: number): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${ this.apiUrl }/users/${ id }`)
  }
  
  login(username: string, password: string): Observable<IAuthUser> {
    return this.http.post<IAuthResponse>(`${ this.apiUrl }/auth/login`, { username, password }).pipe(
      tap((res: IAuthResponse) => {
        const tokens: IToken = { accessToken: res.accessToken, refreshToken: res.refreshToken };
        this.localStorageService.setItem('authTokens', tokens);
      }),
      switchMap((res: IAuthResponse) => this.getUserById(res.id)),
      tap((user: IAuthUser) => this.authUserSubject.next(user))
    );
  }
  
  logout(): void {
    this.localStorageService.removeItem('authTokens');
    this.authUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  
  refreshToken(): Observable<IAuthResponse> {
    const tokens: IToken | null = this.localStorageService.getItem<IToken>('authTokens');
    const refreshToken: string | undefined = tokens?.refreshToken;
    return this.http.post<IAuthResponse>(`${ this.apiUrl }/auth/refresh`, { refreshToken }).pipe(
      tap((res: IAuthResponse) => {
        const updatedTokens: IToken = { accessToken: res.accessToken, refreshToken: res.refreshToken };
        this.localStorageService.setItem('authTokens', updatedTokens);
      })
    )
  }
  
}
