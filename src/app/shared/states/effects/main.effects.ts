import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VaccineActions from '../actions/main.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { VaccineService } from '../../../core/services/vaccine/vaccine.service';
import { ChildService } from '../../../core/services/child/child.service';

@Injectable()
export class MainEffects {
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
        this.childService.getChildren().pipe(
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

  deleteChild$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VaccineActions.deleteChild),
      mergeMap(action =>
        this.childService.deleteChild(action.childId).pipe(
          map(() => VaccineActions.deleteChildSuccess({ childId: action.childId })),
          catchError(error => of(VaccineActions.deleteChildFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private vaccineService: VaccineService,
    private childService: ChildService
  ) {}
}
