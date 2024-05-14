import { Component, OnInit } from '@angular/core';
import {Vaccine} from "../../shared/interfaces/vaccine.interface";
import {VaccineService} from "./vaccine.service";
import {DatePipe, NgForOf} from "@angular/common";
import {VaccineCardComponent} from "../../shared/components/vaccine-card/vaccine-card.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  imports: [
    DatePipe,
    NgForOf,
    VaccineCardComponent
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
