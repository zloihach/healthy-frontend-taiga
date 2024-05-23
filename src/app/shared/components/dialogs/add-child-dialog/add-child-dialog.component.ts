// src/app/shared/components/dialogs/add-child-dialog/add-child-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChildService } from '../../../../core/services/child/child.service';
import { TuiDialogModule, TuiButtonModule } from '@taiga-ui/core';
import {TuiDataListWrapperModule, TuiInputDateModule, TuiInputModule, TuiSelectModule} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";

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
    ReactiveFormsModule,
    CommonModule,
    TuiDataListWrapperModule,
    TuiInputDateModule
  ]
})
export class AddChildDialogComponent {
  addChildForm: FormGroup;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void>,
    private fb: FormBuilder,
    private childService: ChildService
  ) {
    this.addChildForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      midname: ['', Validators.required],
      dob: ['', Validators.required],
      sex: ['', Validators.required],
      is_active: [true, Validators.required]
    });
  }

  onAddChild(): void {
    if (this.addChildForm.valid) {
      this.childService.addChild(this.addChildForm.value).subscribe(() => {
        this.context.completeWith();
      });
    }
  }

  onClose(): void {
    this.context.completeWith();
  }
}
