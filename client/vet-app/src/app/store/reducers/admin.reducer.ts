import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.models';
import { AdminActions } from '../actions/admin.actions';

export interface AdminState {
  users: {
    loaded: number;
    items: User[];
    status: string;
  };
}
const initialState: AdminState = {
  users: {
    loaded: 0,
    items: [],
    status: '',
  },
};
export const AdminReducer = createReducer(
  initialState,
  on(AdminActions.loadUsersAttempt, (state: AdminState) => ({
    ...state,
    users: {
      ...state.users,
      items: [],
      loaded: 0,
      status: '',
    },
  })),
  on(AdminActions.loadUsersSuccess, (state: AdminState, props) => ({
    ...state,
    users: {
      ...state.users,
      items: props.users,
      loaded: 1,
      status: '',
    },
  })),
  on(AdminActions.loadUsersError, (state: AdminState, props) => ({
    ...state,
    users: {
      ...state.users,
      loaded: -1,
    },
  }))
);
