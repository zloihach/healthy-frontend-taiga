import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiButtonModule, TuiDialogContext, TuiHintModule} from '@taiga-ui/core';
import { Vaccine } from '../../../interfaces/vaccine.interface';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {TuiCheckboxLabeledModule, TuiInputModule, TuiTextareaModule} from "@taiga-ui/kit";

@Component({
  selector: 'app-vaccine-dialog',
  templateUrl: './vaccine-dialog.component.html',
  standalone: true,
  imports: [
    TuiInputModule,
    ReactiveFormsModule,
    TuiHintModule,
    TuiCheckboxLabeledModule,
    TuiButtonModule,
    TuiTextareaModule
  ],
  styleUrls: ['./vaccine-dialog.component.less']
})
export class VaccineDialogComponent {
  form: FormGroup;
  mode: 'edit' | 'mark';

  constructor(
    private fb: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<Vaccine, { vaccine: Vaccine, mode: 'edit' | 'mark' }>
  ) {
    this.mode = this.context.data.mode;

    this.form = this.fb.group({
      medical_center: [this.context.data.vaccine.medical_center, Validators.required],
      dose: [this.context.data.vaccine.dose, [Validators.required, Validators.min(1)]],
      vaccination_date: [this.context.data.vaccine.vaccination_date, Validators.required],
      is_vaccinated: [this.context.data.vaccine.is_vaccinated],
      commentary: [this.context.data.vaccine.commentary]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.context.completeWith(this.form.value);
    }
  }

  onCancel(): void {
    this.context.completeWith(null!);
  }
}
