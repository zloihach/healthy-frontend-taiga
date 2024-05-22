// import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
// import { Vaccine } from '../../interfaces/vaccine.interface';
// import {
//   TuiButtonModule,
//   TuiCardModule,
//   TuiHeaderModule,
//   TuiSurfaceModule,
//   TuiTitleModule,
// } from "@taiga-ui/experimental";
// import { TuiPlatformModule } from "@taiga-ui/cdk";
// import { DatePipe, NgClass, NgIf } from "@angular/common";
// import { TuiBadgeModule } from "@taiga-ui/kit";
// import { TruncatePipe } from "../../pipes/truncate.pipe";
// import { Inject } from '@angular/core';
// import { TuiDialogService } from "@taiga-ui/core";
// import {DateRuPipe} from "../../pipes/date-ru.pipe";
// import {TranslateDateDirective} from "../../directives/dateTranslate.directive";
// import {EditVaccineDialogComponent} from "../vaccine-dialog-component/edit-vaccine-dialog.component";
// import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
//
// @Component({
//   selector: 'app-vaccine-card',
//   templateUrl: './vaccine-card.component.html',
//   standalone: true,
//   imports: [
//     TuiHeaderModule,
//     TuiCardModule,
//     TuiSurfaceModule,
//     TuiPlatformModule,
//     DatePipe,
//     TuiBadgeModule,
//     TuiButtonModule,
//     TuiTitleModule,
//     TruncatePipe,
//     NgClass,
//     NgIf,
//     DateRuPipe,
//     TranslateDateDirective
//   ],
//   encapsulation: ViewEncapsulation.None,
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   styleUrls: ['./vaccine-card.component.less']
// })
// export class VaccineCardComponent {
//   @Input() vaccine!: Vaccine;
//
//   constructor(
//     @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
//   ) {}
//
//   openEditDialog(): void {
//     this.dialogService.open<Vaccine>(
//       new PolymorpheusComponent(EditVaccineDialogComponent),
//       {
//         size: 'm',
//         data: { vaccine: this.vaccine }
//       }
//     ).subscribe({
//       next: result => {
//         if (result) {
//           console.log('Прививка изменена:', result);
//         }
//       },
//       error: error => console.error('Dialog failed with error:', error)
//     });
//   }
//
//   openMarkDialog(): void {
//     // this.dialogService.open('Здесь можно отметить прививку.', {
//     //   label: 'Отметить прививку',
//     //   size: 'm',
//     //   data: { button: 'Закрыть' }
//     // }).subscribe({
//     //   next: result => console.log('Dialog closed with:', result),
//     //   error: error => console.error('Dialog failed with error:', error)
//     // });
//   }
//
//   openDetailsDialog(): void {
//     // this.dialogService.open('Подробная информация о прививке.', {
//     //   label: 'Подробности',
//     //   size: 'm',
//     //   data: { button: 'Закрыть' }
//     // }).subscribe({
//     //   next: result => console.log('Dialog closed with:', result),
//     //   error: error => console.error('Dialog failed with error:', error)
//     // });
//   }
//   isVaccinationOverdue(): boolean {
//     const today = new Date();
//     const vaccinationDate = new Date(this.vaccine.planned_vaccination_date);
//     return !this.vaccine.is_vaccinated && today > vaccinationDate;
//   }
//
// }
import { TuiDialogService } from '@taiga-ui/core';
import { Component, Input, Inject } from '@angular/core';
import { Vaccine } from '../../interfaces/vaccine.interface';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TranslateDateDirective } from "../../directives/dateTranslate.directive";
import { TuiBadgeModule } from "@taiga-ui/kit";
import { NgIf } from "@angular/common";
import {
  TuiButtonModule,
  TuiCardModule,
  TuiHeaderModule,
  TuiSurfaceModule,
  TuiTitleModule
} from "@taiga-ui/experimental";
import { TruncatePipe } from "../../pipes/truncate.pipe";
import { TuiPlatformModule } from "@taiga-ui/cdk";
import {VaccineDialogComponent} from "../vaccine-dialog-component/vaccine-dialog.component";

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
          // Обновите объект вакцинации здесь, если это необходимо
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
          // Обновите объект вакцинации здесь, если это необходимо
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
}
