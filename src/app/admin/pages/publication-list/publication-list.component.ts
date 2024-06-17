import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, AsyncPipe } from '@angular/common';
import { TuiButtonModule, TuiDialogService, TuiDialogModule } from '@taiga-ui/core';
import { TuiAccordionModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {
  EditPublicationDialogComponent
} from "../../../shared/components/dialogs/edit-publication-dialog/edit-publication-dialog.component";

interface Publication {
  readonly id: number;
  readonly short_title: string;
  readonly full_title: string;
  readonly text: string;
  readonly edit_date: string;
  readonly update_date: string;
  readonly content: string;
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
    TuiButtonModule,
    TuiDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicationListComponent {
  readonly form = new FormGroup({
    search: new FormControl(''),
  });

  publications: Publication[] = [
    { id: 1, short_title: 'Publication 1', full_title: 'Full Publication 1', text: 'Text 1', edit_date: '2020-01-01', update_date: '2021-01-01', content: 'Content 1' },
    { id: 2, short_title: 'Publication 2', full_title: 'Full Publication 2', text: 'Text 2', edit_date: '2021-02-15', update_date: '2021-02-15', content: 'Content 2' },
    { id: 3, short_title: 'Publication 3', full_title: 'Full Publication 3', text: 'Text 3', edit_date: '2019-07-30', update_date: '2019-07-30', content: 'Content 3' },
    { id: 4, short_title: 'Publication 4', full_title: 'Full Publication 4', text: 'Text 4', edit_date: '2022-11-22', update_date: '2022-11-22', content: 'Content 4' },
    { id: 5, short_title: 'Publication 5', full_title: 'Full Publication 5', text: 'Text 5', edit_date: '2023-05-18', update_date: '2023-05-18', content: 'Content 5' },
  ];

  readonly columns = ['id', 'short_title', 'edit_date', 'update_date', 'actions'];

  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService) {}

  get filteredPublications(): Publication[] {
    const searchValue = this.form.value.search?.toLowerCase() || '';
    return this.publications.filter(publication =>
      publication.id.toString().includes(searchValue) ||
      publication.short_title.toLowerCase().includes(searchValue) ||
      publication.full_title.toLowerCase().includes(searchValue) ||
      publication.text.toLowerCase().includes(searchValue) ||
      publication.edit_date.includes(searchValue) ||
      publication.update_date.includes(searchValue) ||
      publication.content.toLowerCase().includes(searchValue)
    );
  }

  openDialog(publication?: Publication): void {
    const dialogRef = this.dialogs.open<Publication>(
      new PolymorpheusComponent(EditPublicationDialogComponent),
      {
        data: publication || { id: 0, short_title: '', full_title: '', text: '', edit_date: '', update_date: '', content: '' },
        size: 'l',
      }
    );

    dialogRef.subscribe(result => {
      if (result) {
        if (publication) {
          this.publications = this.publications.map(pub => pub.id === publication.id ? { ...result, id: publication.id } : pub);
        } else {
          const newId = this.publications.length ? Math.max(...this.publications.map(pub => pub.id)) + 1 : 1;
          this.publications = [...this.publications, { ...result, id: newId }];
        }
      }
    });
  }

  view(publication: Publication): void {
    this.openDialog(publication);
  }

  edit(publication: Publication): void {
    this.openDialog(publication);
  }

  remove(publication: Publication): void {
    this.publications = this.publications.filter(pub => pub !== publication);
  }
}
