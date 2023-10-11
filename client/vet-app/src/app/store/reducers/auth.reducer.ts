import { createReducer, on } from '@ngrx/store';
import { AuthAPIActions } from '../actions/auth.actions';

export interface AuthState {
  userId: String;
  token: String;
  isAuth: boolean;
  login: {
    loading: boolean;
    error: string;
  };
}

const initialState: AuthState = {
  userId: '',
  token: '',
  isAuth: false,
  login: {
    loading: false,
    error: '',
  },
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthAPIActions.loginAttempt, (state: AuthState) => ({
    ...state,
    login: { error: '', loading: true },
  }))
);
