import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from '../reducers/profile.reducer';

const profileAccessor = createFeatureSelector<ProfileState>('PROFILE');
export const getProfileDetails = createSelector(
  profileAccessor,
  (state: ProfileState) => state
);
export const getUserPets = createSelector(
  profileAccessor,
  (state: ProfileState) => state.pets.items || []
);
export const getUserPetsLoading = createSelector(
  profileAccessor,
  (state: ProfileState) => state.pets.loaded
);
export const getProfileFullLoad = createSelector(
  profileAccessor,
  (state: ProfileState) => state.loaded === 1 && state.pets.loaded === 1
);
