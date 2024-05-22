import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { Vaccine } from '../../interfaces/vaccine.interface';

@Component({
  selector: 'app-vaccine-dialog',
  templateUrl: './vaccine-dialog.component.html',
  standalone: true,
  styleUrls: ['./vaccine-dialog.component.less']
})
export class VaccineDialogComponent {
  form: FormGroup;
  vaccine: Vaccine;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private vaccinationService: VaccinationService,
    @Inject(TuiDialogContext) private readonly context: TuiDialogContext<{ vaccine: Vaccine, isEditMode: boolean }>
  ) {
    this.vaccine = context.data.vaccine;
    this.isEditMode = context.data.isEditMode;
    this.form = this.fb.group({
      vaccination_date: [this.vaccine.vaccination_date, Validators.required],
      medical_center: [this.vaccine.medical_center, Validators.required],
      dose: [this.vaccine.dose, Validators.required],
      serial_number: [this.vaccine.serial_number, Validators.required],
      commentary: [this.vaccine.commentary]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.isEditMode) {
        this.vaccinationService.updateVaccination({
          vaccination_id: this.vaccine.id,
          is_vaccinated: true,
          ...formData
        }).subscribe({
          next: () => this.context.completeWith(true),
          error: error => console.error('Failed to update vaccination', error)
        });
      } else {
        this.vaccinationService.markVaccination(this.vaccine.user_id, this.vaccine.id, {
          is_vaccinated: true,
          ...formData
        }).subscribe({
          next: () => this.context.completeWith(true),
          error: error => console.error('Failed to mark vaccination', error)
        });
      }
    }
  }

  onCancel(): void {
    this.context.completeWith(false);
  }
}
