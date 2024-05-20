import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatePipe, NgForOf } from '@angular/common';
import { VaccineCardComponent } from '../../shared/components/vaccine-card/vaccine-card.component';
import { VaccineTypePickerComponent } from '../../shared/components/vaccine-type-picker/vaccine-type-picker.component';
import { ChildrenComponent } from '../children/children.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Vaccine } from '../../shared/interfaces/vaccine.interface';
import { VaccineType } from '../../shared/enums/vaccine-type.enum';
import { Observable } from 'rxjs';
import { UserPickerTabsComponent } from '../../shared/components/user-picker-tabs/user-picker-tabs.component';
import { selectUserVaccinations } from '../../shared/states/selectors/vaccine.selectors';
import { AppState } from '../../shared/states/reducers/vaccine.reducer';
import * as VaccineAction from '../../shared/states/actions/vaccine.actions';

interface ChildVaccine {
  id: number;
  vaccine_id: number;
  child_id: number;
  medical_center: string;
  dose: number;
  serial_number: string;
  vaccination_date: string;
  commentary: string;
  is_vaccinated: boolean;
  created_at: string;
  updated_at: string;
  vaccine: Vaccine;
}

interface Child {
  id: number;
  lastname: string;
  firstname: string;
  midname: string;
  dob: string;
  sex: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
  ChildVaccine: ChildVaccine[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  imports: [
    DatePipe,
    NgForOf,
    VaccineCardComponent,
    VaccineTypePickerComponent,
    ChildrenComponent,
    ReactiveFormsModule,
    UserPickerTabsComponent
  ],
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {
  vaccines$: Observable<Vaccine[]>;
  filteredVaccines: Vaccine[] = [];
  selectedVaccineType: VaccineType = VaccineType.CALENDAR;
  selectedUser: any = { id: 'user' };

  constructor(private store: Store<AppState>) {
    this.vaccines$ = this.store.select(selectUserVaccinations);
  }

  ngOnInit(): void {
    this.getVaccinationsForCurrentUser();
    this.vaccines$.subscribe(vaccines => {
      this.filteredVaccines = vaccines;
      this.filterVaccines();
    });
  }

  getVaccinationsForCurrentUser(): void {
    if (this.selectedUser.id === 'user') {
      this.store.dispatch(VaccineAction.loadUserVaccinations());
    }
  }

  onUserChange(user: any): void {
    this.selectedUser = user;
    this.getVaccinationsForCurrentUser();
  }

  onVaccineTypeChange(type: VaccineType): void {
    this.selectedVaccineType = type;
    this.filterVaccines();
  }

  filterVaccines(): void {
    this.filteredVaccines = this.filteredVaccines.filter(vaccine =>
      this.selectedVaccineType === VaccineType.CALENDAR
        ? vaccine.vaccine.type === VaccineType.CALENDAR
        : vaccine.vaccine.type === VaccineType.EPIDEMIOLOGY
    );
  }
}
