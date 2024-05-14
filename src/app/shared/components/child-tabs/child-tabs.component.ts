import {Component, Inject} from '@angular/core';
import {TuiTabsModule} from "@taiga-ui/kit";
import {TuiAlertService} from "@taiga-ui/core";

@Component({
  selector: 'app-321',
  standalone: true,
  imports: [
    TuiTabsModule
  ],
  templateUrl: './child-tabs.component.html',
  styleUrl: './child-tabs.component.less'
})
export class ChildTabsComponent {
  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
  ) {}
  activeItemIndex = 0;

  onClick(result: string): void {
    this.alerts.open(result).subscribe();
  }

}
