import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

const authKey = createFeatureSelector<AuthState>('AUTH');
export const getLoginStatus = createSelector(
  authKey,
  (state: AuthState) => state.login
);
