import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChildService } from '../../../../core/services/child/child.service';
import { TuiDialogModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule, TuiSelectModule, TuiDataListWrapperModule, TuiInputDateModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../../interfaces/appStates.interface';
import * as VaccineActions from '../../../../shared/states/actions/main.actions';

interface GenderOption {
  value: 'MALE' | 'FEMALE';
  name: string;
}

@Component({
  selector: 'app-add-child-dialog',
  templateUrl: './add-child-dialog.component.html',
  styleUrls: ['./add-child-dialog.component.less'],
  standalone: true,
  imports: [
    TuiDialogModule,
    TuiButtonModule,
    TuiInputModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiInputDateModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AddChildDialogComponent {
  @Output() childAdded = new EventEmitter<void>();
  addChildForm: FormGroup;

  genderOptions: GenderOption[] = [
    { value: 'MALE', name: 'Мужской' },
    { value: 'FEMALE', name: 'Женский' }
  ];

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void>,
    private fb: FormBuilder,
    private childService: ChildService,
    private store: Store<AppStateInterface>
  ) {
    this.addChildForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      midname: ['', Validators.required],
      dob: [null, Validators.required],
      sex: [null, Validators.required],
      is_active: [true, Validators.required]
    });
  }

  onAddChild(): void {
    if (this.addChildForm.valid) {
      const formValue = this.addChildForm.value;
      const requestPayload = {
        ...formValue,
        sex: formValue.sex.value,
        dob: new Date(formValue.dob).toISOString()
      };

      this.childService.addChild(requestPayload).subscribe(() => {
        this.store.dispatch(VaccineActions.loadChildren());
        this.context.completeWith();
      });
    }
  }

  onClose(): void {
    this.context.completeWith();
  }

  genderStringify = (item: GenderOption): string => item.name;
}
