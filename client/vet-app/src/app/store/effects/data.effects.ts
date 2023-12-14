import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DATA_ACTIONS } from '../actions/data.actions';
import { first, map, switchMap, timer } from 'rxjs';
import { VetsService } from 'src/app/services/vets.service';

@Injectable({ providedIn: 'root' })
export class DataEffects {
  onVetsLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DATA_ACTIONS.loadVets),
      switchMap(() =>
        this.vService.getVetsList().pipe(
          first(),
          map((res) => ({ type: '[Data] Load Vets Success', vets: res }))
        )
      )
    )
  );
  constructor(private actions$: Actions, private vService: VetsService) {}
}
