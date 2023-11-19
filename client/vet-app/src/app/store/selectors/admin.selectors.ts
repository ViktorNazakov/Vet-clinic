import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from '../reducers/admin.reducer';

const adminAccessor = createFeatureSelector<AdminState>('ADMIN');
export const getAdminUsersList = createSelector(
  adminAccessor,
  (state: AdminState) => state.users.items || []
);
export const getAdminUsersLoaded = createSelector(
  adminAccessor,
  (state: AdminState) => state.users.loaded
);
