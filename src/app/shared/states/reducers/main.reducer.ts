import { createReducer, on } from '@ngrx/store';
import * as VaccineActions from '../actions/main.actions';
import { VaccineStateInterface } from '../../interfaces/vaccine-state.interface';

export const initialVaccineState: VaccineStateInterface = {
  userVaccinations: [],
  children: [],
  childrenVaccinations: {},
  error: null,
};

export const mainReducer = createReducer(
  initialVaccineState,
  on(VaccineActions.loadUserVaccinationsSuccess, (state, { vaccinations }) => ({
    ...state,
    userVaccinations: vaccinations
  })),
  on(VaccineActions.loadChildrenSuccess, (state, { children }) => ({
    ...state,
    children
  })),
  on(VaccineActions.loadChildrenVaccinationsSuccess, (state, { userId, vaccinations }) => ({
    ...state,
    childrenVaccinations: {
      ...state.childrenVaccinations,
      [userId]: vaccinations
    }
  })),
  on(VaccineActions.loadUserVaccinationsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(VaccineActions.loadChildrenFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(VaccineActions.loadChildrenVaccinationsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(VaccineActions.deleteChildSuccess, (state, { childId }) => ({
    ...state,
    children: state.children.filter(child => child.id !== childId)
  })),
  on(VaccineActions.deleteChildFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
