import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  TUI_IS_E2E,
  TuiDay,
  TuiDayLike,
  TuiDayRange,
  TuiMonth,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import { TUI_MONTHS } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {TuiInputDateRangeModule} from "@taiga-ui/kit";
import {TuiAxesModule, TuiLineDaysChartModule} from "@taiga-ui/addon-charts";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.less'],
  standalone: true,
  imports: [
    TuiInputDateRangeModule,
    TuiAxesModule,
    FormsModule,
    AsyncPipe,
    TuiLineDaysChartModule,
    NgIf,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminBoardComponent {
  range1 = new TuiDayRange(
    TuiDay.currentLocal(),
    TuiDay.currentLocal().append({ year: 1 }),
  );

  range2 = new TuiDayRange(
    TuiDay.currentLocal(),
    TuiDay.currentLocal().append({ year: 1 }),
  );

  range3 = new TuiDayRange(
    TuiDay.currentLocal(),
    TuiDay.currentLocal().append({ year: 1 }),
  );

  readonly maxLength: TuiDayLike = { month: 12 };

  readonly xStringify$: Observable<TuiStringHandler<TuiDay>> = this.months$.pipe(
    map(
      months =>
        ({ month, day }) =>
          `${months[month]}, ${day}`,
    ),
  );

  stats = [
    { title: 'Stat 1', value: '100' },
    { title: 'Stat 2', value: '200' },
    { title: 'Stat 3', value: '200' },
    { title: 'Stat 4', value: '200' },
  ];

  data1: ReadonlyArray<[TuiDay, number]> = this.computeValue(this.range1);
  data2: ReadonlyArray<[TuiDay, number]> = this.computeValue(this.range2);
  data3: ReadonlyArray<[TuiDay, number]> = this.computeValue(this.range3);

  constructor(
    @Inject(TUI_MONTHS) private readonly months$: Observable<readonly string[]>,
    @Inject(TUI_IS_E2E) readonly isE2E: boolean,
  ) { }

  get value1(): ReadonlyArray<[TuiDay, number]> {
    return this.data1;
  }

  get value2(): ReadonlyArray<[TuiDay, number]> {
    return this.data2;
  }

  get value3(): ReadonlyArray<[TuiDay, number]> {
    return this.data3;
  }

  @tuiPure
  computeLabels$({ from, to }: TuiDayRange): Observable<readonly string[]> {
    return this.months$.pipe(
      map(months =>
        Array.from(
          { length: TuiMonth.lengthBetween(from, to) + 1 },
          (_, i) => months[from.append({ month: i }).month],
        ),
      ),
    );
  }

  readonly yStringify: TuiStringHandler<number> = y =>
    `${(10 * y).toLocaleString('en-US', { maximumFractionDigits: 0 })} $`;

  @tuiPure
  private computeValue({ from, to }: TuiDayRange): ReadonlyArray<[TuiDay, number]> {
    const values = new Array(TuiDay.lengthBetween(from, to) + 1)
      .fill(0)
      .reduce<ReadonlyArray<[TuiDay, number]>>(
        (array, _, i) => [
          ...array,
          [
            from.append({ day: i }),
            this.isE2E
              ? 100
              : (i ? array[i - 1][1] : 100) + Math.random() * 10 - 5,
          ],
        ],
        [],
      );
    return values;
  }

}
