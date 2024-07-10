import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, AsyncPipe, NgIf } from '@angular/common';
import { TuiButtonModule, TuiDialogService, TuiDialogModule } from '@taiga-ui/core';
import { TuiAccordionModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { EditPublicationDialogComponent } from "../../../shared/components/dialogs/edit-publication-dialog/edit-publication-dialog.component";
import {
  CreatePublicationBodyDto,
  EditPublicationBodyDto,
  PublicationService
} from "../../../pages/publication/publication.service";
import { Publication } from "../../../pages/publication/publication";

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
    NgIf,
  ],
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicationListComponent {
  readonly form = new FormGroup({
    search: new FormControl(''),
  });

  publications: Publication[] = [];
  readonly columns = ['id', 'short_title', 'edit_date', 'update_date', 'image_url', 'actions'];

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private publicationService: PublicationService,
  ) {
    this.loadPublications();
  }

  get filteredPublications(): Publication[] {
    const searchValue = this.form.value.search?.toLowerCase() || '';
    return this.publications.filter(publication =>
      publication.id.toString().includes(searchValue) ||
      publication.short_title.toLowerCase().includes(searchValue) ||
      publication.full_title.toLowerCase().includes(searchValue) ||
      publication.text.toLowerCase().includes(searchValue) ||
      publication.edit_date.includes(searchValue) ||
      publication.update_date.includes(searchValue)
    );
  }

  loadPublications(): void {
    this.publicationService.getAllPublications().subscribe(publications => {
      this.publications = publications;
    });
  }

  openDialog(publication?: Publication): void {
    const dialogRef = this.dialogs.open<Publication>(
      new PolymorpheusComponent(EditPublicationDialogComponent),
      {
        data: publication || { id: 0, short_title: '', full_title: '', text: '', image_url: '', is_active: true },
        size: 'l',
      }
    );

    dialogRef.subscribe(result => {
      if (result) {
        if (publication) {
          const updateData: EditPublicationBodyDto = { ...result, id: publication.id.toString() };
          this.updatePublication(publication.id, updateData, this.isFile(result.image_url) ? result.image_url : undefined);
        } else {
          this.createPublication(result, this.isFile(result.image_url) ? result.image_url : undefined);
        }
      }
    });
  }

  isFile(value: any): value is File {
    return value && typeof value === 'object' && value instanceof File;
  }

  createPublication(data: CreatePublicationBodyDto, file?: File): void {
    const formData = new FormData();
    (Object.keys(data) as (keyof CreatePublicationBodyDto)[]).forEach(key => {
      const value = data[key];
      if (value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });
    if (file) {
      formData.append('image_url', file);
    }
    this.publicationService.createPublication(formData as any).subscribe(newPublication => {
      this.publications = [...this.publications, newPublication];
    });
  }

  updatePublication(id: number, data: EditPublicationBodyDto, file?: File): void {
    const formData = new FormData();
    formData.append('id', id.toString()); // Ensure ID is included as a number
    (Object.keys(data) as (keyof EditPublicationBodyDto)[]).forEach(key => {
      const value = data[key];
      if (value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });
    if (file) {
      formData.append('image_url', file);
    }
    this.publicationService.editPublication(formData as any).subscribe(updatedPublication => {
      this.publications = this.publications.map(pub => pub.id === id ? updatedPublication : pub);
    });
  }

  openPublicationDialog(publication: Publication): void {
    const dialogRef = this.dialogs.open(
      `<h3>${publication.short_title}</h3>
      <h4>${publication.full_title}</h4>
      <p>${publication.text}</p>
      <img src="${publication.image_url}" alt="${publication.short_title}" width="200">`,
      {
        label: publication.full_title,
        size: 'm',
        data: { button: 'Закрыть' }
      }
    );

    dialogRef.subscribe({
      next: result => console.log('Dialog closed with:', result),
      error: error => console.error('Dialog failed with error:', error)
    });
  }

  view(publication: Publication): void {
    this.openPublicationDialog(publication);
  }

  edit(publication: Publication): void {
    this.openDialog(publication);
  }

  remove(publication: Publication): void {
    this.publicationService.deletePublication(publication.id.toString()).subscribe(() => {
      this.publications = this.publications.filter(pub => pub !== publication);
    });
  }
}
