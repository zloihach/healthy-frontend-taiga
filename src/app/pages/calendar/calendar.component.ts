import {AfterViewChecked, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Vaccine } from '../../shared/interfaces/vaccine.interface';
import { VaccineType } from '../../shared/enums/vaccine-type.enum';
import { Observable } from 'rxjs';
import { selectUserVaccinations } from '../../shared/states/selectors/vaccine.selectors';
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
  vaccines$: Observable<Vaccine[]>;
  allVaccines: Vaccine[] = [];
  filteredVaccines: Vaccine[] = [];
  selectedVaccineType: VaccineType = VaccineType.CALENDAR;
  selectedUser: any = { id: 'user' };

  constructor(private store: Store<AppStateInterface>, private cdr: ChangeDetectorRef) {
    this.vaccines$ = this.store.select(selectUserVaccinations);
  }

  ngOnInit(): void {
    console.log('CalendarComponent: ngOnInit');
    this.getVaccinationsForCurrentUser();
    this.vaccines$.subscribe(vaccines => {
      console.log('CalendarComponent: vaccines$', vaccines);
      this.allVaccines = vaccines;
      this.filterVaccines();
    });
  }

  getVaccinationsForCurrentUser(): void {
    console.log('CalendarComponent: getVaccinationsForCurrentUser');
    if (this.selectedUser.id === 'user') {
      this.store.dispatch(VaccineAction.loadUserVaccinations());
    }
  }

  onUserChange(user: any): void {
    console.log('CalendarComponent: onUserChange', user);
    this.selectedUser = user;
    this.getVaccinationsForCurrentUser();
  }

  onVaccineTypeChange(type: VaccineType): void {
    console.log('CalendarComponent: onVaccineTypeChange', type);
    this.selectedVaccineType = type;
    this.filterVaccines();
  }

  filterVaccines(): void {
    if (!this.allVaccines) {
      console.error('filterVaccines: allVaccines is null');
      return;
    }

    console.log('CalendarComponent: filterVaccines', this.selectedVaccineType);
    this.filteredVaccines = this.allVaccines.filter(vaccine =>
      this.selectedVaccineType === VaccineType.CALENDAR
        ? vaccine.vaccine.type === VaccineType.CALENDAR
        : vaccine.vaccine.type === VaccineType.EPIDEMIOLOGY
    );
    this.cdr.detectChanges();
  }
}
