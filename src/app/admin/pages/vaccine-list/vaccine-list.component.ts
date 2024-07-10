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
  readonly id: number;
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
    { id: 1, name: 'Первая вакцинация против вирусного гепатита B', type: 'CALENDAR', min_age: 0, max_age: 0, description: 'Новорожденные в первые 24 часа жизни' },
    { id: 2, name: 'Вакцинация против туберкулеза', type: 'CALENDAR', min_age: 0, max_age: 7, description: 'Новорожденные на 3 - 7 день жизни' },
    { id: 3, name: 'Вторая вакцинация против вирусного гепатита B', type: 'CALENDAR', min_age: 1, max_age: 1, description: 'Дети 1 месяц' },
    { id: 4, name: 'Третья вакцинация против вирусного гепатита B (группы риска)', type: 'CALENDAR', min_age: 2, max_age: 2, description: 'Дети 2 месяца' },
    { id: 5, name: 'Первая вакцинация против пневмококковой инфекции', type: 'CALENDAR', min_age: 2, max_age: 2, description: 'Дети 2 месяца' },
    { id: 6, name: 'Первая вакцинация против дифтерии, коклюша, столбняка', type: 'CALENDAR', min_age: 3, max_age: 3, description: 'Дети 3 месяца' },
    { id: 7, name: 'Первая вакцинация против полиомиелита', type: 'CALENDAR', min_age: 3, max_age: 3, description: 'Дети 3 месяца' },
    { id: 8, name: 'Первая вакцинация против гемофильной инфекции типа b', type: 'CALENDAR', min_age: 3, max_age: 3, description: 'Дети 3 месяца' },
    { id: 9, name: 'Вторая вакцинация против дифтерии, коклюша, столбняка', type: 'CALENDAR', min_age: 4, max_age: 4.5, description: 'Дети 4,5 месяца' },
    { id: 10, name: 'Вторая вакцинация против гемофильной инфекции типа b', type: 'CALENDAR', min_age: 4, max_age: 4.5, description: 'Дети 4,5 месяца' },
    { id: 11, name: 'Вторая вакцинация против полиомиелита', type: 'CALENDAR', min_age: 4, max_age: 4.5, description: 'Дети 4,5 месяца' },
    { id: 12, name: 'Вторая вакцинация против пневмококковой инфекции', type: 'CALENDAR', min_age: 4, max_age: 4.5, description: 'Дети 4,5 месяца' },
    { id: 13, name: 'Третья вакцинация против дифтерии, коклюша, столбняка', type: 'CALENDAR', min_age: 6, max_age: 6, description: 'Дети 6 месяцев' },
    { id: 14, name: 'Третья вакцинация против вирусного гепатита B', type: 'CALENDAR', min_age: 6, max_age: 6, description: 'Дети 6 месяцев' },
    { id: 15, name: 'Третья вакцинация против полиомиелита', type: 'CALENDAR', min_age: 6, max_age: 6, description: 'Дети 6 месяцев' },
    { id: 16, name: 'Третья вакцинация против гемофильной инфекции типа b', type: 'CALENDAR', min_age: 6, max_age: 6, description: 'Дети 6 месяцев' },
    { id: 17, name: 'Вакцинация против кори, краснухи, эпидемического паротита', type: 'CALENDAR', min_age: 12, max_age: 12, description: 'Дети 12 месяцев' },
    { id: 18, name: 'Четвертая вакцинация против вирусного гепатита B (группы риска)', type: 'CALENDAR', min_age: 12, max_age: 12, description: 'Дети 12 месяцев' },
    { id: 19, name: 'Ревакцинация против пневмококковой инфекции', type: 'CALENDAR', min_age: 15, max_age: 15, description: 'Дети 15 месяцев' },
    { id: 20, name: 'Первая ревакцинация против дифтерии, коклюша, столбняка', type: 'CALENDAR', min_age: 18, max_age: 18, description: 'Дети 18 месяцев' },
    { id: 21, name: 'Первая ревакцинация против полиомиелита', type: 'CALENDAR', min_age: 18, max_age: 18, description: 'Дети 18 месяцев' },
    { id: 22, name: 'Ревакцинация против гемофильной инфекции типа b', type: 'CALENDAR', min_age: 18, max_age: 18, description: 'Дети 18 месяцев' },
    { id: 23, name: 'Вторая ревакцинация против полиомиелита', type: 'CALENDAR', min_age: 20, max_age: 20, description: 'Дети 20 месяцев' },
    { id: 24, name: 'Ревакцинация против кори, краснухи, эпидемического паротита', type: 'CALENDAR', min_age: 72, max_age: 72, description: 'Дети 6 лет' },
    { id: 25, name: 'Третья ревакцинация против полиомиелита', type: 'CALENDAR', min_age: 72, max_age: 72, description: 'Дети 6 лет' },
    { id: 26, name: 'Вторая ревакцинация против дифтерии, столбняка', type: 'CALENDAR', min_age: 84, max_age: 84, description: 'Дети 6 - 7 лет' },
    { id: 27, name: 'Ревакцинация против туберкулеза', type: 'CALENDAR', min_age: 84, max_age: 84, description: 'Дети 6 - 7 лет' },
    { id: 28, name: 'Третья ревакцинация против дифтерии, столбняка', type: 'CALENDAR', min_age: 168, max_age: 168, description: 'Дети 14 лет' },
    { id: 29, name: 'Ревакцинация против дифтерии, столбняка', type: 'CALENDAR', min_age: 216, max_age: 216, description: 'Взрослые от 18 лет' },
    { id: 30, name: 'Против туляремии', type: 'EPIDEMIOLOGY', min_age: 84, max_age: 6240, description: 'Лица, проживающие на энзоотичных по туляремии территориях' },
    { id: 31, name: 'Против чумы', type: 'EPIDEMIOLOGY', min_age: 24, max_age: 6240, description: 'Лица, временно или постоянно находящиеся на территории природного очага' },
    { id: 32, name: 'Против бруцеллеза', type: 'EPIDEMIOLOGY', min_age: 864, max_age: 6240, description: 'Лица, работающие с живыми культурами возбудителя бруцеллеза' },
    { id: 33, name: 'Против сибирской язвы', type: 'EPIDEMIOLOGY', min_age: 672, max_age: 6240, description: 'Лица, работающие с живыми культурами возбудителя сибирской язвы' },
    { id: 34, name: 'Против бешенства', type: 'EPIDEMIOLOGY', min_age: 48, max_age: 6240, description: 'Лица, работающие с живыми культурами возбудителя бешенства' },
    { id: 35, name: 'Против лептоспироза', type: 'EPIDEMIOLOGY', min_age: 336, max_age: 6240, description: 'Лица, работающие с живыми культурами возбудителя лептоспироза' },
    { id: 36, name: 'Против клещевого вирусного энцефалита', type: 'EPIDEMIOLOGY', min_age: 48, max_age: 6240, description: 'Лица, проживающие на эндемичных по клещевому вирусному энцефалиту территориях' },
    { id: 37, name: 'Против лихорадки Ку', type: 'EPIDEMIOLOGY', min_age: 48, max_age: 6240, description: 'Лица, работающие с живыми культурами возбудителя лихорадки Ку' },
    { id: 38, name: 'Против желтой лихорадки', type: 'EPIDEMIOLOGY', min_age: 48, max_age: 6240, description: 'Лица, выезжающие за пределы Российской Федерации в энзоотичные по желтой лихорадке страны' },
    { id: 39, name: 'Против холеры', type: 'EPIDEMIOLOGY', min_age: 48, max_age: 6240, description: 'Лица, выезжающие в неблагополучные по холере страны' },
    { id: 40, name: 'Против брюшного тифа', type: 'EPIDEMIOLOGY', min_age: 144, max_age: 6240, description: 'Лица, занятые в сфере коммунального благоустройства' },
    { id: 41, name: 'Против вирусного гепатита A', type: 'EPIDEMIOLOGY', min_age: 144, max_age: 6240, description: 'Лица, проживающие в регионах, неблагополучных по заболеваемости вирусным гепатитом A' },
    { id: 42, name: 'Против шигеллезов', type: 'EPIDEMIOLOGY', min_age: 48, max_age: 6240, description: 'Работники медицинских организаций инфекционного профиля' },
    { id: 43, name: 'Против менингококковой инфекции', type: 'EPIDEMIOLOGY', min_age: 48, max_age: 6240, description: 'Дети и взрослые в очагах менингококковой инфекции' },
    { id: 44, name: 'Против кори', type: 'EPIDEMIOLOGY', min_age: 48, max_age: 6240, description: 'Контактные лица без ограничения возраста из очагов заболевания' },
    { id: 45, name: 'Против вирусного гепатита B', type: 'EPIDEMIOLOGY', min_age: 0, max_age: 6240, description: 'Контактные лица из очагов заболевания, не болевшие, не привитые' },
    { id: 46, name: 'Против дифтерии', type: 'EPIDEMIOLOGY', min_age: 48, max_age: 6240, description: 'Контактные лица из очагов заболевания, не болевшие, не привитые' },
    { id: 47, name: 'Против эпидемического паротита', type: 'EPIDEMIOLOGY', min_age: 48, max_age: 6240, description: 'Контактные лица из очагов заболевания, ранее не болевшие, не привитые' },
    { id: 48, name: 'Против полиомиелита', type: 'EPIDEMIOLOGY', min_age: 0, max_age: 6240, description: 'Контактные лица в очагах полиомиелита, в том числе вызванного диким полиовирусом' },
    { id: 49, name: 'Против пневмококковой инфекции', type: 'EPIDEMIOLOGY', min_age: 24, max_age: 6240, description: 'Дети в возрасте от 2 до 5 лет, взрослые, относящиеся к группам риска' },
    { id: 50, name: 'Против ротавирусной инфекции', type: 'EPIDEMIOLOGY', min_age: 2, max_age: 8, description: 'Дети для активной вакцинации с целью профилактики заболеваний, вызываемых ротавирусами' },
    { id: 51, name: 'Против ветряной оспы', type: 'EPIDEMIOLOGY', min_age: 36, max_age: 6240, description: 'Дети и взрослые из групп риска, включая лиц, подлежащих призыву на военную службу' },
    { id: 52, name: 'Против гемофильной инфекции', type: 'EPIDEMIOLOGY', min_age: 48, max_age: 48, description: 'Дети, не привитые на первом году жизни против гемофильной инфекции' },
    { id: 53, name: 'Против коронавирусной инфекции, вызываемой вирусом SARS-CoV-2', type: 'EPIDEMIOLOGY', min_age: 144, max_age: 6240, description: 'Лица в возрасте 12 лет и старше' },
  ];
  readonly columns = ['id', 'name', 'type', 'min_age', 'max_age', 'actions'];

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
        data: vaccine || { id: 0, name: '', type: '', min_age: 0, max_age: 0, description: '' },
        size: 'l',
      }
    );

    dialogRef.subscribe(result => {
      if (result) {
        if (vaccine) {
          this.vaccines = this.vaccines.map(v => v.id === vaccine.id ? { ...result } : v);
        } else {
          const newId = this.vaccines.length ? Math.max(...this.vaccines.map(v => v.id)) + 1 : 1;
          this.vaccines = [...this.vaccines, { ...result, id: newId }];
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
