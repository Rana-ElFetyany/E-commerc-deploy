import { Component, inject } from '@angular/core';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { HttpErrorResponse } from '@angular/common/http';
import { signupValidators } from '../../shared/validators/register.validators';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AlertErrorComponent ,NgClass, ReactiveFormsModule,RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  isBtnSubmit: boolean = false;
  errorMessage: string = '';
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  login: FormGroup = this._FormBuilder.group(
    {
      email: [null, signupValidators.email],
      password: [null, signupValidators.password],
    },
  );

  // login = new FormGroup(
  //   {
  //     name: new FormControl(null, signupValidators.name),
  //     email: new FormControl(null, signupValidators.email),
  //     password: new FormControl(null, signupValidators.password),
  //     rePassword: new FormControl(null),
  //   },
  //   confirmPassword
  // );

  sendData() {
    this.isBtnSubmit = true;
    if (this.login.valid) {
      this._AuthService.signin(this.login.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this._Router.navigate(['/home']);
            this.isBtnSubmit = false;
            localStorage.setItem('token', res.token)
            this._AuthService.saveUserData()
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          this.isBtnSubmit = false;
        },
      });
    }
  }
}
