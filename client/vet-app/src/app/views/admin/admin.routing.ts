import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () => AdminUsersComponent,
  },
];
