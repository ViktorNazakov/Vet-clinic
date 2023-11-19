import { createReducer, on } from '@ngrx/store';

import { Pet } from 'src/app/models/user.models';
import { ProfileActions } from '../actions/profile.actions';

export interface ProfileState {
  username: string;
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  pets: {
    loaded: number;
    items: Pet[];
  };
  /** -1/0/1 tri-boolean */
  loaded: number;
}
const initialState: ProfileState | undefined = {
  username: '',
  id: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
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
    role: props.role,
    id: props.id,
    phoneNumber: props.phoneNumber,
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
  })),
  on(ProfileActions.createPet, (state: ProfileState) => ({
    ...state,
    pets: { ...state.pets, loaded: 0 },
  })),
  on(ProfileActions.createPetError, (state: ProfileState) => ({
    ...state,
    pets: { ...state.pets, loaded: 1 },
  })),
  on(ProfileActions.deletePet, (state: ProfileState) => ({
    ...state,
    pets: { ...state.pets, loaded: 0 },
  }))
);
