import { createReducer, on } from '@ngrx/store';
import { AuthAPIActions } from '../actions/auth.actions';

export interface AuthState {
  userId: String;
  token: String;
  isAuth: boolean;
  role: string;
  validated: boolean;
  login: {
    loading: boolean;
    error: string;
  };
}

const initialState: AuthState = {
  userId: '',
  token: '',
  isAuth: false,
  role: '',
  validated: false,
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
  })),
  on(AuthAPIActions.loginSuccess, (state: AuthState, props) => ({
    ...state,
    isAuth: true,
    token: props.token,
    role: '',
    login: { error: '', loading: false },
  })),
  on(AuthAPIActions.loginError, (state: AuthState, props) => ({
    ...state,
    login: { error: '' + props.error, loading: false },
  })),
  on(AuthAPIActions.accountCheck, (state: AuthState, props) => ({
    ...state,
    validated: false,
    token: !!props.token ? props.token : state.token,
  })),
  on(AuthAPIActions.accountCheckSuccess, (state: AuthState) => ({
    ...state,
    validated: true,
    isAuth: true,
  }))
);
