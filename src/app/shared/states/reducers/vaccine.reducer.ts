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
  on(VaccineActions.loadUserVaccinationsSuccess, (state, { vaccines }) => {
    console.log('Load User Vaccinations Success Action Dispatched');
    return {
      ...state,
      vaccines
    };
  }),
  on(VaccineActions.loadUsersAndChildrenSuccess, (state, { users }) => {
    console.log('Load Users and Children Success Action Dispatched');
    return {
      ...state,
      users
    };
  }),
  on(VaccineActions.loadUserVaccinationsFailure, (state, { error }) => {
    console.error('Load User Vaccinations Failure Action Dispatched:', error);
    return {
      ...state,
      error
    };
  }),
  on(VaccineActions.loadUsersAndChildrenFailure, (state, { error }) => {
    console.error('Load Users and Children Failure Action Dispatched:', error);
    return {
      ...state,
      error
    };
  })
);
