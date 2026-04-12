import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../app/interfaces/IUser';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  
  @Input({ required: true }) user!: IUser;
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  
  onDeleteClick(): void {
    this.onDelete.emit(this.user.id);
  }
  
}
