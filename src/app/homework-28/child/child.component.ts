import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { IUser } from '../IUser';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  
  @Input({ required: true }) user!: IUser;
  
    // способ исправления №2
    refresh(): void {
      this.cdr.markForCheck();
    }
  
}
