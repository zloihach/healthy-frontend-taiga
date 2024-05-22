import { Component, Input, Inject } from '@angular/core';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiCardModule, TuiHeaderModule, TuiSurfaceModule, TuiTitleModule } from '@taiga-ui/experimental';
import { TuiPlatformModule } from '@taiga-ui/cdk';
import { Router } from '@angular/router';
import {TuiDialogService} from "@taiga-ui/core";


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
    private router: Router
  ) {}

  openEditDialog(): void {
    const dialogContent = `
      <div>
        <h2>${this.child.firstname} ${this.child.lastname}</h2>
        <p><strong>Дата рождения:</strong> ${new Date(this.child.dob).toLocaleDateString()}</p>
        <p><strong>Отчество:</strong> ${this.child.midname}</p>
        <p><strong>Пол:</strong> ${this.child.sex === 'MALE' ? 'Мужской' : 'Женский'}</p>
      </div>
    `;

    this.dialogService.open(dialogContent, {
      label: 'Информация о ребенке',
      size: 'm',
      data: { button: 'Закрыть' }
    }).subscribe({
      next: result => console.log('Dialog closed with:', result),
      error: error => console.error('Dialog failed with error:', error)
    });
  }

  navigateToCalendar(): void {
    this.router.navigate(['/vaccination-calendar', this.child.id]);
  }
}
