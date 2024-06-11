import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TuiDay, TuiDayRange, TuiDayLike, TuiContextWithImplicit, TUI_DEFAULT_STRINGIFY} from '@taiga-ui/cdk';
import { TuiPoint } from '@taiga-ui/core';
import { TuiLineChartModule, TuiLineDaysChartModule, TuiAxesModule } from '@taiga-ui/addon-charts';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-admin-board',
  standalone: true,
  imports: [NgForOf, TuiLineChartModule, TuiLineDaysChartModule, TuiAxesModule],
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminBoardComponent {
  stats = [
    { title: 'Новые пользователи', value: 1234 },
    { title: 'Сделано вакцин', value: 5678 },
    { title: 'Активные пользователи', value: 91011 },
    { title: 'Всего пользователей', value: 121314 }
  ];
  readonly value: readonly TuiPoint[] = [
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
    [350, 90],
  ];

  readonly stringify = TUI_DEFAULT_STRINGIFY;

  readonly hintContent = ({
                            $implicit,
                          }: TuiContextWithImplicit<readonly TuiPoint[]>): number => $implicit[0][1];
}
