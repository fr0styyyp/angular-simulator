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
  private readonly USERS_KEY: string = 'users';
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  
  private syncToStorage(users: IUser[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }
  
  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.syncToStorage(users);
  }
  
  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }
  
  loadUsers(): Observable<IUser[]> {
    const cachedUsers: string | null = localStorage.getItem(this.USERS_KEY);
    if (cachedUsers) {
      const users: IUser[] = JSON.parse(cachedUsers);
      if (users.length > 0) {
        return of(users);
      }
    }
    this.loaderService.show();
    return this.userApiService.getUsers()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage: string = `Ошибка ${ error.status }: Не удалось загрузить данные`;
          this.messageService.showError(errorMessage);
          
          return of([]);
        }),
        finalize(() => this.loaderService.hide())
      );
  }
  
  addUser(user: IUser): void {
    const currentUsers: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = [...currentUsers, user];
    this.setUsers(updatedUsers);
  }
  
  deleteUser(userId: number): void {
    const currentUsers: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = currentUsers.filter((user: IUser) => user.id !== userId);
    this.setUsers(updatedUsers);
  }
  
}
