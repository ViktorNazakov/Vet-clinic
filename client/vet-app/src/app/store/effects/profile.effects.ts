import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileActions } from '../actions/profile.actions';
import { catchError, first, map, of, switchMap, timer } from 'rxjs';
import { Appointment, Pet } from 'src/app/models/user.models';

@Injectable()
export class ProfileEffects {
  tempDetails: {
    pets: Pet[];
    appointments: Appointment[];
  } = {
    pets: [
      { name: 'Chocho', _id: '1', specie: 'dog' },
      { name: 'Djesa', _id: '2', specie: 'dog' },
    ],
    appointments: [
      { _id: '1', doctor: 'Dr. John', time: new Date() },
      { _id: '2', doctor: 'Dr. John 2', time: new Date() },
    ],
  };
  onProfileLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadAttempt),
      switchMap(() =>
        timer(2000).pipe(
          first(),
          map(() => ({
            type: '[Profile] Load Success',
            firstName: 'John',
            lastName: 'Einstein',
          })),
          catchError(() => of({ type: '[Profile] Load Error' }))
        )
      )
    )
  );
  onLoadPets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadPets, ProfileActions.loadSuccess),
      switchMap(() =>
        timer(500).pipe(
          first(),
          map(() => ({
            type: '[Profile] Load Pets Success',
            pets: this.tempDetails.pets,
          }))
        )
      )
    )
  );
  constructor(private actions$: Actions) {}
}
