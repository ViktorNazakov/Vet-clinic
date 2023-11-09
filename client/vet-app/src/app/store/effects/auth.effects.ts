import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthAPIActions } from '../actions/auth.actions';
import { catchError, exhaustMap, first, map, of, mergeMap, timer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  onLoginAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.loginAttempt),
      mergeMap((data) =>
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
      mergeMap((data) =>
        /** Replace With API Request */
        this.aService
          .registerAccount(
            data.username,
            data.email,
            data.password,
            data.firstName,
            data.lastName,
            data.phone
          )
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
      mergeMap((data) => {
        const token = this.sService.getToken();
        if (!!token)
          return this.pService.getUserProfile().pipe(
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
          );
        else return of({ type: '[Auth API] Account Check Error' });
      })
    )
  );

  onLogoutAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAPIActions.logoutAttempt),
      exhaustMap(() =>
        timer(500).pipe(
          first(),
          map(() => {
            this.router.navigate(['/home']);
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
    private aService: AuthService,
    private pService: ProfileService,
    private store: Store
  ) {}
}
