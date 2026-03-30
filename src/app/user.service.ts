import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoaderService } from './loader.service';
import { UserApiService } from './user-api.service';
import { MessageService } from './message.service';
import { IUser } from './interfaces/IUser';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  loaderService: LoaderService = inject(LoaderService);
  userApiService: UserApiService = inject(UserApiService);
  messageService: MessageService = inject(MessageService);
  
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  
  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }
  
  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }
  
  loadUsers(): Observable<IUser[]> {
    this.loaderService.show();
    return this.userApiService.getUsers()
      .pipe(
        tap((data: IUser[]): void => {
          this.setUsers(data);
        }),
        catchError((error: HttpErrorResponse): Observable<IUser[]> => {
          const errorMessage = `Ошибка ${error.status}: Не удалось загрузить данные`;
          this.messageService.showError(errorMessage);
          return of([]);
        }),
        finalize((): void => this.loaderService.hide())
      );
  }
  
}
