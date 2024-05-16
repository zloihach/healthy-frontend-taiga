import { Component, Input } from '@angular/core';
import { Vaccine } from '../../interfaces/vaccine.interface';
import {
  TuiButtonModule,
  TuiCardModule,
  TuiHeaderModule,
  TuiSurfaceModule,
  TuiTitleModule
} from "@taiga-ui/experimental";
import {TuiPlatformModule} from "@taiga-ui/cdk";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {TuiBadgeModule} from "@taiga-ui/kit";
import {TruncatePipe} from "../../pipes/truncate.pipe";

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
  styleUrls: ['./vaccine-card.component.less']
})
export class VaccineCardComponent {
  @Input() vaccine!: Vaccine;
}
