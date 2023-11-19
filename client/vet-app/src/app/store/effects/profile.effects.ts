import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileActions } from '../actions/profile.actions';
import { catchError, exhaustMap, first, map, of, switchMap, timer } from 'rxjs';
import { Appointment, Pet } from 'src/app/models/user.models';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthAPIActions } from '../actions/auth.actions';

@Injectable()
export class ProfileEffects {
  tempDetails: {
    pets: Pet[];
    appointments: Appointment[];
  } = {
    pets: [
      { name: 'Chocho', id: '1', specie: 'dog' },
      { name: 'Djesa', id: '2', specie: 'dog' },
    ],
    appointments: [
      { id: '1', doctor: 'Dr. John', time: new Date() },
      { id: '2', doctor: 'Dr. John 2', time: new Date() },
    ],
  };
  onProfileLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadAttempt),
      exhaustMap(() =>
        this.pService.getUserProfile().pipe(
          first(),
          map((res: any) => {
            return {
              type: '[Profile] Load Success',
              id: res.userId,
              firstName: res.fname,
              phoneNumber: res.phoneNumber,
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
  onEditProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.editAttempt),
      exhaustMap((data) =>
        this.pService
          .editUserProfile(
            data.userId,
            data.fname,
            data.lname,
            data.phoneNumber
          )
          .pipe(
            first(),
            map(() => ({ type: '[Profile] Load Attempt' }))
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
  onEditPet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.editPet),
      switchMap((data) =>
        this.pService
          .editUserPet(data.petId, data.name, data.breed, data.specie)
          .pipe(
            first(),
            map(() => {
              return { type: '[Profile] Load Pets' };
            }),
            catchError(() => of({ type: '[Profile] Edit Pet Error' }))
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
  onCreateAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.createAppointment),
      exhaustMap((data) =>
        this.pService
          .createAppointment(
            data.time,
            data.description + '',
            data.pet,
            data.vet
          )
          .pipe(
            first(),
            map(() => ({ type: '[Profile] Create Appointment Success' }))
          )
      )
    )
  );
  constructor(private actions$: Actions, private pService: ProfileService) {}
}
