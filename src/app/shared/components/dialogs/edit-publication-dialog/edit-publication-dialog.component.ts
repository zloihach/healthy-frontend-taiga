import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDialogContext, TuiDialogModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-edit-publication-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiDialogModule,
  ],
  templateUrl: './edit-publication-dialog.component.html',
  styleUrls: ['./edit-publication-dialog.component.less'],
})
export class EditPublicationDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) protected readonly context: TuiDialogContext<void, any>,
  ) {
    this.form = new FormGroup({
      short_title: new FormControl(context.data.short_title),
      full_title: new FormControl(context.data.full_title),
      text: new FormControl(context.data.text),
      edit_date: new FormControl(context.data.edit_date),
      update_date: new FormControl(context.data.update_date),
      content: new FormControl(context.data.content),
    });
  }

  onSave(): void {
    this.context.completeWith({ ...this.context.data, ...this.form.value });
  }

  onCancel(): void {
    this.context.completeWith();
  }
}
