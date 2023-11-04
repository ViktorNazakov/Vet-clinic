import { Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { HomePage } from './views/home/home.page';
import { ProfilePage } from './views/profile/profile.page';
import { authGuard } from './guards/auth.guard';
import { AppointmentPage } from './views/appointment/appointment.page';
import { RegisterPage } from './views/auth/register/register.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => HomePage,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => LoginComponent,
  },
  {
    path: 'register',
    loadComponent: () => RegisterPage,
  },
  {
    path: 'profile',
    loadComponent: () => ProfilePage,
    canActivate: [authGuard],
  },
  {
    path: 'appointment',
    loadComponent: () => AppointmentPage,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    redirectTo: 'home',
  },
];
