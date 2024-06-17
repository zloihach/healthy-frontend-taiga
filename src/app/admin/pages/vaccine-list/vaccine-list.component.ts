import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, AsyncPipe } from '@angular/common';
import { TuiButtonModule, TuiDialogService, TuiDialogModule } from '@taiga-ui/core';
import { TuiAccordionModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {
  EditVaccineDialogComponent
} from "../../../shared/components/dialogs/edit-vaccine-dialog/edit-vaccine-dialog.component";

interface Vaccine {
  readonly name: string;
  readonly type: string;
  readonly min_age: number;
  readonly max_age: number;
  readonly description: string;
}

@Component({
  selector: 'app-vaccine-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    TuiAccordionModule,
    TuiTableModule,
    TuiInputModule,
    TuiButtonModule,
    TuiDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaccineListComponent {
  readonly form = new FormGroup({
    search: new FormControl(''),
  });

  vaccines: Vaccine[] = [
    { name: 'Pfizer-BioNTech', type: 'CALENDAR', min_age: 12, max_age: 52, description: 'This vaccine is used to prevent COVID-19. It works by teaching the immune system how to recognize and fight the virus that causes COVID-19. This vaccine is usually given as 2 shots in the upper arm muscle spaced 3 weeks apart.' },
    { name: 'Moderna', type: 'CALENDAR', min_age: 18, max_age: 60, description: 'The Moderna COVID-19 vaccine is another mRNA vaccine that provides protection against COVID-19. It is administered in two doses, four weeks apart.' },
  ];

  readonly columns = ['name', 'type', 'min_age', 'max_age', 'actions'];

  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService) {}

  get filteredVaccines(): Vaccine[] {
    const searchValue = this.form.value.search?.toLowerCase() || '';
    return this.vaccines.filter(vaccine =>
      vaccine.name.toLowerCase().includes(searchValue) ||
      vaccine.type.toLowerCase().includes(searchValue) ||
      vaccine.min_age.toString().includes(searchValue) ||
      vaccine.max_age.toString().includes(searchValue) ||
      vaccine.description.toLowerCase().includes(searchValue)
    );
  }

  openDialog(vaccine?: Vaccine): void {
    const dialogRef = this.dialogs.open<Vaccine>(
      new PolymorpheusComponent(EditVaccineDialogComponent),
      {
        data: vaccine || { name: '', type: '', min_age: 0, max_age: 0, description: '' },
        size: 'l',
      }
    );

    dialogRef.subscribe(result => {
      if (result) {
        if (vaccine) {
          this.vaccines = this.vaccines.map(v => v.name === vaccine.name ? { ...result } : v);
        } else {
          this.vaccines = [...this.vaccines, result];
        }
      }
    });
  }

  openVaccineDialog(vaccine: Vaccine): void {
    const dialogRef = this.dialogs.open(
      `<h3>${vaccine.name}</h3>
      <h4>${vaccine.type}</h4>
      <p>Age: ${vaccine.min_age} - ${vaccine.max_age}</p>
      <p>${vaccine.description}</p>`,
      {
        label: vaccine.name,
        size: 'm',
        data: { button: 'Закрыть' }
      }
    );

    dialogRef.subscribe({
      next: result => console.log('Dialog closed with:', result),
      error: error => console.error('Dialog failed with error:', error)
    });
  }

  view(vaccine: Vaccine): void {
    this.openVaccineDialog(vaccine);
  }

  edit(vaccine: Vaccine): void {
    this.openDialog(vaccine);
  }

  remove(vaccine: Vaccine): void {
    this.vaccines = this.vaccines.filter(v => v !== vaccine);
  }
}
