import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as VaccineActions from '../actions/vaccine.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { VaccineService } from '../../../pages/calendar/vaccine.service';

@Injectable()
export class VaccineEffects {
  constructor(
    private actions$: Actions,
    private vaccineService: VaccineService
  ) {}

  loadUserVaccinations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VaccineActions.loadUserVaccinations),
      mergeMap(() => this.vaccineService.getAllVaccinationsForCurrentUser().pipe(
        map(vaccines => VaccineActions.loadUserVaccinationsSuccess({ vaccines })),
        catchError(error => of(VaccineActions.loadUserVaccinationsFailure({ error })))
      ))
    )
  );

  loadUsersAndChildren$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VaccineActions.loadUsersAndChildren),
      mergeMap(() => this.vaccineService.getUsersAndChildren().pipe(
        map(users => VaccineActions.loadUsersAndChildrenSuccess({ users })),
        catchError(error => of(VaccineActions.loadUsersAndChildrenFailure({ error })))
      ))
    )
  );
}
