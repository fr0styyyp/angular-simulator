import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../app/interfaces/IUser';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  
  @Output() onUserCreate: EventEmitter<IUser> = new EventEmitter<IUser>();
  
  private fb: FormBuilder = inject(FormBuilder);
  
  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    address: this.fb.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]],
      })
    }),
    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]],
    })
  });
  
  private cleanEmptyStrings<T extends object>(obj: T): T {
    const cleaned = { ...obj } as any;
    
    for (const key in cleaned) {
      const value = cleaned[key];
      
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        cleaned[key] = this.cleanEmptyStrings(value);
      } else if (typeof value === 'string') {
        cleaned[key] = this.checkEmpty(value);
      }
    }
    
    return cleaned as T;
  }
  
  checkEmpty(value: string): string {
    if (value) {
      return value;
    } else {
      return 'Неизвестно';
    }
  }
  
  onSubmit(): void {
    if (this.userForm.valid) {
      const rawValue: IUser = this.userForm.getRawValue();
      
      const newUser: IUser = {
        ...this.cleanEmptyStrings(rawValue),
        id: Date.now(),
      }
      
      this.onUserCreate.emit(newUser);
      this.userForm.reset();
    }
  }
  
}
