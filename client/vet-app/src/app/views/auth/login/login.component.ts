import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonModule } from 'primeng/button';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getLoginStatus } from 'src/app/store/selectors/auth.selectors';
import { AuthAPIActions } from 'src/app/store/actions/auth.actions';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    ButtonModule,
    PageTitleComponent,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginStatus = this.store.select(getLoginStatus);
  loginForm = this.fBuilder.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  constructor(private fBuilder: FormBuilder, private store: Store) {}
  attemptLogin() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        AuthAPIActions.loginAttempt({
          username: this.loginForm.value?.username
            ? this.loginForm.value.username
            : '',
          password: this.loginForm.value?.password
            ? this.loginForm.value.password
            : '',
        })
      );
    }
  }
  ionViewWillLeave() {
    this.loginForm.reset();
  }
}
