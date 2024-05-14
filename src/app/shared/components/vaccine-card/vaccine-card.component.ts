import { Component, Input } from '@angular/core';
import { Vaccine } from '../../interfaces/vaccine.interface';
import {TuiButtonModule, TuiCardModule, TuiHeaderModule, TuiSurfaceModule} from "@taiga-ui/experimental";
import {TuiPlatformModule} from "@taiga-ui/cdk";
import {DatePipe} from "@angular/common";
import {TuiBadgeModule} from "@taiga-ui/kit";

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
    TuiButtonModule
  ],
  styleUrls: ['./vaccine-card.component.less']
})
export class VaccineCardComponent {
  @Input() vaccine!: Vaccine;
}
