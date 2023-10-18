import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

const authKey = createFeatureSelector<AuthState>('AUTH');
export const getLoginStatus = createSelector(
  authKey,
  (state: AuthState) => state.login
);
export const getAuthReqs = createSelector(authKey, (state: AuthState) => ({
  token: state.token,
  isAuth: state.isAuth,
  role: state.role,
}));
export const getValidation = createSelector(
  authKey,
  (state: AuthState) => state.validated
);
