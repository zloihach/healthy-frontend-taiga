import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Vaccine } from '../../shared/interfaces/vaccine.interface';
import { VaccineType } from '../../shared/enums/vaccine-type.enum';
import {Observable, of} from 'rxjs';
import {selectChildrenVaccinations, selectUserVaccinations} from '../../shared/states/selectors/vaccine.selectors';
import * as VaccineAction from '../../shared/states/actions/vaccine.actions';
import {VaccineCardComponent} from "../../shared/components/vaccine-card/vaccine-card.component";
import {NgForOf} from "@angular/common";
import {VaccineTypePickerComponent} from "../../shared/components/vaccine-type-picker/vaccine-type-picker.component";
import {UserPickerTabsComponent} from "../../shared/components/user-picker-tabs/user-picker-tabs.component";
import {AppStateInterface} from "../../shared/interfaces/appStates.interface";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [
    UserPickerTabsComponent,
    VaccineTypePickerComponent,
    VaccineCardComponent,
    NgForOf
  ],
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {
  @Input() vaccinations: Vaccine[] = [];
  filteredVaccines: Vaccine[] = [];
  selectedVaccineType: VaccineType = VaccineType.CALENDAR;
  selectedUser: any = { id: 'user' };
  userVaccinations$: Observable<Vaccine[]>;

  constructor(private store: Store<AppStateInterface>, private cdr: ChangeDetectorRef) {
    this.userVaccinations$ = this.store.select(selectUserVaccinations);
  }

  ngOnInit(): void {
    console.log('CalendarComponent: ngOnInit');
    this.store.dispatch(VaccineAction.loadUserVaccinations());
    this.userVaccinations$.subscribe(vaccinations => {
      this.vaccinations = vaccinations;
      this.filterVaccines();
    });
  }

  onUserChange({ user, vaccinations }: { user: any, vaccinations: any[] }): void {
    console.log('CalendarComponent: onUserChange', user);
    this.selectedUser = user;
    this.vaccinations = vaccinations;
    this.filterVaccines();
    this.cdr.detectChanges();
  }

  onVaccineTypeChange(type: VaccineType): void {
    console.log('CalendarComponent: onVaccineTypeChange', type);
    this.selectedVaccineType = type;
    this.filterVaccines();
    this.cdr.detectChanges();
  }

  filterVaccines(): void {
    if (!this.vaccinations) {
      console.error('filterVaccines: vaccinations is null');
      return;
    }

    console.log('CalendarComponent: filterVaccines', this.selectedVaccineType);
    this.filteredVaccines = this.vaccinations.filter(vaccine =>
      this.selectedVaccineType === VaccineType.CALENDAR
        ? vaccine.vaccine.type === VaccineType.CALENDAR
        : vaccine.vaccine.type === VaccineType.EPIDEMIOLOGY
    );
  }
}
//
// import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Vaccine } from '../../shared/interfaces/vaccine.interface';
// import { VaccineType } from '../../shared/enums/vaccine-type.enum';
// import {Observable, of} from 'rxjs';
// import {selectChildrenVaccinations, selectUserVaccinations} from '../../shared/states/selectors/vaccine.selectors';
// import * as VaccineAction from '../../shared/states/actions/vaccine.actions';
// import {VaccineCardComponent} from "../../shared/components/vaccine-card/vaccine-card.component";
// import {NgForOf} from "@angular/common";
// import {VaccineTypePickerComponent} from "../../shared/components/vaccine-type-picker/vaccine-type-picker.component";
// import {UserPickerTabsComponent} from "../../shared/components/user-picker-tabs/user-picker-tabs.component";
// import {AppStateInterface} from "../../shared/interfaces/appStates.interface";
//
// @Component({
//   selector: 'app-calendar',
//   templateUrl: './calendar.component.html',
//   standalone: true,
//   imports: [
//     UserPickerTabsComponent,
//     VaccineTypePickerComponent,
//     VaccineCardComponent,
//     NgForOf
//   ],
//   styleUrls: ['./calendar.component.less']
// })
// export class CalendarComponent implements OnInit {
//   vaccines$: Observable<Vaccine[]>;
//   filteredVaccines: Vaccine[] = [];
//   selectedVaccineType: VaccineType = VaccineType.CALENDAR;
//   selectedUser: any = { id: 'user', isCurrentUser: true };
//
//   constructor(private store: Store<AppStateInterface>, private cdr: ChangeDetectorRef) {
//     this.vaccines$ = this.store.select(selectUserVaccinations);
//   }
//
//   ngOnInit(): void {
//     console.log('CalendarComponent: ngOnInit');
//     this.getVaccinationsForCurrentUser();
//     this.vaccines$.subscribe(vaccines => {
//       console.log('CalendarComponent: vaccines$', vaccines);
//       this.filteredVaccines = vaccines;
//       this.filterVaccines();
//     });
//   }
//
//   getVaccinationsForCurrentUser(): void {
//     console.log('CalendarComponent: getVaccinationsForCurrentUser');
//     if (this.selectedUser.isCurrentUser) {
//       this.store.dispatch(VaccineAction.loadUserVaccinations());
//     } else {
//       this.store.dispatch(VaccineAction.loadChildrenVaccinations({ userId: this.selectedUser.id }));
//     }
//   }
//
//   onUserChange(user: any): void {
//     console.log('CalendarComponent: onUserChange', user);
//     this.selectedUser = user;
//     this.getVaccinationsForCurrentUser();
//     this.cdr.detectChanges();
//   }
//
//   onVaccineTypeChange(type: VaccineType): void {
//     console.log('CalendarComponent: onVaccineTypeChange', type);
//     this.selectedVaccineType = type;
//     this.filterVaccines();
//     this.cdr.detectChanges();
//   }
//
//   filterVaccines(): void {
//     if (!this.filteredVaccines) {
//       console.error('filterVaccines: filteredVaccines is null');
//       return;
//     }
//
//     console.log('CalendarComponent: filterVaccines', this.selectedVaccineType);
//     this.filteredVaccines = this.filteredVaccines.filter(vaccine =>
//       this.selectedVaccineType === VaccineType.CALENDAR
//         ? vaccine.vaccine.type === VaccineType.CALENDAR
//         : vaccine.vaccine.type === VaccineType.EPIDEMIOLOGY
//     );
//   }
// }
