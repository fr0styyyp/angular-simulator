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
  
  @Output() userCreated: EventEmitter<IUser> = new EventEmitter<IUser>();
  
  private fb: FormBuilder = inject(FormBuilder);
  
  createUserForm: FormGroup = this.fb.group({
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
  
  checkEmpty(value: string): string {
    if (value) {
      return value;
    } else {
      return 'Неизвестно';
    }
  }
  
  onSubmit(): void {
    if (this.createUserForm.valid) {
      const rawValue: IUser = this.createUserForm.getRawValue();
      
      const newUser: IUser = {
        ...rawValue,
        id: Date.now(),
        website: this.checkEmpty(rawValue.website),
        address: {
          ...rawValue.address,
          suite: this.checkEmpty(rawValue.address.suite)
        },
        company: {
          ...rawValue.company,
          catchPhrase: this.checkEmpty(rawValue.company.catchPhrase),
          bs: this.checkEmpty(rawValue.company.bs)
        }
      }
      
      this.userCreated.emit(newUser);
      this.createUserForm.reset();
    }
  }
  
}
