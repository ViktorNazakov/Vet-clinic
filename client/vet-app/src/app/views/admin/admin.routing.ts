import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminMedsComponent } from './admin-meds/admin-meds.component';

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
  {
    path: 'meds',
    loadComponent: () => AdminMedsComponent,
  },
];
