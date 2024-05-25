// // import { ChangeDetectorRef, Component, Input, OnInit, AfterViewChecked } from '@angular/core';
// // import { Store } from '@ngrx/store';
// // import { Vaccine } from '../../shared/interfaces/vaccine.interface';
// // import { VaccineType } from '../../shared/enums/vaccine-type.enum';
// // import {Observable, of} from 'rxjs';
// // import { selectUserVaccinations, selectChildrenVaccinations } from '../../shared/states/selectors/main.selectors';
// // import * as VaccineAction from '../../shared/states/actions/main.actions';
// // import { VaccineCardComponent } from "../../shared/components/cards/vaccine-card/vaccine-card.component";
// // import { NgClass, NgForOf, NgIf } from "@angular/common";
// // import { VaccineTypePickerComponent } from "../../shared/components/pickers/vaccine-type-picker/vaccine-type-picker.component";
// // import { UserPickerTabsComponent } from "../../shared/components/pickers/user-picker-tabs/user-picker-tabs.component";
// // import { AppStateInterface } from "../../shared/interfaces/appStates.interface";
// // import { ActivatedRoute } from '@angular/router';
// // import {map, switchMap, tap} from "rxjs/operators";
// // import {VaccineFilterComponent} from "../../shared/components/filters/vaccine-filter/vaccine-filter.component";
// //
// // @Component({
// //   selector: 'app-calendar',
// //   templateUrl: './calendar.component.html',
// //   standalone: true,
// //   imports: [
// //     VaccineCardComponent,
// //     NgForOf,
// //     VaccineTypePickerComponent,
// //     UserPickerTabsComponent,
// //     NgIf,
// //     NgClass,
// //     VaccineFilterComponent
// //   ],
// //   styleUrls: ['./calendar.component.less']
// // })
// // export class CalendarComponent implements OnInit, AfterViewChecked {
// //   @Input() vaccinations: Vaccine[] = [];
// //   filteredVaccines: Vaccine[] = [];
// //   selectedVaccineType: VaccineType = VaccineType.CALENDAR;
// //   selectedUser: any = { id: 'user' };
// //   userVaccinations$: Observable<Vaccine[]>;
// //   childrenVaccinations$: Observable<Vaccine[] | undefined>;
// //   userId: number | undefined;
// //
// //   constructor(private store: Store<AppStateInterface>, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {
// //     this.userVaccinations$ = this.store.select(selectUserVaccinations);
// //     this.childrenVaccinations$ = this.route.params.pipe(
// //       map(params => params['id']),
// //       tap(id => this.userId = id ? +id : undefined),
// //       switchMap(id => id ? this.store.select(selectChildrenVaccinations(id)) : of(undefined))
// //     );
// //   }
// //
// //   ngOnInit(): void {
// //     if (this.userId) {
// //       this.childrenVaccinations$.subscribe(vaccinations => {
// //         this.vaccinations = vaccinations || [];
// //         this.filterVaccines();
// //         this.cdr.detectChanges();
// //       });
// //     } else {
// //       this.store.dispatch(VaccineAction.loadUserVaccinations());
// //       this.userVaccinations$.subscribe(vaccinations => {
// //         this.vaccinations = vaccinations;
// //         this.filterVaccines();
// //         this.cdr.detectChanges();
// //       });
// //     }
// //   }
// //
// //   ngAfterViewChecked(): void {
// //     this.cdr.detectChanges();
// //   }
// //
// //   onUserChange({ user, vaccinations }: { user: any, vaccinations: any[] }): void {
// //     this.selectedUser = user;
// //     this.vaccinations = vaccinations;
// //     this.filterVaccines();
// //     this.cdr.detectChanges();
// //   }
// //
// //   onVaccineTypeChange(type: VaccineType): void {
// //     this.selectedVaccineType = type;
// //     this.filterVaccines();
// //     this.cdr.detectChanges();
// //   }
// //
// //   filterVaccines(): void {
// //     if (!this.vaccinations) {
// //       console.error('filterVaccines: vaccinations is null');
// //       return;
// //     }
// //
// //     this.filteredVaccines = this.vaccinations.filter(vaccine =>
// //       this.selectedVaccineType === VaccineType.CALENDAR
// //         ? vaccine.vaccine.type === VaccineType.CALENDAR
// //         : vaccine.vaccine.type === VaccineType.EPIDEMIOLOGY
// //     );
// //     this.cdr.detectChanges();
// //   }
// // }
//
//
// import { ChangeDetectorRef, Component, Input, OnInit, AfterViewChecked } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Vaccine } from '../../shared/interfaces/vaccine.interface';
// import { VaccineType } from '../../shared/enums/vaccine-type.enum';
// import { Observable, of } from 'rxjs';
// import { selectUserVaccinations, selectChildrenVaccinations } from '../../shared/states/selectors/main.selectors';
// import * as VaccineAction from '../../shared/states/actions/main.actions';
// import { VaccineCardComponent } from "../../shared/components/cards/vaccine-card/vaccine-card.component";
// import { NgClass, NgForOf, NgIf } from "@angular/common";
// import { VaccineTypePickerComponent } from "../../shared/components/pickers/vaccine-type-picker/vaccine-type-picker.component";
// import { UserPickerTabsComponent } from "../../shared/components/pickers/user-picker-tabs/user-picker-tabs.component";
// import { AppStateInterface } from "../../shared/interfaces/appStates.interface";
// import { ActivatedRoute } from '@angular/router';
// import { map, switchMap, tap } from "rxjs/operators";
// import { VaccineFilterComponent } from "../../shared/components/filters/vaccine-filter/vaccine-filter.component";
//
// @Component({
//   selector: 'app-calendar',
//   templateUrl: './calendar.component.html',
//   standalone: true,
//   imports: [
//     VaccineCardComponent,
//     NgForOf,
//     VaccineTypePickerComponent,
//     UserPickerTabsComponent,
//     NgIf,
//     NgClass,
//     VaccineFilterComponent
//   ],
//   styleUrls: ['./calendar.component.less']
// })
// export class CalendarComponent implements OnInit, AfterViewChecked {
//   @Input() vaccinations: Vaccine[] = [];
//   filteredVaccines: Vaccine[] = [];
//   selectedVaccineType: VaccineType = VaccineType.ALL;
//   selectedUser: any = { id: 'user' };
//   userVaccinations$: Observable<Vaccine[]>;
//   childrenVaccinations$: Observable<Vaccine[] | undefined>;
//   userId: number | undefined;
//
//   constructor(private store: Store<AppStateInterface>, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {
//     this.userVaccinations$ = this.store.select(selectUserVaccinations);
//     this.childrenVaccinations$ = this.route.params.pipe(
//       map(params => params['id']),
//       tap(id => this.userId = id ? +id : undefined),
//       switchMap(id => id ? this.store.select(selectChildrenVaccinations(id)) : of(undefined))
//     );
//   }
//
//   ngOnInit(): void {
//     if (this.userId) {
//       this.childrenVaccinations$.subscribe(vaccinations => {
//         this.vaccinations = vaccinations || [];
//         this.filterVaccines();
//         this.cdr.detectChanges();
//       });
//     } else {
//       this.store.dispatch(VaccineAction.loadUserVaccinations());
//       this.userVaccinations$.subscribe(vaccinations => {
//         this.vaccinations = vaccinations;
//         this.filterVaccines();
//         this.cdr.detectChanges();
//       });
//     }
//   }
//
//   ngAfterViewChecked(): void {
//     this.cdr.detectChanges();
//   }
//
//   onUserChange({ user, vaccinations }: { user: any, vaccinations: any[] }): void {
//     this.selectedUser = user;
//     this.vaccinations = vaccinations;
//     this.filterVaccines();
//     this.cdr.detectChanges();
//   }
//
//   onVaccineTypeChange(type: VaccineType): void {
//     this.selectedVaccineType = type;
//     this.filterVaccines();
//     this.cdr.detectChanges();
//   }
//
//   filterVaccines(): void {
//     if (!this.vaccinations) {
//       console.error('filterVaccines: vaccinations is null');
//       return;
//     }
//
//     if (this.selectedVaccineType === VaccineType.ALL) {
//       this.filteredVaccines = this.vaccinations;
//     } else {
//       this.filteredVaccines = this.vaccinations.filter(vaccine =>
//         vaccine.vaccine.type === this.selectedVaccineType
//       );
//     }
//     this.cdr.detectChanges();
//   }
// }
//
// import { ChangeDetectorRef, Component, Input, OnInit, AfterViewChecked } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import { map, switchMap, tap } from 'rxjs/operators';
// import { selectUserVaccinations, selectChildrenVaccinations } from '../../shared/states/selectors/main.selectors';
// import * as VaccineAction from '../../shared/states/actions/main.actions';
// import { VaccineCardComponent } from "../../shared/components/cards/vaccine-card/vaccine-card.component";
// import { NgClass, NgForOf, NgIf } from "@angular/common";
// import { VaccineTypePickerComponent } from "../../shared/components/pickers/vaccine-type-picker/vaccine-type-picker.component";
// import { UserPickerTabsComponent } from "../../shared/components/pickers/user-picker-tabs/user-picker-tabs.component";
// import { AppStateInterface } from "../../shared/interfaces/appStates.interface";
// import { ActivatedRoute } from '@angular/router';
// import { VaccineFilterComponent } from "../../shared/components/filters/vaccine-filter/vaccine-filter.component";
// import { Vaccine } from '../../shared/interfaces/vaccine.interface';
// import { VaccineType } from '../../shared/enums/vaccine-type.enum';
// import {VaccinationStatus} from "../../shared/enums/vaccination-status.types";
// import {TuiFilterModule} from "@taiga-ui/kit";
//
// @Component({
//   selector: 'app-calendar',
//   templateUrl: './calendar.component.html',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     VaccineCardComponent,
//     NgForOf,
//     VaccineTypePickerComponent,
//     UserPickerTabsComponent,
//     NgIf,
//     NgClass,
//     VaccineFilterComponent,
//     TuiFilterModule
//   ],
//   styleUrls: ['./calendar.component.less']
// })
// export class CalendarComponent implements OnInit, AfterViewChecked {
//   @Input() vaccinations: Vaccine[] = [];
//   filteredVaccines: Vaccine[] = [];
//   selectedVaccineType: VaccineType = VaccineType.ALL;
//   selectedUser: any = { id: 'user' };
//   userVaccinations$: Observable<Vaccine[]>;
//   childrenVaccinations$: Observable<Vaccine[] | undefined>;
//   userId: number | undefined;
//
//   // Initialize form group
//   form: FormGroup;
//   items: string[] = Object.values(VaccinationStatus);
//   disabledItemHandler: (item: string) => boolean = (item: string) => item.length < 7;
//
//   constructor(private store: Store<AppStateInterface>, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {
//     this.userVaccinations$ = this.store.select(selectUserVaccinations);
//     this.childrenVaccinations$ = this.route.params.pipe(
//       map(params => params['id']),
//       tap(id => this.userId = id ? +id : undefined),
//       switchMap(id => id ? this.store.select(selectChildrenVaccinations(id)) : of(undefined))
//     );
//
//     // Initialize form
//     this.form = new FormGroup({
//       filters: new FormControl([]),
//     });
//   }
//
//   ngOnInit(): void {
//     if (this.userId) {
//       this.childrenVaccinations$.subscribe(vaccinations => {
//         this.vaccinations = vaccinations || [];
//         this.filterVaccines();
//         this.cdr.detectChanges();
//       });
//     } else {
//       this.store.dispatch(VaccineAction.loadUserVaccinations());
//       this.userVaccinations$.subscribe(vaccinations => {
//         this.vaccinations = vaccinations;
//         this.filterVaccines();
//         this.cdr.detectChanges();
//       });
//     }
//
//     // React to form changes
//     this.form.get('filters')!.valueChanges.subscribe(() => {
//       this.filterVaccines();
//     });
//   }
//
//   ngAfterViewChecked(): void {
//     this.cdr.detectChanges();
//   }
//
//   onUserChange({ user, vaccinations }: { user: any, vaccinations: any[] }): void {
//     this.selectedUser = user;
//     this.vaccinations = vaccinations;
//     this.filterVaccines();
//     this.cdr.detectChanges();
//   }
//
//   onVaccineTypeChange(type: VaccineType): void {
//     this.selectedVaccineType = type;
//     this.filterVaccines();
//     this.cdr.detectChanges();
//   }
//
//   filterVaccines(): void {
//     const filters = this.form.get('filters')!.value;
//     const now = new Date();
//
//     // If no filters are selected, show all vaccinations
//     if (filters.length === 0) {
//       this.filteredVaccines = this.vaccinations;
//       this.cdr.detectChanges();
//       return;
//     }
//
//     this.filteredVaccines = this.vaccinations.filter(vaccine => {
//       const plannedVaccinationDate = vaccine.planned_vaccination_date ? new Date(vaccine.planned_vaccination_date) : null;
//
//       if (filters.includes(VaccinationStatus.DONE) && vaccine.is_vaccinated) {
//         return true;
//       }
//
//       if (filters.includes(VaccinationStatus.EXPIRED) && !vaccine.is_vaccinated && plannedVaccinationDate && plannedVaccinationDate < now) {
//         return true;
//       }
//
//       if (filters.includes(VaccinationStatus.UPCOMING) && !vaccine.is_vaccinated && plannedVaccinationDate && plannedVaccinationDate >= now) {
//         return true;
//       }
//
//       return false;
//     });
//
//     this.cdr.detectChanges();
//   }
// }
import { ChangeDetectorRef, Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { selectUserVaccinations, selectChildrenVaccinations } from '../../shared/states/selectors/main.selectors';
import * as VaccineAction from '../../shared/states/actions/main.actions';
import { VaccineCardComponent } from "../../shared/components/cards/vaccine-card/vaccine-card.component";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { VaccineTypePickerComponent } from "../../shared/components/pickers/vaccine-type-picker/vaccine-type-picker.component";
import { UserPickerTabsComponent } from "../../shared/components/pickers/user-picker-tabs/user-picker-tabs.component";
import { AppStateInterface } from "../../shared/interfaces/appStates.interface";
import { ActivatedRoute } from '@angular/router';
import { VaccineFilterComponent } from "../../shared/components/filters/vaccine-filter/vaccine-filter.component";
import { Vaccine } from '../../shared/interfaces/vaccine.interface';
import { VaccineType } from '../../shared/enums/vaccine-type.enum';
import { VaccinationStatus } from '../../shared/enums/vaccination-status.types';
import { TuiFilterModule } from "@taiga-ui/kit";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    VaccineCardComponent,
    NgForOf,
    VaccineTypePickerComponent,
    UserPickerTabsComponent,
    NgIf,
    NgClass,
    VaccineFilterComponent,
    TuiFilterModule
  ],
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit, AfterViewChecked {
  @Input() vaccinations: Vaccine[] = [];
  filteredVaccines: Vaccine[] = [];
  selectedVaccineType: VaccineType = VaccineType.ALL;
  selectedUser: any = { id: 'user' };
  userVaccinations$: Observable<Vaccine[]>;
  childrenVaccinations$: Observable<Vaccine[] | undefined>;
  userId: number | undefined;

  // Initialize form group
  form: FormGroup;
  items: string[] = Object.values(VaccinationStatus);
  disabledItemHandler: (item: string) => boolean = (item: string) => item.length < 7;

  constructor(private store: Store<AppStateInterface>, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {
    this.userVaccinations$ = this.store.select(selectUserVaccinations);
    this.childrenVaccinations$ = this.route.params.pipe(
      map(params => params['id']),
      tap(id => this.userId = id ? +id : undefined),
      switchMap(id => id ? this.store.select(selectChildrenVaccinations(id)) : of(undefined))
    );

    // Initialize form
    this.form = new FormGroup({
      filters: new FormControl([]),
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.childrenVaccinations$.subscribe(vaccinations => {
        this.vaccinations = vaccinations || [];
        this.filterVaccines();
        this.cdr.detectChanges();
      });
    } else {
      this.store.dispatch(VaccineAction.loadUserVaccinations());
      this.userVaccinations$.subscribe(vaccinations => {
        this.vaccinations = vaccinations;
        this.filterVaccines();
        this.cdr.detectChanges();
      });
    }

    // React to form changes
    this.form.get('filters')!.valueChanges.subscribe(() => {
      this.filterVaccines();
    });
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  onUserChange({ user, vaccinations }: { user: any, vaccinations: any[] }): void {
    this.selectedUser = user;
    this.vaccinations = vaccinations;
    this.filterVaccines();
    this.cdr.detectChanges();
  }

  onVaccineTypeChange(type: VaccineType): void {
    this.selectedVaccineType = type;
    this.filterVaccines();
    this.cdr.detectChanges();
  }

  filterVaccines(): void {
    const filters = this.form.get('filters')!.value;
    const now = new Date();

    this.filteredVaccines = this.vaccinations.filter(vaccine => {
      const plannedVaccinationDate = vaccine.planned_vaccination_date ? new Date(vaccine.planned_vaccination_date) : null;

      // Filter by vaccine type
      if (this.selectedVaccineType !== VaccineType.ALL && vaccine.vaccine.type !== this.selectedVaccineType) {
        return false;
      }

      // If no filters are selected, show all vaccinations
      if (filters.length === 0) {
        return true;
      }

      // Apply status filters
      if (filters.includes(VaccinationStatus.DONE) && vaccine.is_vaccinated) {
        return true;
      }

      if (filters.includes(VaccinationStatus.EXPIRED) && !vaccine.is_vaccinated && plannedVaccinationDate && plannedVaccinationDate < now) {
        return true;
      }

      if (filters.includes(VaccinationStatus.UPCOMING) && !vaccine.is_vaccinated && plannedVaccinationDate && plannedVaccinationDate >= now) {
        return true;
      }

      return false;
    });

    this.cdr.detectChanges();
  }
}
