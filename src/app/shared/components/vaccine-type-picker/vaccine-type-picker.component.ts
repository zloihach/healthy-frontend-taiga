import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { TuiGroupModule } from '@taiga-ui/core';
import { TuiRadioBlockModule } from '@taiga-ui/kit';
import {VaccineType} from "../../enums/vaccine-type.enum";

@Component({
  selector: 'app-vaccine-type-picker',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    TuiGroupModule,
    TuiRadioBlockModule
  ],
  templateUrl: './vaccine-type-picker.component.html',
  styleUrls: ['./vaccine-type-picker.component.less']
})
export class VaccineTypePickerComponent {
  @Output() vaccineTypeChange = new EventEmitter<VaccineType>();

  readonly vaccineTypes = [VaccineType.EPIDEMIOLOGY, VaccineType.CALENDAR];
  readonly vaccineTypeRadio = new FormGroup({
    testValue: new FormControl(VaccineType.CALENDAR),
  });

  constructor() {
    this.vaccineTypeRadio.get('testValue')?.valueChanges.subscribe(value => {
      this.vaccineTypeChange.emit(value!);
    });
  }

  protected readonly VaccineType = VaccineType;
}
