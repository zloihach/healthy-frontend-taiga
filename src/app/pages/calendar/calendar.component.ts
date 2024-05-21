import { ChangeDetectorRef, Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { Vaccine } from '../../shared/interfaces/vaccine.interface';
import { VaccineType } from '../../shared/enums/vaccine-type.enum';
import { Observable } from 'rxjs';
import { selectUserVaccinations } from '../../shared/states/selectors/vaccine.selectors';
import * as VaccineAction from '../../shared/states/actions/vaccine.actions';
import { VaccineCardComponent } from "../../shared/components/vaccine-card/vaccine-card.component";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { VaccineTypePickerComponent } from "../../shared/components/vaccine-type-picker/vaccine-type-picker.component";
import { UserPickerTabsComponent } from "../../shared/components/user-picker-tabs/user-picker-tabs.component";
import { AppStateInterface } from "../../shared/interfaces/appStates.interface";

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
    NgClass
  ],
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit, AfterViewChecked {
  @Input() vaccinations: Vaccine[] = [];
  filteredVaccines: Vaccine[] = [];
  selectedVaccineType: VaccineType = VaccineType.CALENDAR;
  selectedUser: any = { id: 'user' };
  userVaccinations$: Observable<Vaccine[]>;

  constructor(private store: Store<AppStateInterface>, private cdr: ChangeDetectorRef) {
    this.userVaccinations$ = this.store.select(selectUserVaccinations);
  }

  ngOnInit(): void {
    this.store.dispatch(VaccineAction.loadUserVaccinations());
    this.userVaccinations$.subscribe(vaccinations => {
      this.vaccinations = vaccinations;
      this.filterVaccines();
      this.cdr.detectChanges(); // Принудительное обнаружение изменений
    });
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges(); // Принудительное обновление после обновления представления
  }

  onUserChange({ user, vaccinations }: { user: any, vaccinations: any[] }): void {
    this.selectedUser = user;
    this.vaccinations = vaccinations;
    this.filterVaccines();
    this.cdr.detectChanges(); // Принудительное обнаружение изменений
  }

  onVaccineTypeChange(type: VaccineType): void {
    this.selectedVaccineType = type;
    this.filterVaccines();
    this.cdr.detectChanges(); // Принудительное обнаружение изменений
  }

  filterVaccines(): void {
    if (!this.vaccinations) {
      console.error('filterVaccines: vaccinations is null');
      return;
    }

    this.filteredVaccines = this.vaccinations.filter(vaccine =>
      this.selectedVaccineType === VaccineType.CALENDAR
        ? vaccine.vaccine.type === VaccineType.CALENDAR
        : vaccine.vaccine.type === VaccineType.EPIDEMIOLOGY
    );
    this.cdr.detectChanges(); // Принудительное обнаружение изменений
  }
}
