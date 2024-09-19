import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { confirmPassword } from '../../shared/utalitize/confirm-password.utils';
import { signupValidators } from '../../shared/validators/register.validators';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isBtnSubmit: boolean = false;
  errorMessage: string = '';
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  register: FormGroup = this._FormBuilder.group(
    {
      name: [null, signupValidators.name],
      email: [null, signupValidators.email],
      password: [null, signupValidators.password],
      rePassword: [null],
    },
    { validators: [confirmPassword] }
  );

  // register = new FormGroup(
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
    if (this.register.valid) {
      // console.log(this.register);
      // console.log(this.register.value);   دي كدا ال هبعتهل للباك اند
      this._AuthService.signup(this.register.value).subscribe({
        next: (res) => {
          // console.log(res);
          // console.log(this.isBtnSubmit);
          if (res.message == 'success') {
            this._Router.navigate(['/signin']);
            this.isBtnSubmit = false;
          }
        },
        error: (err: HttpErrorResponse) => {
          // console.log(err.error.message);
          this.errorMessage = err.error.message;
          this.isBtnSubmit = false;
          // console.log(this.isBtnSubmit);
        },
      });
    } else {
      // this.register.get('rePassword')?.setValue("")
      // this.register.markAllAsTouched()
      // ^^^^ when u cant use disabled and whnt when click the submit btn all the alerts appears
    }
  }
}
