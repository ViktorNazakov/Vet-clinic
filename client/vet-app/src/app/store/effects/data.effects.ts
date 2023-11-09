import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DATA_ACTIONS } from '../actions/data.actions';
import { first, map, switchMap, timer } from 'rxjs';
import { Vet } from 'src/app/models/user.models';

@Injectable({ providedIn: 'root' })
export class DataEffects {
  tempVets: Vet[] = [
    {
      id: '123123123',
      name: 'John Stevens',
      specialty: 'Dog Specialist',
    },
  ];
  onVetsLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DATA_ACTIONS.loadVets),
      switchMap(() =>
        timer(2000).pipe(
          first(),
          map(() => ({ type: '[Data] Load Vets Success', vets: this.tempVets }))
        )
      )
    )
  );
  constructor(private actions$: Actions) {}
}
