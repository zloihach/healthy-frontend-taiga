import { Component, Input, Inject } from '@angular/core';
import { Vaccine } from '../../../interfaces/vaccine.interface';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TranslateDateDirective } from "../../../directives/dateTranslate.directive";
import { TuiBadgeModule } from "@taiga-ui/kit";
import { NgIf } from "@angular/common";
import {
  TuiButtonModule,
  TuiCardModule,
  TuiHeaderModule,
  TuiSurfaceModule,
  TuiTitleModule
} from "@taiga-ui/experimental";
import { TruncatePipe } from "../../../pipes/truncate.pipe";
import { TuiPlatformModule } from "@taiga-ui/cdk";
import { VaccineDialogComponent } from "../../dialogs/vaccine-dialog-component/vaccine-dialog.component";
import { InfoVaccineDialogComponent } from "../../dialogs/info-vaccine-dialog-component/info-vaccine-dialog.component";
import { VaccineMark } from "../../../interfaces/vaccine-mark.interface";
import { VaccineService } from "../../../../core/services/vaccine/vaccine.service";

@Component({
  selector: 'app-vaccine-card',
  templateUrl: './vaccine-card.component.html',
  standalone: true,
  imports: [
    TranslateDateDirective,
    TuiBadgeModule,
    NgIf,
    TuiButtonModule,
    TruncatePipe,
    TuiPlatformModule,
    TuiCardModule,
    TuiSurfaceModule,
    TuiHeaderModule,
    TuiTitleModule
  ],
  styleUrls: ['./vaccine-card.component.less']
})
export class VaccineCardComponent {
  @Input() vaccine!: Vaccine;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private vaccineService: VaccineService
  ) {}

  openEditDialog(): void {
    this.dialogService.open(
      new PolymorpheusComponent(VaccineDialogComponent),
      {
        size: 'm',
        data: { vaccine: this.vaccine, mode: 'edit' }
      }
    ).subscribe({
      next: result => {
        if (result!) {
          this.updateVaccine(this.mapToVaccineMark(result));
        }
      },
      error: error => console.error('Dialog failed with error:', error)
    });
  }

  openMarkDialog(): void {
    this.dialogService.open(
      new PolymorpheusComponent(VaccineDialogComponent),
      {
        size: 'm',
        data: { vaccine: this.vaccine, mode: 'mark' }
      }
    ).subscribe({
      next: result => {
        if (result!) {
          this.updateVaccine(this.mapToVaccineMark(result));
        }
      },
      error: error => console.error('Dialog failed with error:', error)
    });
  }

  openDetailsDialog(): void {
    this.dialogService.open(
      new PolymorpheusComponent(InfoVaccineDialogComponent),
      {
        size: 'm',
        data: { vaccine: this.vaccine }
      }
    ).subscribe({
      next: result => {
        if (result !== undefined) {
          console.log('Диалог с информацией о вакцине закрыт');
        }
      },
      error: error => console.error('Dialog failed with error:', error)
    });
  }

  updateVaccine(updatedVaccine: VaccineMark): void {
    this.vaccineService.updateVaccine(updatedVaccine).subscribe({
      next: response => {
        console.log('Прививка изменена:', response);
        this.vaccine = { ...this.vaccine, ...response };
      },
      error: error => console.error('Failed to update vaccine:', error)
    });
  }

  mapToVaccineMark(result: any): VaccineMark {
    console.log('Mapping result to VaccineMark:', result);
    return {
      vaccination_id: this.vaccine.id, // Используем id как vaccination_id
      is_vaccinated: result.is_vaccinated,
      medical_center: result.medical_center,
      dose: result.dose,
      serial_number: result.serial_number,
      vaccination_date: result.vaccination_date,
      commentary: result.commentary
    };
  }

  isVaccinationOverdue(): boolean {
    const today = new Date();
    const vaccinationDate = new Date(this.vaccine.planned_vaccination_date);
    return !this.vaccine.is_vaccinated && today > vaccinationDate;
  }

  isComingVaccination(): boolean {
    const today = new Date();
    const vaccinationDate = new Date(this.vaccine.planned_vaccination_date);
    return !this.vaccine.is_vaccinated && today < vaccinationDate;
  }
}
