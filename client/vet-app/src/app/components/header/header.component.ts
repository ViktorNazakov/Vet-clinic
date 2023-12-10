import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getAuthReqs,
  getUserRole,
  getValidation,
} from 'src/app/store/selectors/auth.selectors';
import { AuthAPIActions } from 'src/app/store/actions/auth.actions';
import { ProgressBarModule } from 'primeng/progressbar';
import { debounceTime } from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, ProgressBarModule],
  templateUrl: './header.component.html',
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          height: '100px',
          opacity: 1,
          backgroundColor: 'yellow',
        })
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.8,
          backgroundColor: 'blue',
        })
      ),
    ]),
  ],
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  auth = this.store.select(getAuthReqs).pipe(debounceTime(0));
  role = this.store.select(getUserRole).pipe(debounceTime(0));
  validated = this.store.select(getValidation).pipe(debounceTime(0));
  constructor(private store: Store) {}
  logout() {
    this.store.dispatch(AuthAPIActions.logoutAttempt());
  }
}
