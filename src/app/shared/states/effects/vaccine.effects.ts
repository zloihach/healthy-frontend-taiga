import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VaccineActions from '../actions/vaccine.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {VaccineService} from "../../../core/services/vaccine/vaccine.service";

@Injectable()
export class VaccineEffects {
  loadUserVaccinations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VaccineActions.loadUserVaccinations),
      mergeMap(() =>
        this.vaccineService.getUserVaccinations().pipe(
          map(vaccinations => VaccineActions.loadUserVaccinationsSuccess({ vaccinations })),
          catchError(error => of(VaccineActions.loadUserVaccinationsFailure({ error })))
        )
      )
    )
  );

  loadChildren$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VaccineActions.loadChildren),
      mergeMap(() =>
        this.vaccineService.getChildren().pipe(
          map(children => {
            const formattedChildren = children.map(child => ({
              ...child,
              vaccinations: child.ChildVaccine
            }));
            return VaccineActions.loadChildrenSuccess({ children: formattedChildren });
          }),
          catchError(error => of(VaccineActions.loadChildrenFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private vaccineService: VaccineService
  ) {}
}
