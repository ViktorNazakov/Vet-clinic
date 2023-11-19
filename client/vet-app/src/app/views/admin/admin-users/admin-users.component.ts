import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  getAdminUsersList,
  getAdminUsersLoaded,
} from 'src/app/store/selectors/admin.selectors';
import { TableModule } from 'primeng/table';
import { AdminActions } from 'src/app/store/actions/admin.actions';
import { User } from 'src/app/models/user.models';
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  users = this.store.select(getAdminUsersList);
  loaded = this.store.select(getAdminUsersLoaded);

  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(AdminActions.loadUsersAttempt());
  }
  viewUser(user: User) {}
}
