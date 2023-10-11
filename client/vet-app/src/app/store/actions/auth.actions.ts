import { createActionGroup, props } from '@ngrx/store';

export const AuthAPIActions = createActionGroup({
  source: 'Auth API',
  events: {
    'Login Attempt': props<{ username: string; password: string }>(),
    'Login Error': props<{ error: String }>(),
    'Login Success': props<{ token: String }>(),
  },
});
