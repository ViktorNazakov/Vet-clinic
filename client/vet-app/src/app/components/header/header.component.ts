import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getAuthReqs,
  getValidation,
} from 'src/app/store/selectors/auth.selectors';
import { AuthAPIActions } from 'src/app/store/actions/auth.actions';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, ProgressBarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  auth = this.store.select(getAuthReqs);
  validated = this.store.select(getValidation);
  constructor(private store: Store) {}
  logout() {
    this.store.dispatch(AuthAPIActions.logoutAttempt());
  }
}