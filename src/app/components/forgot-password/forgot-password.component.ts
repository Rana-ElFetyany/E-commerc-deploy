import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { signupValidators } from '../../shared/validators/register.validators';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  steps: number = 1;
  isBtnSubmit: boolean = false;
  isValid: boolean = false;
  errorMessage: string = '';
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  forgotPassword: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  verifyResetCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required]],
  });

  resetPassword: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, signupValidators.password],
  });

  submitStep1() {
    this.isBtnSubmit = true;
    if (this.forgotPassword.valid) {
      let email = this.forgotPassword.get('email')?.value;
      this.resetPassword.get('email')?.setValue(email);
      this._AuthService.forgotPassword(this.forgotPassword.value).subscribe({
        next: (res) => {
          this.steps = 2;
          localStorage.setItem('currentStep', this.steps.toString());
          localStorage.setItem( 'currentEmail', email);
          this.isBtnSubmit = false;
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          this.isBtnSubmit = false;
        },
      });
    }
  }
  submitStep2() {
    this.isBtnSubmit = true;
    if (this.verifyResetCode.valid) {
      this._AuthService.verifyResetCode(this.verifyResetCode.value).subscribe({
        next: (res) => {
          this.steps = 3;
          localStorage.setItem('currentStep', this.steps.toString());
          this.isBtnSubmit = false;
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          this.isBtnSubmit = false;
        },
      });
    }
  }
  submitStep3 = () => {
    this.isBtnSubmit = true;
    if (this.resetPassword.valid) {
      this._AuthService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.isBtnSubmit = false;
          this._AuthService.saveUserData();
          localStorage.setItem('token', res.token);
          localStorage.removeItem('currentStep');
          localStorage.removeItem('currentEmail');
          this._Router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          this.isBtnSubmit = false;
        },
      });
    }
  }
  
  navigateForgot = () => {
    this.steps = 1;
  }
navigateVerify = () => {
  if (parseInt(localStorage.getItem('currentStep') || '1') > this.steps) {
    this.steps = 2;
  }
}
  navigateReset = () => {
   if (parseInt(localStorage.getItem('currentStep') || '1') > this.steps) {
 this.steps = 3;   }
  }


ngOnInit(): void {
  this.steps = parseInt(localStorage.getItem('currentStep') || '1');
  this.resetPassword
    .get('email')
    ?.setValue(localStorage.getItem('currentEmail'));
}
}
