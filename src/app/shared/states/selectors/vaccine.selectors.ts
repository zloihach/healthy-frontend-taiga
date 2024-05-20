import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/vaccine.reducer';

export const selectVaccineState = createFeatureSelector<AppState>('vaccines');

export const selectUserVaccinations = createSelector(
  selectVaccineState,
  (state: AppState) => state.vaccines
);

export const selectUsers = createSelector(
  selectVaccineState,
  (state: AppState) => state.users
);
