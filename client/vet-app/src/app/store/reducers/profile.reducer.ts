import { createReducer, on } from '@ngrx/store';

import { Pet } from 'src/app/models/user.models';
import { ProfileActions } from '../actions/profile.actions';

export interface ProfileState {
  username: string;
  firstName: string;
  lastName: string;
  pets: {
    loaded: number;
    items: Pet[];
  };
  /** -1/0/1 tri-boolean */
  loaded: number;
}
const initialState: ProfileState | undefined = {
  username: '',
  firstName: '',
  lastName: '',
  loaded: 0,
  pets: {
    loaded: 0,
    items: [],
  },
};
export const ProfileReducer = createReducer(
  initialState,
  on(ProfileActions.loadAttempt, (state: ProfileState) => ({
    ...state,
    loaded: 0,
    pets: {
      loaded: 0,
      items: [],
    },
  })),
  on(ProfileActions.loadSuccess, (state: ProfileState, props) => ({
    ...state,
    loaded: 1,
    firstName: props.firstName,
    lastName: props.lastName,
  })),
  on(ProfileActions.loadPetsSuccess, (state: ProfileState, props) => ({
    ...state,
    pets: {
      loaded: 1,
      items: props.pets,
    },
  })),
  on(ProfileActions.loadPets, (state: ProfileState, props) => ({
    ...state,
    pets: {
      loaded: 0,
      items: [],
    },
  }))
);
