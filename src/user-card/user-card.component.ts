import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../app/interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhoneModePipe } from '../app/pipes/phone-mode.pipe';
import { BoldOnHoverDirective } from '../app/directives/bold-on-hover.directive';
import { AnimatedGradientDirective } from '../app/directives/animated-gradient.directive';
import { PhoneMode } from '../enums/PhoneMode';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneModePipe, BoldOnHoverDirective, AnimatedGradientDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  
  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  
  phoneMode: typeof PhoneMode = PhoneMode;
  
  onDeleteClick(): void {
    this.deleteUser.emit(this.user.id);
  }
  
}
