import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {TuiGroupModule} from "@taiga-ui/core";
import {TuiRadioBlockModule} from "@taiga-ui/kit";

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
  styleUrl: './vaccine-type-picker.component.less'
})
export class VaccineTypePickerComponent {
  constructor() {
  }

  readonly vaccineType = ['Эпидемиология', 'Нац. Календарь'];
  readonly vaccineTypeRadio = new FormGroup({
    testValue: new FormControl('orange'),
  });
}
