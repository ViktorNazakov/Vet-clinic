import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Validators,
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthAPIActions } from 'src/app/store/actions/auth.actions';
import { getRegisterStatus } from 'src/app/store/selectors/auth.selectors';
import { IonicModule } from '@ionic/angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ButtonModule,
    PageTitleComponent,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerStatus = this.store.select(getRegisterStatus);
  registerForm = this.fBuilder.group(
    {
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
    },
    { validator: this.ComparePassword('password', 'repeatPassword') }
  );
  constructor(private fBuilder: FormBuilder, private store: Store) {}
  attemptRegister() {
    if (this.registerForm.valid) {
      this.store.dispatch(
        AuthAPIActions.registerAttempt({
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
          email: this.registerForm.value.email,
        })
      );
    }
  }
  ComparePassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
