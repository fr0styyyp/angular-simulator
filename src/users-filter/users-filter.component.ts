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
  
  @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();
  
  searchControl: FormControl = new FormControl('');
  
  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap((value: string | null) => this.onFilter.emit(value ?? '')),
      takeUntilDestroyed()
    ).subscribe()
  }
  
}
