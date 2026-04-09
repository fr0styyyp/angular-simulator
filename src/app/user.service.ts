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
  private readonly USERS_KEY: string = 'users_cache';
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  
  private syncStorage(users: IUser[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }
  
  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.syncStorage(users);
  }
  
  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }
  
  loadUsers(forceUpdate: boolean = false): Observable<IUser[]> {
    const cachedUsers: string | null = localStorage.getItem(this.USERS_KEY);
    if(!forceUpdate && cachedUsers) {
      const users: IUser[] = JSON.parse(cachedUsers);
      if (users.length > 0) {
        this.usersSubject.next(users);
        return of(users);
      }
    }
    this.loaderService.show();
    return this.userApiService.getUsers()
      .pipe(
        tap((data: IUser[]) => {
          this.setUsers(data)
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage: string = `Ошибка ${ error.status }: Не удалось загрузить данные`;
          this.messageService.showError(errorMessage);
          
          return of([]);
        }),
        finalize(() => this.loaderService.hide())
      );
  }
  
  addUser(user: IUser): void {
    const currentUsers = this.getUsers();
    const updatedUsers = [...currentUsers, user];
    this.usersSubject.next(updatedUsers);
    this.syncStorage(updatedUsers);
  }
  
  deleteUser(userId: number): void {
    const currentUsers = this.getUsers();
    const updatedUsers = currentUsers.filter(user => user.id !== userId);
    this.usersSubject.next(updatedUsers);
    this.syncStorage(updatedUsers);
  }
  
}
