import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule, TuiDialogContext, TuiHintModule } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiCheckboxLabeledModule, TuiInputDateModule, TuiInputModule, TuiTextareaModule } from "@taiga-ui/kit";
import { VaccineService } from "../../../../core/services/vaccine/vaccine.service";
import { VaccineMark } from "../../../interfaces/vaccine-mark.interface";
import { Vaccine } from "../../../interfaces/vaccine.interface";

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
    TuiTextareaModule,
    TuiInputDateModule
  ],
  styleUrls: ['./vaccine-dialog.component.less']
})
export class VaccineDialogComponent {
  form: FormGroup;
  mode: 'edit' | 'mark';

  constructor(
    private fb: FormBuilder,
    private vaccineService: VaccineService,
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<VaccineMark, { vaccine: Vaccine, mode: 'edit' | 'mark' }>
  ) {
    this.mode = this.context.data.mode;

    this.form = this.fb.group({
      medical_center: [this.context.data.vaccine.medical_center, Validators.required],
      dose: [this.context.data.vaccine.dose, [Validators.required, Validators.min(1)]],
      vaccination_date: [new Date(this.context.data.vaccine.vaccination_date), Validators.required],
      is_vaccinated: [this.context.data.vaccine.is_vaccinated],
      commentary: [this.context.data.vaccine.commentary],
      serial_number: [this.context.data.vaccine.serial_number],
      vaccination_id: [this.context.data.vaccine.id]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const updatedVaccine: VaccineMark = {
        vaccination_id: this.form.value.vaccination_id,
        is_vaccinated: this.form.value.is_vaccinated,
        medical_center: this.form.value.medical_center,
        dose: Number(this.form.value.dose),
        serial_number: this.form.value.serial_number,
        vaccination_date: this.form.value.vaccination_date.toISOString().split('T')[0],
        commentary: this.form.value.commentary
      };

      this.vaccineService.updateVaccine(updatedVaccine).subscribe(() => {
        this.context.completeWith(updatedVaccine);
      });
    }
  }

  onCancel(): void {
    this.context.completeWith(null!);
  }
}
