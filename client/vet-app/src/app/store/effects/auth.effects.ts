import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthAPIActions } from '../actions/auth.actions';
import { catchError, exhaustMap, first, map, of, switchMap, timer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  onLoginAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.loginAttempt),
      switchMap((data) =>
        /** Replace With API Request */
        timer(2000).pipe(
          first(),
          map(() => {
            if (
              data.username === 'guestuser' &&
              data.password === 'guestpassword'
            ) {
              this.router.navigate(['/home']);
              this.sService.setToken('sample-token-delete');
              return { type: '[Auth API] Login Success' };
            } else
              return {
                type: '[Auth API] Login Error',
                error: 'Invalid Credentials',
              };
          }),
          catchError(() => of({ type: '[Auth API] Login Error' }))
        )
      )
    )
  );
  onRegisterAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.registerAttempt),
      switchMap((data) =>
        /** Replace With API Request */
        this.aService
          .registerAccount(data.username, data.email, data.password)
          .pipe(
            first(),
            map((res: any) => {
              console.log(res);
              return {
                type: '[Auth API] Register Success',
                token: res.token,
              };
            }),
            catchError(() => of({ type: '[Auth API] Register Error' }))
          )
      )
    )
  );
  onAccountCheck$ = createEffect(() =>
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

  onLogoutAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.logoutAttempt),
      exhaustMap(() =>
        timer(1000).pipe(
          first(),
          map(() => ({ type: '[Auth API] Logout' }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private router: Router,
    private sService: StorageService,
    private aService: AuthService
  ) {}
}
