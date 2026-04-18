import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../app/user.service';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { IUser } from '../app/interfaces/IUser';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';

@Component({
  selector: 'app-users-page',
  imports: [FormsModule, CommonModule, AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  
  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;
  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  filteredUsers$: Observable<IUser[]> = combineLatest([
    this.users$,
    this.filterSubject
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
  
  ngOnInit(): void {
    this.loadUsers(false);
  }
  
  private loadUsers(force: boolean = false): void {
    this.userService.loadUsers(force)
      .pipe(
        tap((data: IUser[]) => this.userService.setUsers(data))
      ).subscribe();
  }
  
  onAddUser(user: IUser): void {
    this.userService.addUser(user);
  }
  
  onDeleteUser(id: number): void {
    this.userService.deleteUser(id);
  }
  
  onRefresh(): void {
    this.loadUsers(true);
  }
  
  onChangeFilter(term: string): void {
    this.filterSubject.next(term);
  }
  
}