import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Medicament, Pet, User } from 'src/app/models/user.models';

export const AdminActions = createActionGroup({
  source: 'Admin',
  events: {
    'Load Users Attempt': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Error': emptyProps(),
    'View User Attempt': props<{ user: User }>(),
    'View User Success': emptyProps(),
    'View User Error': emptyProps(),
    'Edit User Attempt': props<Partial<User>>(),
    'Edit User Success': emptyProps(),
    'Delete User Attempt': props<{ id: string }>(),
    'Delete User Success': emptyProps(),
    'Edit User Pet Attempt': props<Pet>(),
    'Edit User Pet Success': emptyProps(),
    'Load Meds Attempt': emptyProps(),
    'Load Meds Success': props<{ meds: Medicament[] }>(),
    'Load Meds Error': emptyProps(),
    'Delete Med Attempt': props<{ med: Medicament }>(),
    'Delete Med Success': emptyProps(),
    'Create Med Attempt': props<{ med: Medicament }>(),
    'Create Med Success': emptyProps(),
    'Edit Med Attempt': props<{ med: Medicament }>(),
    'Edit Med Success': emptyProps(),
  },
});
