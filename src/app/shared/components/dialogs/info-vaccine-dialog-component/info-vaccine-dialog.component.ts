import { Component, Inject } from '@angular/core';
import {TuiButtonModule, TuiDialogContext, TuiDialogModule} from '@taiga-ui/core';
import { Vaccine } from '../../../interfaces/vaccine.interface';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CommonModule } from '@angular/common';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { TranslateDateDirective } from '../../../directives/dateTranslate.directive';

@Component({
  selector: 'app-info-vaccine-dialog',
  template: `
    <div class="info-vaccine-dialog">
      <h2>Информация о вакцине</h2>
      <div class="info-item">
        <strong>Название:</strong> {{ vaccine.vaccine.name }}
      </div>
      <div class="info-item">
        <strong>Тип:</strong> {{ vaccine.vaccine.type === 'CALENDAR' ? 'Календарь' : 'Эпидемиология' }}
      </div>
      <div class="info-item">
        <strong>Медицинский центр:</strong> {{ vaccine.medical_center }}
      </div>
      <div class="info-item">
        <strong>Доза:</strong> {{ vaccine.dose }}
      </div>
      <div class="info-item">
        <strong>Серийный номер:</strong> {{ vaccine.serial_number }}
      </div>
      <div class="info-item">
        <strong>Дата вакцинации:</strong>
        <span *ngIf="vaccine.vaccination_date; else noVaccinationDate">
          <span [translateDate]="vaccine.vaccination_date"></span>
        </span>
        <ng-template #noVaccinationDate>Нет данных</ng-template>
      </div>
      <div class="info-item">
        <strong>Плановая дата:</strong>
        <span [translateDate]="vaccine.planned_vaccination_date"></span>
      </div>
      <div class="info-item">
        <strong>Комментарий:</strong> {{ vaccine.commentary }}
      </div>
      <div class="info-item">
        <strong>Статус:</strong>
        <span>{{ vaccine.is_vaccinated ? 'Сделана' : 'Не сделана' }}</span>
      </div>
      <div class="info-item">
        <strong>Создано:</strong>
        <span [translateDate]="vaccine.created_at"></span>
      </div>
      <div class="info-item">
        <strong>Обновлено:</strong>
        <span [translateDate]="vaccine.updated_at"></span>
      </div>
      <div class="button-group">
        <button tuiButton type="button" appearance="secondary" (click)="onClose()">Закрыть</button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    TuiDialogModule,
    TuiBadgeModule,
    TranslateDateDirective,
    TuiButtonModule
  ],
  styleUrls: ['./info-vaccine-dialog.component.less']
})
export class InfoVaccineDialogComponent {
  vaccine: Vaccine;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, { vaccine: Vaccine }>
  ) {
    this.vaccine = this.context.data.vaccine;
  }

  onClose(): void {
    this.context.completeWith();
  }
}
