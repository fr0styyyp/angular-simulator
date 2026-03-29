import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { LoaderService } from './loader.service';
import { UserApiService } from './user-api.service';
import { MessageService } from './message.service';
import { IUser } from './interfaces/IUser';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  loaderService: LoaderService = inject(LoaderService);
  userApiService: UserApiService = inject(UserApiService);
  messageService: MessageService = inject(MessageService);
  
  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }
  
  getUsers(): Observable<IUser[]> {
    return this.users$;
  }
  
  loadUsers(): void {
    this.loaderService.show();
    
    this.userApiService.getUsers()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = `Ошибка ${error.status}: ${'Не удалось загрузить данные'}`;
          this.messageService.showError(errorMessage);
          return of([]);
        }),
        finalize(() => this.loaderService.hide())
      ).subscribe(data => this.setUsers(data));
  }
  
}
