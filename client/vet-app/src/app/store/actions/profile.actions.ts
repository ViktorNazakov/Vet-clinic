import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Appointment, Pet } from 'src/app/models/user.models';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Load Attempt': emptyProps(),
    'Load Success': props<{
      id: string;
      role: string;
      username: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
    }>(),
    'Load Error': props<{ error: String; code: number }>(),
    'Edit Attempt': props<{
      userId: string;
      lname?: string;
      fname?: string;
      phoneNumber?: string;
    }>(),
    'Edit Error': props<{ error: string; code: number }>(),
    'Load Pets': emptyProps(),
    'Load Pets Success': props<{ pets: Pet[] }>(),
    'Load Visits': emptyProps(),
    'Load Visits Success': props<{ visits: Appointment[] }>(),
    'Create Pet': props<{ name: string; specie: string; breed: string }>(),
    'Create Pet Error': emptyProps(),
    'Edit Pet': props<{
      petId: string;
      specie?: string;
      name?: string;
      breed?: string;
    }>(),
    'Delete Pet': props<{ petId: string }>(),
    'Create Appointment': props<{
      time: Date;
      description?: string;
      pet: string;
      vet: string;
    }>(),
    'Create Appointment Error': emptyProps(),
    'Create Appointment Success': emptyProps(),
  },
});
