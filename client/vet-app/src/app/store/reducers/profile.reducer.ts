import { createReducer } from '@ngrx/store';
import { Pet } from 'src/app/models/user.models';

export interface ProfileState {
  username: string;
  firstName: string;
  lastName: string;
  pets?: Pet[];
  /** -1/0/1 tri-boolean */
  loaded: number;
}
const initialState: ProfileState | undefined = {
  username: '',
  firstName: '',
  lastName: '',
  loaded: 0,
  pets: [],
};
export const ProfileReducer = createReducer(initialState);
