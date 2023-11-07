import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileActions } from '../actions/profile.actions';
import { catchError, first, map, of, switchMap, timer } from 'rxjs';
import { Appointment, Pet } from 'src/app/models/user.models';
import { ProfileService } from 'src/app/services/profile.service';

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
        this.pService.getUserProfile().pipe(
          first(),
          map((res: any) => {
            console.log(res);
            return {
              type: '[Profile] Load Success',
              firstName: res.fname,
              lastName: res.lname,
              username: res.username,
              email: res.email,
            };
          }),
          catchError(() => of({ type: '[Profile] Load Error' }))
        )
      )
    )
  );
  onLoadPets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadPets, ProfileActions.loadSuccess),
      switchMap(() =>
        this.pService.getUserPets().pipe(
          first(),
          map((res) => {
            return { type: '[Profile] Load Pets Success', pets: res };
          })
        )
      )
    )
  );
  onCreatePet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.createPet),
      switchMap((data) =>
        this.pService.createUserPet(data.name, data.specie, data.breed).pipe(
          first(),
          map(() => {
            return { type: '[Profile] Load Pets' };
          }),
          catchError(() => of({ type: '[Profile] Create Pet Error' }))
        )
      )
    )
  );
  onDeletePet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.deletePet),
      switchMap((data) =>
        this.pService.deleteUserPet(data.petId).pipe(
          first(),
          map(() => ({ type: '[Profile] Load Pets' }))
        )
      )
    )
  );
  constructor(private actions$: Actions, private pService: ProfileService) {}
}
