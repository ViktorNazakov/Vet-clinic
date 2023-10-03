import { Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { HomePage } from './views/home/home.page';

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
    redirectTo: 'home',
  },
];
