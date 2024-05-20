import { createAction, props } from '@ngrx/store';

export const loadUserVaccinations = createAction('[Vaccine] Load User Vaccinations');
export const loadUserVaccinationsSuccess = createAction(
  '[Vaccine] Load User Vaccinations Success',
  props<{ user: any }>()
);
export const loadUserVaccinationsFailure = createAction(
  '[Vaccine] Load User Vaccinations Failure',
  props<{ error: any }>()
);

export const loadChildren = createAction('[Vaccine] Load Children');
export const loadChildrenSuccess = createAction(
  '[Vaccine] Load Children Success',
  props<{ children: any[] }>()
);
export const loadChildrenFailure = createAction(
  '[Vaccine] Load Children Failure',
  props<{ error: any }>()
);
