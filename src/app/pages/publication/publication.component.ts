import { Component, OnInit } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Publication } from './publication';
import { PublicationService } from './publication.service';
import {TuiIslandModule} from "@taiga-ui/kit";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.less'],
  imports: [
    TuiIslandModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class PublicationComponent implements OnInit {
  publications: Publication[] = [];
  imageSkeletonVisible = true;
  titleSkeletonVisible = true;
  constructor(private publicationService: PublicationService, private dialogs: TuiDialogService) {}

  ngOnInit(): void {
    this.getAllPublications();
  }

  getAllPublications(): void {
    this.publicationService.getAllPublications().subscribe(
      publications => {
        this.publications = publications;
        this.imageSkeletonVisible = false;
        this.titleSkeletonVisible = false;
      },
      error => {
        console.error('Failed to retrieve publications:', error);
        this.imageSkeletonVisible = false;
        this.titleSkeletonVisible = false;
      }
    );
  }

  openPublicationDialog(publication: Publication): void {
    const content: PolymorpheusContent<TuiDialogContext> = {
      template: '',
      context: {
        $implicit: 'Close',
        completeWith: (data: any) => console.log(data),
      },
    };

    this.dialogs.open(publication.text, {
      label: publication.full_title,
      size: 'm',
      data: { button: 'Закрыть' }
    }).subscribe();
  }
}
