import { TuiDialogService } from '@taiga-ui/core';
import { Component, Input, Inject } from '@angular/core';
import { Vaccine } from '../../../interfaces/vaccine.interface';
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
import {VaccineDialogComponent} from "../../dialogs/vaccine-dialog-component/vaccine-dialog.component";
import {
  InfoVaccineDialogComponent
} from "../../dialogs/info-vaccine-dialog-component/info-vaccine-dialog.component";

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
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
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
          console.log('Прививка изменена:', result);
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
          console.log('Факт вакцинации отмечен:', result);
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
        if (result!) {
          console.log('Диалог с информацией о вакцине закрыт');
        }
      },
      error: error => console.error('Dialog failed with error:', error)
    });
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
