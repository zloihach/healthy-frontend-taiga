import {Component, Inject} from '@angular/core';
import {TuiTabsModule} from "@taiga-ui/kit";
import {TuiAlertService} from "@taiga-ui/core";

@Component({
  selector: 'app-user-picker-tabs',
  standalone: true,
  imports: [
    TuiTabsModule
  ],
  templateUrl: './user-picker-tabs.html',
  styleUrl: './user-picker-tabs.less'
})
export class UserPickerTabs {
  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
  ) {}
  activeItemIndex = 0;

  onClick(result: string): void {
    this.alerts.open(result).subscribe();
  }

}
