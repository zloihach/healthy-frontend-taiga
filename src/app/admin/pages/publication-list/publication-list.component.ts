import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { NgForOf, AsyncPipe } from '@angular/common';
import { TuiAccordionModule, TuiInputModule } from '@taiga-ui/kit';
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiButtonModule} from "@taiga-ui/core";

interface Publication {
  readonly id: number;
  readonly title: string;
  readonly date: string;
}

@Component({
  selector: 'app-publication-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    TuiAccordionModule,
    TuiTableModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiButtonModule
  ],
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicationListComponent {
  readonly form = new FormGroup({
    search: new FormControl(''),
  });

  publications: Publication[] = [
    { id: 1, title: 'Publication 1', date: '2020-01-01' },
    { id: 2, title: 'Publication 2', date: '2021-02-15' },
    { id: 3, title: 'Publication 3', date: '2019-07-30' },
    { id: 4, title: 'Publication 4', date: '2022-11-22' },
    { id: 5, title: 'Publication 5', date: '2023-05-18' },
  ];

  readonly columns = ['id', 'title', 'date', 'actions'];

  get filteredPublications(): Publication[] {
    const searchValue = this.form.value.search?.toLowerCase() || '';
    return this.publications.filter(publication =>
      publication.id.toString().includes(searchValue) ||
      publication.title.toLowerCase().includes(searchValue) ||
      publication.date.includes(searchValue)
    );
  }

  view(item: Publication): void {
    console.log('Viewing publication:', item);
  }

  edit(item: Publication): void {
    console.log('Editing publication:', item);
  }

  remove(item: Publication): void {
    console.log('Removing publication:', item);
    this.publications = this.publications.filter(publication => publication !== item);
  }
}
