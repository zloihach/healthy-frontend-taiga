import {Component, OnInit} from '@angular/core';
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core';
import {Publication} from './publication';
import {PublicationService} from './publication.service';
import {TuiIslandModule, TuiPaginationModule} from '@taiga-ui/kit';
import {Subscription} from 'rxjs';
import {NgForOf, NgIf} from "@angular/common";
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {TruncatePipe} from "../../shared/pipes/truncate.pipe";


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.less'],
  imports: [TuiIslandModule, TuiPaginationModule, NgForOf, NgIf, TruncatePipe],
  standalone: true
})
export class PublicationComponent implements OnInit {
  publications: Publication[] = [];
  isLoading = true;
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 8;
  private subscription: Subscription | null = null;

  constructor(
    private publicationService: PublicationService,
    private dialogService: TuiDialogService
  ) {
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.loadPublications(this.currentPage, this.itemsPerPage);
    this.loadTotalItems();
  }

  private loadTotalItems(): void {
    this.subscription = this.publicationService.getPublicationCount().subscribe({
      next: (count) => {
        this.totalItems = count;
      },
      error: (error) => {
        console.error('Failed to retrieve publication count:', error);
      }
    });
  }

  private loadPublications(page: number, limit: number): void {
    this.subscription = this.publicationService.getAllPublications(page, limit).subscribe({
      next: (publications) => {
        this.publications = publications;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to retrieve publications:', error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage + 1;
    this.loadPublications(this.currentPage, this.itemsPerPage);
  }

  openPublicationDialog(publication: Publication): void {
    const dialogRef = this.dialogService.open(publication.text, {
      label: publication.full_title,
      size: 'm',
      data: {button: 'Закрыть'}
    });
    dialogRef.subscribe({
      next: result => console.log('Dialog closed with:', result),
      error: error => console.error('Dialog failed with error:', error)
    });
  }

  ngOnDestroy()
    :
    void {
    this.subscription?.unsubscribe();
  }
}

