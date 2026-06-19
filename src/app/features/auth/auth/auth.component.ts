import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../message.service';
import { IAuthUser } from '../interfaces/IAuthUser';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);
  
  isLoading: boolean = false;
  
  loginForm: FormGroup = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const formValues: Record<'username' | 'password', string> = this.loginForm.value;
      this.authService.login(formValues.username, formValues.password).pipe(
        tap((res: IAuthUser) => {
          this.router.navigate(['/']);
          this.isLoading = false;
        }),
        catchError((err: HttpErrorResponse) => {
          this.isLoading = false;
          this.messageService.showError(err.error.message);
          return throwError(() => err);
        })
      ).subscribe();
    }
  }
  
}
