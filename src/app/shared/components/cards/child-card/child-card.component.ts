import { Component, Input, Inject } from '@angular/core';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDialogService } from '@taiga-ui/core';
import { TuiCardModule, TuiHeaderModule, TuiSurfaceModule, TuiTitleModule } from '@taiga-ui/experimental';
import { TuiPlatformModule } from '@taiga-ui/cdk';
import { Router } from '@angular/router';
import { ChildService } from '../../../../core/services/child/child.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {InfoChildDialogComponent} from "../../dialogs/info-child-dialog/info-child-dialog.component";

@Component({
  selector: 'app-child-card',
  standalone: true,
  imports: [
    TuiBadgeModule,
    TuiButtonModule,
    TuiCardModule,
    TuiHeaderModule,
    TuiPlatformModule,
    TuiSurfaceModule,
    TuiTitleModule
  ],
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.less']
})
export class ChildCardComponent {
  @Input() child!: { id: number, name: string, birthDate: string, firstname: string, lastname: string, midname: string, sex: string, dob: string };

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private router: Router,
    private childService: ChildService
  ) {}

  openEditDialog(): void {
    this.dialogService.open(
      new PolymorpheusComponent(InfoChildDialogComponent),
      {
        data: { child: this.child },
        label: 'Информация о ребенке'
      }
    ).subscribe({
      next: result => console.log('Dialog closed with:', result),
      error: error => console.error('Dialog failed with error:', error)
    });
  }


  navigateToCalendar(): void {
    this.router.navigate(['/vaccination-calendar', this.child.id]);
  }
}
