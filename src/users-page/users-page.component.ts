import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../app/user.service';
import { Observable } from 'rxjs';
import { IUser } from '../app/interfaces/IUser';

@Component({
  selector: 'app-users-page',
  imports: [FormsModule, CommonModule, AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  
  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;
  
  constructor() {
    this.userService.loadUsers().subscribe();
  }
  
}