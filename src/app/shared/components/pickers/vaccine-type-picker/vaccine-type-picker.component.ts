import {Component, EventEmitter, Output, ChangeDetectorRef, OnInit, NgZone} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { TuiGroupModule } from '@taiga-ui/core';
import { TuiRadioBlockModule } from '@taiga-ui/kit';
import { VaccineType } from '../../../enums/vaccine-type.enum';

@Component({
  selector: 'app-vaccine-type-picker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    TuiGroupModule,
    TuiRadioBlockModule
  ],
  templateUrl: './vaccine-type-picker.component.html',
  styleUrls: ['./vaccine-type-picker.component.less']
})
export class VaccineTypePickerComponent implements OnInit {
  @Output() vaccineTypeChange = new EventEmitter<VaccineType>();

  readonly vaccineTypes = [VaccineType.EPIDEMIOLOGY, VaccineType.CALENDAR];
  readonly vaccineTypeRadio = new FormGroup({
    testValue: new FormControl(VaccineType.CALENDAR),
  });

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.vaccineTypeRadio.get('testValue')?.valueChanges.subscribe(value => {
      this.ngZone.run(() => {
        this.vaccineTypeChange.emit(value!);
        this.cdr.detectChanges();
      });
    });
  }

  protected readonly VaccineType = VaccineType;
}
