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
import { ModalService } from 'src/app/services/modal.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';
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
  bp$ = this.bpService.activeBreakpoint;
  constructor(private store: Store, private bpService: BreakpointService) {}
  ngOnInit() {
    this.store.dispatch(AdminActions.loadUsersAttempt());
  }
  viewUser(user: User) {
    this.store.dispatch(AdminActions.viewUserAttempt({ user }));
  }
}
