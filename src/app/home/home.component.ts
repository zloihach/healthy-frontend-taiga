import {Component, Inject} from '@angular/core';
import {TuiAlertService} from "@taiga-ui/core";
import {TuiActionModule, TuiBadgeModule} from "@taiga-ui/kit";
import {VaccineCardComponent} from "../shared/components/vaccine-card/vaccine-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TuiActionModule,
    TuiBadgeModule,
    VaccineCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
  ) {}

  onClick(result: string): void {
    this.alerts.open(result).subscribe();
  }
}
