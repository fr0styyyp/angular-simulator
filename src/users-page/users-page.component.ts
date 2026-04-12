import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../app/user.service';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { IUser } from '../app/interfaces/IUser';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-users-page',
  imports: [FormsModule, CommonModule, AsyncPipe, UserCardComponent, CreateUserComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  
  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;
  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchTerm$: Observable<string> = this.searchTermSubject.asObservable();
  
  filteredUsers$: Observable<IUser[]> = combineLatest([
    this.users$,
    this.searchTerm$
  ]).pipe(
      map(([users, term]: [IUser[], string]) => {
        const filterValue: string = term.toLowerCase().trim();
        if (!filterValue) {
          return users;
        }
        return users.filter((user: IUser) => 
          user.name.toLowerCase().includes(filterValue)
        );
      })
    );
  
  ngOnInit() {
    this.fetchAndSetUsers(this.userService.loadUsers());
  }
  
  private fetchAndSetUsers(source$: Observable<IUser[]>): void {
    source$.pipe(
      tap((data: IUser[]) => this.userService.setUsers(data))
    ).subscribe();
  }
  
  onUserAdd(user: IUser): void {
    this.userService.addUser(user);
  }
  
  onUserDelete(id: number): void {
    this.userService.deleteUser(id);
  }
  
  onRefresh(): void {
    this.fetchAndSetUsers(this.userService.userApiService.getUsers());
  }
  
  onSearch(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.searchTermSubject.next(input.value);
  }
  
}