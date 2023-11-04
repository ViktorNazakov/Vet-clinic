import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Pet } from 'src/app/models/user.models';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Load Attempt': emptyProps(),
    'Load Success': props<{
      username: string;
      firstName: string;
      lastName: string;
    }>(),
    'Load Error': props<{ error: String; code: number }>(),
    'Load Pets': emptyProps(),
    'Load Pets Success': props<{ pets: Pet[] }>(),
    'Create Pet': props<{ name: string; specie: string; breed: string }>(),
    'Create Pet Error': emptyProps(),
    'Delete Pet': props<{ petId: string }>(),
  },
});
