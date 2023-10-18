import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthAPIActions } from '../actions/auth.actions';
import { catchError, exhaustMap, first, map, of, switchMap, timer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  onLoginAttempt = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.loginAttempt),
      switchMap(() =>
        /** Replace With API Request */
        timer(2000).pipe(
          first(),
          map(() => {
            this.router.navigate(['/home']);
            this.sService.setToken('sample-token-delete');
            return { type: '[Auth API] Login Success' };
          }),
          catchError(() => of({ type: '[Auth API] Login Error' }))
        )
      )
    )
  );
  onAccountCheck = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.accountCheck),
      switchMap(() =>
        timer(500).pipe(
          first(),
          map(() => ({
            type: '[Auth API] Account Check Success',
          }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private router: Router,
    private sService: StorageService
  ) {}
}
