import { createReducer, on } from '@ngrx/store';
import { AuthAPIActions } from '../actions/auth.actions';

export interface AuthState {
  token: String;
  isAuth: boolean;
  role: String;
  validated: boolean;
  login: {
    loading: boolean;
    error: string;
  };
  register: {
    loading: boolean;
    error: string;
  };
}

const initialState: AuthState = {
  token: '',
  isAuth: false,
  validated: false,
  role: '',
  login: {
    loading: false,
    error: '',
  },
  register: {
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
    role: props.role,
    login: { error: '', loading: false },
  })),
  on(AuthAPIActions.loginError, (state: AuthState, props) => ({
    ...state,
    login: {
      error: '' + (props.error || 'Invalid Login Details '),
      loading: false,
    },
  })),
  on(AuthAPIActions.registerAttempt, (state: AuthState) => ({
    ...state,
    register: { error: '', loading: true },
  })),
  on(AuthAPIActions.registerSuccess, (state: AuthState, props) => ({
    ...state,
    register: { error: '', loading: false },
  })),
  on(AuthAPIActions.registerError, (state: AuthState, props) => ({
    ...state,
    register: { error: '' + props.error, loading: false },
  })),
  on(AuthAPIActions.accountCheck, (state: AuthState, props) => ({
    ...state,
    validated: false,
    token: !!props.token ? props.token : state.token,
  })),
  on(AuthAPIActions.accountCheckSuccess, (state: AuthState, props) => ({
    ...state,
    validated: true,
    isAuth: true,
    role: props.role,
    token: props.token,
  })),
  on(AuthAPIActions.accountCheckError, (state: AuthState, props) => ({
    ...state,
    validated: true,
    isAuth: false,
    token: '',
  })),
  on(AuthAPIActions.logoutAttempt, (state: AuthState) => ({
    ...state,
    isAuth: false,
    validated: false,
    role: '',
    token: '',
    userId: '',
  })),
  on(AuthAPIActions.logout, (state: AuthState) => ({
    ...state,
    validated: true,
  }))
);
