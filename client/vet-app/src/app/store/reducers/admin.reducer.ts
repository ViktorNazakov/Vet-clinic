import { createReducer, on } from '@ngrx/store';
import { Pet, User } from 'src/app/models/user.models';
import { AdminActions } from '../actions/admin.actions';

export interface AdminState {
  users: {
    loaded: number;
    items: User[];
    status: string;
  };
  currentUser: {
    userId: string;
    loaded: number;
    user?: User;
    pets?: Pet[];
  };
}
const initialState: AdminState = {
  users: {
    loaded: 0,
    items: [],
    status: '',
  },
  currentUser: {
    userId: '',
    loaded: 0,
    pets: [],
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
