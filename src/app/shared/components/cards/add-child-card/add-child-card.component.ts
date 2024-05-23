import { Component } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddChildDialogComponent } from '../../dialogs/add-child-dialog/add-child-dialog.component';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-add-child-card',
  templateUrl: './add-child-card.component.html',
  styleUrls: ['./add-child-card.component.less'],
  standalone: true,
  imports: [
    TuiButtonModule
  ]
})
export class AddChildCardComponent {
  constructor(private dialogService: TuiDialogService) {}

  openAddChildDialog(): void {
    this.dialogService.open(new PolymorpheusComponent(AddChildDialogComponent)).subscribe();
  }
}
