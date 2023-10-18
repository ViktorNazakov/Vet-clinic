import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthAPIActions = createActionGroup({
  source: 'Auth API',
  events: {
    'Login Attempt': props<{ username: string; password: string }>(),
    'Login Error': props<{ error: String }>(),
    'Login Success': props<{ token: String; role: string }>(),
    'Account Check': props<{ token?: string }>(),
    'Account Check Error': emptyProps(),
    'Account Check Success': props<{ token: string; role: string }>(),
  },
});
