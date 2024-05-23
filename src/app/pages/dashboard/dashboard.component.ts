import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule } from "@taiga-ui/core";
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiSelectModule,
  TuiToggleModule
} from "@taiga-ui/kit";
import { VaccineService } from "../../core/services/vaccine/vaccine.service";

interface GenderOption {
  id: number;
  name: string;
  value: 'MALE' | 'FEMALE';
}

interface PeriodOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiButtonModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiSelectModule,
    TuiToggleModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiIslandModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  personalDataForm: FormGroup;
  securityForm: FormGroup;
  notificationForm: FormGroup;
  userData: any;

  genderOptions: GenderOption[] = [
    { id: 1, name: 'Мужской', value: 'MALE' },
    { id: 2, name: 'Женский', value: 'FEMALE' }
  ];

  periodOptions: PeriodOption[] = [
    { value: 1, label: 'За 1 день до вакцинации' },
    { value: 3, label: 'За 3 дня до вакцинации' },
    { value: 7, label: 'За 7 дней до вакцинации' } // Corrected label
  ];

  constructor(private fb: FormBuilder, private vaccineService: VaccineService) {
    this.personalDataForm = this.fb.group({
      lastName: [''],
      firstName: [''],
      middleName: [''],
      email: [''],
      birthDate: [''],
      gender: ['']
    });

    this.securityForm = this.fb.group({
      oldPassword: [''],
      newPassword: [''],
      repeatPassword: ['']
    });

    this.notificationForm = this.fb.group({
      notifications: [true],
      periodicity: [1]
    });
  }

  ngOnInit() {
    this.vaccineService.getCurrentUser().subscribe(user => {
      this.userData = user;
      this.personalDataForm.patchValue({
        lastName: user.lastname,
        firstName: user.firstname,
        middleName: user.midname,
        email: user.email,
        birthDate: new Date(user.dob).toISOString().substring(0, 10),
        gender: this.genderOptions.find(option => option.value === user.sex)
      });
      this.notificationForm.patchValue({
        notifications: user.is_active,
        periodicity: user.notification_period
      });
    });
  }

  genderStringify = (item: GenderOption): string => {
    return item.name;
  };

  periodStringify = (item: PeriodOption): string => {
    return item.label;
  };
}
