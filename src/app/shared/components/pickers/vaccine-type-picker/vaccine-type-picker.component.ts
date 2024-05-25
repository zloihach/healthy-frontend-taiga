import { Component, EventEmitter, Output, ChangeDetectorRef, OnInit, NgZone } from '@angular/core';
import { NgForOf } from '@angular/common';
import { VaccineType } from '../../../enums/vaccine-type.enum';
import {TuiBadgeNotificationModule, TuiIconModule, TuiSegmentedModule} from "@taiga-ui/experimental";

@Component({
  selector: 'app-vaccine-type-picker',
  standalone: true,
  imports: [
    NgForOf,
    TuiSegmentedModule,
    TuiIconModule,
    TuiBadgeNotificationModule
  ],
  templateUrl: './vaccine-type-picker.component.html',
  styleUrls: ['./vaccine-type-picker.component.less']
})
export class VaccineTypePickerComponent implements OnInit {
  @Output() vaccineTypeChange = new EventEmitter<VaccineType>();

  readonly vaccineTypes = [VaccineType.ALL, VaccineType.EPIDEMIOLOGY, VaccineType.CALENDAR];
  protected active = 0;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.vaccineTypeChange.emit(this.vaccineTypes[this.active]);
  }

  onVaccineTypeChange(index: number): void {
    this.active = index;
    this.ngZone.run(() => {
      this.vaccineTypeChange.emit(this.vaccineTypes[index]);
      this.cdr.detectChanges();
    });
  }

  protected readonly VaccineType = VaccineType;
}
