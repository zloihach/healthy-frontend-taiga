import { Component, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Publication } from './publication';
import { PublicationService } from './publication.service';
import { TuiIslandModule, TuiPaginationModule } from '@taiga-ui/kit';
import { Subscription } from 'rxjs';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.less'],
  imports: [TuiIslandModule, TuiPaginationModule, NgForOf, NgIf],
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
  ) {}

  ngOnInit(): void {
    this.currentPage = 1;
    console.log('ngOnInit', this.currentPage, this.itemsPerPage);
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
    console.log('loadPublications', page, limit);
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
    this.currentPage = newPage+1;
    this.loadPublications(this.currentPage, this.itemsPerPage);
  }

  openPublicationDialog(publication: Publication): void {
    const dialogRef = this.dialogService.open(publication.text, {
      label: publication.full_title,
      size: 'm',
      data: { button: 'Close' }
    })};

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

