import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from '../reducers/data.reducer';

export const dataStateAccessor = createFeatureSelector<DataState>('DATA');
export const getVetsData = createSelector(
  dataStateAccessor,
  (state: DataState) => state.vets.items
);
export const getVetsDataLoading = createSelector(
  dataStateAccessor,
  (state: DataState) => state.vets.loading
);
