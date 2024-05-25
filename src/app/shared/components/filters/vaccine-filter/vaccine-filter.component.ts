import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiBooleanHandler} from '@taiga-ui/cdk';
import {TuiFilterModule} from "@taiga-ui/kit";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-vaccine-filter',
  templateUrl: './vaccine-filter.component.html',
  styleUrls: ['./vaccine-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TuiFilterModule,
    JsonPipe
  ],
  standalone: true
})
export class VaccineFilterComponent {
  readonly form = new FormGroup({
    filters: new FormControl(['Food']),
  });

  readonly items = [
    'Food',
    'Clothes',
    'Popular',
    'Building materials',
  ];

  disabledItemHandler: TuiBooleanHandler<string> = item => item.length < 7;
}
