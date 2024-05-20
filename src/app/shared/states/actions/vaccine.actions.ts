import { createAction, props } from '@ngrx/store';
import {Vaccine} from "../../interfaces/vaccine.interface";

export const loadUserVaccinations = createAction('[Vaccine] Load User Vaccinations');
export const loadUserVaccinationsSuccess = createAction('[Vaccine] Load User Vaccinations Success', props<{ vaccines: Vaccine[] }>());
export const loadUserVaccinationsFailure = createAction('[Vaccine] Load User Vaccinations Failure', props<{ error: any }>());

export const loadUsersAndChildren = createAction('[Vaccine] Load Users and Children');
export const loadUsersAndChildrenSuccess = createAction('[Vaccine] Load Users and Children Success', props<{ users: any[] }>());
export const loadUsersAndChildrenFailure = createAction('[Vaccine] Load Users and Children Failure', props<{ error: any }>());
