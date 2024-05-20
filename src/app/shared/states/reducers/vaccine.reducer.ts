import { createReducer, on } from '@ngrx/store';
import * as VaccineActions from '../actions/vaccine.actions';
import { Vaccine } from '../../interfaces/vaccine.interface';

export interface AppState {
  vaccines: Vaccine[];
  users: any[];
  error: any;
}

export const initialState: AppState = {
  vaccines: [],
  users: [],
  error: null
};

export const vaccineReducer = createReducer(
  initialState,
  on(VaccineActions.loadUserVaccinationsSuccess, (state, { vaccines }) => ({
    ...state,
    vaccines
  })),
  on(VaccineActions.loadUsersAndChildrenSuccess, (state, { users }) => ({
    ...state,
    users
  })),
  on(VaccineActions.loadUserVaccinationsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(VaccineActions.loadUsersAndChildrenFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
