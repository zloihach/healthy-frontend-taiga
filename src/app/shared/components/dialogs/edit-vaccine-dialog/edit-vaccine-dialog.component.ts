import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {TuiDialogContext, TuiDialogModule, TuiButtonModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

interface Vaccine {
  readonly name: string;
  readonly type: string;
  readonly min_age: number;
  readonly max_age: number;
  readonly description: string;
}

@Component({
  selector: 'app-edit-vaccine-dialog',
  templateUrl: './edit-vaccine-dialog.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiDialogModule,
    TuiButtonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
  ],
})
export class EditVaccineDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) protected readonly context: TuiDialogContext<Vaccine>,
    private readonly fb: FormBuilder,
  ) {
    const data = context.data || { name: '', type: '', min_age: '', max_age: '', description: '' };
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      type: [data.type, Validators.required],
      min_age: [data.min_age, Validators.required],
      max_age: [data.max_age, Validators.required],
      description: [data.description, Validators.required],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.context.completeWith(this.form.value);
    }
  }

  onCancel(): void {
    // this.context.completeWith(null);
  }
}
