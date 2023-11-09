import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Vet } from 'src/app/models/user.models';

export const DATA_ACTIONS = createActionGroup({
  source: 'Data',
  events: {
    'Load Vets': emptyProps(),
    'Load Vets Success': props<{ vets: Vet[] }>(),
    'Load Vets Error': emptyProps(),
  },
});
