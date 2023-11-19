import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AdminActions } from '../actions/admin.actions';
import { exhaustMap, first, map } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Injectable({ providedIn: 'root' })
export class AdminEffects {
  onUsersLoad$ = createEffect(() =>
    this.$actions.pipe(
      ofType(AdminActions.loadUsersAttempt),
      exhaustMap(() =>
        this.aService.getUsers().pipe(
          first(),
          map((res) => ({ type: '[Admin] Load Users Success', users: res }))
        )
      )
    )
  );
  constructor(
    private $actions: Actions,
    private store: Store,
    private aService: AdminService
  ) {}
}
