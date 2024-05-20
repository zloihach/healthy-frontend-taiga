import { createReducer, on } from '@ngrx/store';
import * as VaccineActions from '../actions/vaccine.actions';

export interface VaccineState {
  user: any;
  children: any[];
  error: any;
}

export const initialVaccineState: VaccineState = {
  user: null,
  children: [],
  error: null,
};

export const vaccineReducer = createReducer(
  initialVaccineState,
  on(VaccineActions.loadUserVaccinationsSuccess, (state, { user }) => ({
    ...state,
    user
  })),
  on(VaccineActions.loadChildrenSuccess, (state, { children }) => ({
    ...state,
    children
  })),
  on(VaccineActions.loadUserVaccinationsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(VaccineActions.loadChildrenFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
