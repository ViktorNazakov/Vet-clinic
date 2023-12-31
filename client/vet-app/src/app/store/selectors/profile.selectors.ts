import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from '../reducers/profile.reducer';
import { User } from 'src/app/models/user.models';

export const profileAccessor = createFeatureSelector<ProfileState>('PROFILE');
export const getProfileDetails = createSelector(
  profileAccessor,
  (state: ProfileState) => state
);
export const getProfileUser = createSelector(
  profileAccessor,
  (state: ProfileState) =>
    ({
      email: '',
      phoneNumber: state.phoneNumber,
      fname: state.firstName,
      lname: state.lastName,
      username: state.username,
      role: state.role,
    } as User)
);
export const getUserPets = createSelector(
  profileAccessor,
  (state: ProfileState) => state.pets.items || []
);
export const getUserPetsLoading = createSelector(
  profileAccessor,
  (state: ProfileState) => state.pets.loaded
);
export const getUserVisits = createSelector(
  profileAccessor,
  (state: ProfileState) => state.visits.items || []
);
export const getUserVisitsLoading = createSelector(
  profileAccessor,
  (state: ProfileState) => state.visits.loaded
);
export const getProfileFullLoad = createSelector(
  profileAccessor,
  (state: ProfileState) =>
    state.loaded === 1 && state.pets.loaded === 1 && state.visits.loaded === 1
);
