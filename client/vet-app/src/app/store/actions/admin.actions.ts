import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from 'src/app/models/user.models';

export const AdminActions = createActionGroup({
  source: 'Admin',
  events: {
    'Load Users Attempt': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Error': emptyProps(),
  },
});
