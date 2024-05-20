import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VaccineState } from '../reducers/vaccine.reducer';

export const selectVaccineState = createFeatureSelector<VaccineState>('vaccineState');

export const selectUserVaccinations = createSelector(
  selectVaccineState,
  (state: VaccineState) => state.user
);

export const selectChildren = createSelector(
  selectVaccineState,
  (state: VaccineState) => state.children
);
