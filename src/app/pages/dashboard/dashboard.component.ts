import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiInputModule, TuiInputPasswordModule, TuiSelectModule, TuiToggleModule } from "@taiga-ui/kit";
import { TuiDataListModule } from '@taiga-ui/core';

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
    TuiDataListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {
  personalDataForm: FormGroup;
  securityForm: FormGroup;
  notificationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personalDataForm = this.fb.group({
      lastName: ['Петрова'],
      firstName: ['Василиса'],
      middleName: ['Михайловна'],
      email: ['healthy@mail.com'],
      birthDate: ['19/09/2023 23:24'],
      gender: ['female']
    });

    this.securityForm = this.fb.group({
      oldPassword: [''],
      newPassword: [''],
      repeatPassword: ['']
    });

    this.notificationForm = this.fb.group({
      notifications: [true],
      periodicity: ['1_day_before']
    });
  }
}
