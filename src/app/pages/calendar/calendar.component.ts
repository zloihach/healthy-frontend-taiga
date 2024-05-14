import { Component, OnInit } from '@angular/core';
import {Vaccine} from "../../shared/interfaces/vaccine.interface";
import {VaccineService} from "./vaccine.service";
import {DatePipe, NgForOf} from "@angular/common";
import {VaccineCardComponent} from "../../shared/components/vaccine-card/vaccine-card.component";
import {VaccineTypePickerComponent} from "../../shared/components/vaccine-type-picker/vaccine-type-picker.component";
import {ChildrenComponent} from "../children/children.component";
import {ReactiveFormsModule} from "@angular/forms";
import {UserPickerTabs} from "../../shared/components/user-picker-tabs/user-picker-tabs";

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
    UserPickerTabs
  ],
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {
  vaccines: Vaccine[] = [];

  constructor(private vaccineService: VaccineService) {}

  ngOnInit(): void {
    this.getVaccinationsForCurrentUser();
  }

  getVaccinationsForCurrentUser(): void {
    this.vaccineService.getAllVaccinationsForCurrentUser().subscribe(
      (vaccines: Vaccine[]) => {
        this.vaccines = vaccines;
      },
      (error) => {
        console.error('Error fetching vaccines:', error);
      }
    );
  }
}
