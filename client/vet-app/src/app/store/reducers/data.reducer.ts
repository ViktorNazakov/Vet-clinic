import { createReducer, on } from '@ngrx/store';
import { Vet } from 'src/app/models/user.models';
import { DATA_ACTIONS } from '../actions/data.actions';

export interface DataState {
  vets: {
    items: Vet[];
    loading: boolean;
  };
}
const initialState: DataState = {
  vets: {
    items: [],
    loading: true,
  },
};
export const DataReducer = createReducer(
  initialState,
  on(DATA_ACTIONS.loadVetsSuccess, (state: DataState, props) => ({
    ...state,
    vets: {
      items: props.vets,
      loading: false,
    },
  }))
);
