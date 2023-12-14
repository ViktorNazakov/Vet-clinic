import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AdminActions } from '../actions/admin.actions';
import { delay, exhaust, exhaustMap, first, map, of, switchMap } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ModalService } from 'src/app/services/modal.service';

@Injectable({ providedIn: 'root' })
export class AdminEffects {
  onUsersLoad$ = createEffect(() =>
    this.$actions.pipe(
      ofType(
        AdminActions.loadUsersAttempt,
        AdminActions.deleteUserSuccess,
        AdminActions.editUserSuccess
      ),
      switchMap(() =>
        this.aService.getUsers().pipe(
          delay(500),
          first(),
          map((res) => ({ type: '[Admin] Load Users Success', users: res }))
        )
      )
    )
  );
  onMedsLoad$ = createEffect(() =>
    this.$actions.pipe(
      ofType(
        AdminActions.loadMedsAttempt,
        AdminActions.createMedSuccess,
        AdminActions.deleteMedSuccess,
        AdminActions.editMedSuccess
      ),
      switchMap(() =>
        this.aService.getMeds().pipe(
          delay(500),
          first(),
          map((res) => ({ type: '[Admin] Load Meds Success', meds: res }))
        )
      )
    )
  );
  onUserDetailsLoad$ = createEffect(() =>
    this.$actions.pipe(
      ofType(AdminActions.viewUserAttempt),
      switchMap((data) =>
        !!data.user.userId
          ? this.aService.getUserPets(data.user.userId).pipe(
              first(),
              map((res: any) => {
                this.dService.modalViewProfile(data.user, res);
                return { type: '[Admin] Load User Success' };
              })
            )
          : of({ type: '[Admin] Load User Error' })
      )
    )
  );
  onUserDelete$ = createEffect(() =>
    this.$actions.pipe(
      ofType(AdminActions.deleteUserAttempt),
      exhaustMap((data) =>
        this.aService.deleteUser(data.id).pipe(
          first(),
          map(() => ({ type: '[Admin] Delete User Success' }))
        )
      )
    )
  );
  onUserEdit$ = createEffect(() =>
    this.$actions.pipe(
      ofType(AdminActions.editUserAttempt),
      switchMap((data) =>
        this.aService.editUser({ ...data }).pipe(
          first(),
          map(() => ({ type: '[Admin] Edit User Success' }))
        )
      )
    )
  );
  onUserPetEdit$ = createEffect(() =>
    this.$actions.pipe(
      ofType(AdminActions.editUserPetAttempt),
      exhaustMap((data) =>
        this.aService.editUserPet(data).pipe(
          first(),
          map(() => ({ type: '[Admin] Edit User Pet Success' }))
        )
      )
    )
  );
  onMedsCreate$ = createEffect(() =>
    this.$actions.pipe(
      ofType(AdminActions.createMedAttempt),
      exhaustMap((data) =>
        this.aService.createMed(data.med).pipe(
          first(),
          map(() => ({ type: '[Admin] Create Med Success' }))
        )
      )
    )
  );
  onMedsDelete$ = createEffect(() =>
    this.$actions.pipe(
      ofType(AdminActions.deleteMedAttempt),
      exhaustMap((data) =>
        this.aService.deleteMed(data.med.id || '').pipe(
          first(),
          map(() => ({ type: '[Admin] Delete Med Success' }))
        )
      )
    )
  );
  onMedsEdit$ = createEffect(() =>
    this.$actions.pipe(
      ofType(AdminActions.editMedAttempt),
      exhaustMap((data) =>
        this.aService.editMed(data.med).pipe(
          first(),
          map(() => ({ type: '[Admin] Edit Med Success' }))
        )
      )
    )
  );
  constructor(
    private $actions: Actions,
    private store: Store,
    private aService: AdminService,
    private dService: ModalService
  ) {}
}
