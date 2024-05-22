import { Component, Inject } from '@angular/core';
import {TuiButtonModule, TuiDialogContext, TuiDialogModule} from '@taiga-ui/core';
import { Vaccine } from '../../../interfaces/vaccine.interface';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CommonModule } from '@angular/common';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { TranslateDateDirective } from '../../../directives/dateTranslate.directive';

@Component({
  selector: 'app-info-vaccine-dialog',
  templateUrl: './info-vaccine-dialog.component.html',
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
