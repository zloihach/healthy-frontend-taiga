import { Component, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Publication } from './publication';
import { PublicationService } from './publication.service';
import { NgIf, NgForOf } from '@angular/common';
import { TuiIslandModule } from '@taiga-ui/kit';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.less'],
  imports: [TuiIslandModule, NgForOf, NgIf],
  standalone: true
})
export class PublicationComponent implements OnInit {
  publications: Publication[] = [];
  isLoading = true;
  private subscription: Subscription | null = null; // Properly manage subscription lifecycle

  constructor(
    private publicationService: PublicationService,
    private dialogService: TuiDialogService
  ) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  private loadPublications(): void {
    this.subscription = this.publicationService.getAllPublications().subscribe({
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

  openPublicationDialog(publication: Publication): void {
    const dialogRef = this.dialogService.open(publication.text, {
      label: publication.full_title,
      size: 'm',
      data: { button: 'Close' }
    });

    dialogRef.subscribe({
      next: result => console.log('Dialog closed with:', result),
      error: error => console.error('Dialog failed with error:', error)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
