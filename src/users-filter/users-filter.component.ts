import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {
  
  @Output() filter: EventEmitter<string> = new EventEmitter<string>();
  
  filterControl: FormControl = new FormControl('');
  
  constructor() {
    this.filterControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap((value: string | null) => this.filter.emit(value ?? '')),
      takeUntilDestroyed()
    ).subscribe();
  }
  
}
