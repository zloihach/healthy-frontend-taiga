import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Vaccine } from '../../shared/interfaces/vaccine.interface';
import { VaccineType } from '../../shared/enums/vaccine-type.enum';
import { Observable } from 'rxjs';
import { selectUserVaccinations } from '../../shared/states/selectors/vaccine.selectors';
import { AppState } from '../../shared/states/reducers/vaccine.reducer';
import * as VaccineAction from '../../shared/states/actions/vaccine.actions';
import {VaccineCardComponent} from "../../shared/components/vaccine-card/vaccine-card.component";
import {NgForOf} from "@angular/common";
import {VaccineTypePickerComponent} from "../../shared/components/vaccine-type-picker/vaccine-type-picker.component";
import {UserPickerTabsComponent} from "../../shared/components/user-picker-tabs/user-picker-tabs.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [
    VaccineCardComponent,
    NgForOf,
    VaccineTypePickerComponent,
    UserPickerTabsComponent
  ],
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {
  vaccines$: Observable<Vaccine[]>;
  filteredVaccines: Vaccine[] = [];
  selectedVaccineType: VaccineType = VaccineType.CALENDAR;
  selectedUser: any = { id: 'user' };

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    this.vaccines$ = this.store.select(selectUserVaccinations);
  }

  ngOnInit(): void {
    console.log('CalendarComponent initialized');
    this.getVaccinationsForCurrentUser();
    this.vaccines$.subscribe(vaccines => {
      console.log('Received vaccines from store:', vaccines);
      this.filteredVaccines = vaccines;
      this.filterVaccines();
    });
  }

  getVaccinationsForCurrentUser(): void {
    console.log('Getting vaccinations for current user');
    if (this.selectedUser.id === 'user') {
      this.store.dispatch(VaccineAction.loadUserVaccinations());
    }
  }

  onUserChange(user: any): void {
    console.log('User changed:', user);
    this.selectedUser = user;
    this.ngZone.run(() => {
      this.getVaccinationsForCurrentUser();
      this.cdr.detectChanges(); // Ensure change detection
    });
  }

  onVaccineTypeChange(type: VaccineType): void {
    console.log('Vaccine type changed:', type);
    this.ngZone.run(() => {
      this.selectedVaccineType = type;
      this.filterVaccines();
      this.cdr.detectChanges(); // Ensure change detection
    });
  }

  filterVaccines(): void {
    console.log('Filtering vaccines based on selected vaccine type:', this.selectedVaccineType);
    this.filteredVaccines = this.filteredVaccines.filter(vaccine =>
      this.selectedVaccineType === VaccineType.CALENDAR
        ? vaccine.vaccine.type === VaccineType.CALENDAR
        : vaccine.vaccine.type === VaccineType.EPIDEMIOLOGY
    );
  }
}
