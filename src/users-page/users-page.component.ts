import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../app/user.service';
import { Observable, tap } from 'rxjs';
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
  
  ngOnInit() {
    this.userService.loadUsers()
      .pipe(
        tap((data: IUser[]) => {
          this.userService.setUsers(data)
        })
      ).subscribe();
  }
  
  onUserAdd(user: IUser): void {
    this.userService.addUser(user);
  }
  
  onUserDelete(id: number): void {
    this.userService.deleteUser(id);
  }
  
  onRefresh(): void {
    this.userService.userApiService.getUsers()
      .pipe(
        tap((data: IUser[]) => {
          this.userService.setUsers(data);
        })
      ).subscribe();
  }
  
}