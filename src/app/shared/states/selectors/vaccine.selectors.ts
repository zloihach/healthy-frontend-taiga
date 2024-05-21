import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VaccineStateInterface } from '../../interfaces/vaccine-state.interface';

export const selectVaccineState = createFeatureSelector<VaccineStateInterface>('vaccineState');

export const selectUserVaccinations = createSelector(
  selectVaccineState,
  (state: VaccineStateInterface) => state.userVaccinations
);

export const selectChildren = createSelector(
  selectVaccineState,
  (state: VaccineStateInterface) => state.children
);

export const selectChildrenVaccinations = (userId: number) => createSelector(
  selectVaccineState,
  (state: VaccineStateInterface) => state.childrenVaccinations[userId] || []
);
