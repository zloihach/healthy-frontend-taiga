import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Vaccine } from '../../interfaces/vaccine.interface';
import {
  TuiButtonModule,
  TuiCardModule,
  TuiHeaderModule,
  TuiSurfaceModule,
  TuiTitleModule,
} from "@taiga-ui/experimental";
import { TuiPlatformModule } from "@taiga-ui/cdk";
import { DatePipe, NgClass, NgIf } from "@angular/common";
import { TuiBadgeModule } from "@taiga-ui/kit";
import { TruncatePipe } from "../../pipes/truncate.pipe";
import { Inject } from '@angular/core';
import { TuiDialogService } from "@taiga-ui/core";

@Component({
  selector: 'app-vaccine-card',
  templateUrl: './vaccine-card.component.html',
  standalone: true,
  imports: [
    TuiHeaderModule,
    TuiCardModule,
    TuiSurfaceModule,
    TuiPlatformModule,
    DatePipe,
    TuiBadgeModule,
    TuiButtonModule,
    TuiTitleModule,
    TruncatePipe,
    NgClass,
    NgIf
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./vaccine-card.component.less']
})
export class VaccineCardComponent {
  @Input() vaccine!: Vaccine;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {}

  openEditDialog(): void {
    this.dialogService.open('Здесь можно изменить прививку.', {
      label: 'Изменить прививку',
      size: 'm',
      data: { button: 'Закрыть' }
    }).subscribe({
      next: result => console.log('Dialog closed with:', result),
      error: error => console.error('Dialog failed with error:', error)
    });
  }

  openMarkDialog(): void {
    this.dialogService.open('Здесь можно отметить прививку.', {
      label: 'Отметить прививку',
      size: 'm',
      data: { button: 'Закрыть' }
    }).subscribe({
      next: result => console.log('Dialog closed with:', result),
      error: error => console.error('Dialog failed with error:', error)
    });
  }

  openDetailsDialog(): void {
    this.dialogService.open('Подробная информация о прививке.', {
      label: 'Подробности',
      size: 'm',
      data: { button: 'Закрыть' }
    }).subscribe({
      next: result => console.log('Dialog closed with:', result),
      error: error => console.error('Dialog failed with error:', error)
    });
  }
}
