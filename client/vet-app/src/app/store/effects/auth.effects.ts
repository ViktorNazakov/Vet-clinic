import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthAPIActions } from '../actions/auth.actions';
import { map } from 'rxjs';

export class AuthEffects {
  onLoginAttempt = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.loginAttempt),
      map(() => ({ type: '[]' }))
    )
  );
  constructor(private actions$: Actions) {}
}
