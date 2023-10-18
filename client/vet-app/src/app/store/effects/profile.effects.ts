import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileActions } from '../actions/profile.actions';
import { catchError, first, map, of, switchMap, timer } from 'rxjs';

@Injectable()
export class ProfileEffects {
  onProfileLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadAttempt),
      switchMap(() =>
        timer(2000).pipe(
          first(),
          map(() => ({ type: '[Profile] Load Success' })),
          catchError(() => of({ type: '[Profile] Load Error' }))
        )
      )
    )
  );
  constructor(private actions$: Actions) {}
}
