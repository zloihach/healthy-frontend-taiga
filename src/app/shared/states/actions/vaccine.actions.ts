import { createAction, props } from '@ngrx/store';
import { Vaccine } from '../../interfaces/vaccine.interface';

export const loadUserVaccinations = createAction('[Vaccine] Load User Vaccinations');
export const loadUserVaccinationsSuccess = createAction('[Vaccine] Load User Vaccinations Success', props<{ vaccinations: Vaccine[] }>());
export const loadUserVaccinationsFailure = createAction('[Vaccine] Load User Vaccinations Failure', props<{ error: any }>());

export const loadChildren = createAction('[Vaccine] Load Children');
export const loadChildrenSuccess = createAction('[Vaccine] Load Children Success', props<{ children: any[] }>());
export const loadChildrenFailure = createAction('[Vaccine] Load Children Failure', props<{ error: any }>());

export const loadChildrenVaccinations = createAction('[Vaccine] Load Children Vaccinations', props<{ userId: number }>());
export const loadChildrenVaccinationsSuccess = createAction('[Vaccine] Load Children Vaccinations Success', props<{ userId: number, vaccinations: Vaccine[] }>());
export const loadChildrenVaccinationsFailure = createAction('[Vaccine] Load Children Vaccinations Failure', props<{ error: any }>());
