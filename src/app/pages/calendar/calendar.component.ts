// import { ChangeDetectorRef, Component, Input, OnInit, AfterViewChecked } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Vaccine } from '../../shared/interfaces/vaccine.interface';
// import { VaccineType } from '../../shared/enums/vaccine-type.enum';
// import {Observable, of} from 'rxjs';
// import { selectUserVaccinations, selectChildrenVaccinations } from '../../shared/states/selectors/main.selectors';
// import * as VaccineAction from '../../shared/states/actions/main.actions';
// import { VaccineCardComponent } from "../../shared/components/cards/vaccine-card/vaccine-card.component";
// import { NgClass, NgForOf, NgIf } from "@angular/common";
// import { VaccineTypePickerComponent } from "../../shared/components/pickers/vaccine-type-picker/vaccine-type-picker.component";
// import { UserPickerTabsComponent } from "../../shared/components/pickers/user-picker-tabs/user-picker-tabs.component";
// import { AppStateInterface } from "../../shared/interfaces/appStates.interface";
// import { ActivatedRoute } from '@angular/router';
// import {map, switchMap, tap} from "rxjs/operators";
// import {VaccineFilterComponent} from "../../shared/components/filters/vaccine-filter/vaccine-filter.component";
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
//   selectedVaccineType: VaccineType = VaccineType.CALENDAR;
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
//     this.filteredVaccines = this.vaccinations.filter(vaccine =>
//       this.selectedVaccineType === VaccineType.CALENDAR
//         ? vaccine.vaccine.type === VaccineType.CALENDAR
//         : vaccine.vaccine.type === VaccineType.EPIDEMIOLOGY
//     );
//     this.cdr.detectChanges();
//   }
// }


import { ChangeDetectorRef, Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { Vaccine } from '../../shared/interfaces/vaccine.interface';
import { VaccineType } from '../../shared/enums/vaccine-type.enum';
import { Observable, of } from 'rxjs';
import { selectUserVaccinations, selectChildrenVaccinations } from '../../shared/states/selectors/main.selectors';
import * as VaccineAction from '../../shared/states/actions/main.actions';
import { VaccineCardComponent } from "../../shared/components/cards/vaccine-card/vaccine-card.component";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { VaccineTypePickerComponent } from "../../shared/components/pickers/vaccine-type-picker/vaccine-type-picker.component";
import { UserPickerTabsComponent } from "../../shared/components/pickers/user-picker-tabs/user-picker-tabs.component";
import { AppStateInterface } from "../../shared/interfaces/appStates.interface";
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from "rxjs/operators";
import { VaccineFilterComponent } from "../../shared/components/filters/vaccine-filter/vaccine-filter.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [
    VaccineCardComponent,
    NgForOf,
    VaccineTypePickerComponent,
    UserPickerTabsComponent,
    NgIf,
    NgClass,
    VaccineFilterComponent
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

  constructor(private store: Store<AppStateInterface>, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {
    this.userVaccinations$ = this.store.select(selectUserVaccinations);
    this.childrenVaccinations$ = this.route.params.pipe(
      map(params => params['id']),
      tap(id => this.userId = id ? +id : undefined),
      switchMap(id => id ? this.store.select(selectChildrenVaccinations(id)) : of(undefined))
    );
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
    if (!this.vaccinations) {
      console.error('filterVaccines: vaccinations is null');
      return;
    }

    if (this.selectedVaccineType === VaccineType.ALL) {
      this.filteredVaccines = this.vaccinations;
    } else {
      this.filteredVaccines = this.vaccinations.filter(vaccine =>
        vaccine.vaccine.type === this.selectedVaccineType
      );
    }
    this.cdr.detectChanges();
  }
}
