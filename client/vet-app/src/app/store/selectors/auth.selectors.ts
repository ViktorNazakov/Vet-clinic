import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';
import { profileAccessor } from './profile.selectors';
import { ProfileState } from '../reducers/profile.reducer';

const authKey = createFeatureSelector<AuthState>('AUTH');
export const getLoginStatus = createSelector(
  authKey,
  (state: AuthState) => state.login
);
export const getRegisterStatus = createSelector(
  authKey,
  (state: AuthState) => state.register
);
export const getAuthReqs = createSelector(
  authKey,
  profileAccessor,
  (state: AuthState, profile: ProfileState) => ({
    token: state.token,
    isAuth: state.isAuth,
  })
);
export const getValidation = createSelector(
  authKey,
  (state: AuthState) => state.validated
);
export const getUserRole = createSelector(
  authKey,
  (state: AuthState) => state.role
);
