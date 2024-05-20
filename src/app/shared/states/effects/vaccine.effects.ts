import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as VaccineActions from '../actions/vaccine.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
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
      tap(() => console.log('Load User Vaccinations Effect Triggered')),
      mergeMap(() => this.vaccineService.getAllVaccinationsForCurrentUser().pipe(
        tap(() => console.log('getAllVaccinationsForCurrentUser API Called')),
        map(vaccines => {
          console.log('Received Vaccines:', vaccines);
          return VaccineActions.loadUserVaccinationsSuccess({ vaccines });
        }),
        catchError(error => {
          console.error('Error in getAllVaccinationsForCurrentUser API:', error);
          return of(VaccineActions.loadUserVaccinationsFailure({ error }));
        })
      ))
    )
  );

  loadUsersAndChildren$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VaccineActions.loadUsersAndChildren),
      tap(() => console.log('Load Users and Children Effect Triggered')),
      mergeMap(() => this.vaccineService.getUsersAndChildren().pipe(
        tap(() => console.log('getUsersAndChildren API Called')),
        map(users => {
          console.log('Received Users:', users);
          return VaccineActions.loadUsersAndChildrenSuccess({ users });
        }),
        catchError(error => {
          console.error('Error in getUsersAndChildren API:', error);
          return of(VaccineActions.loadUsersAndChildrenFailure({ error }));
        })
      ))
    )
  );
}
