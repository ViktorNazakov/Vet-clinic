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
        this.aService.loginAccount(data.username, data.password).pipe(
          map((res: any) => {
            this.router.navigate(['/home']);
            this.sService.setToken(res.token);
            return { type: '[Auth API] Login Success', token: res.token };
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
              this.router.navigate(['/login']);
              return {
                type: '[Auth API] Register Success',
              };
            }),
            catchError((err: any) => {
              return of({
                type: '[Auth API] Register Error',
                error: err.error.message,
              });
            })
          )
      )
    )
  );
  onAccountCheck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.accountCheck),
      switchMap((data) =>
        timer(500).pipe(
          first(),
          map(() => {
            if (data.token) {
              return {
                type: '[Auth API] Account Check Success',
                token: data.token,
              };
            } else
              return {
                type: '[Auth API] Account Check Error',
              };
          })
        )
      )
    )
  );

  onLogoutAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.logoutAttempt),
      exhaustMap(() =>
        timer(500).pipe(
          first(),
          map(() => {
            this.sService.clearToken();
            return { type: '[Auth API] Logout' };
          })
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
