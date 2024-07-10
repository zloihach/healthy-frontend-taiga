import { ChangeDetectionStrategy, Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { TuiDialogContext, TuiDialogModule, TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiFieldErrorPipeModule, TuiInputFilesModule, TuiFileLike } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CommonModule } from '@angular/common';
import { Observable, of, Subject, timer } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-publication-dialog',
  templateUrl: './edit-publication-dialog.component.html',
  styleUrls: ['./edit-publication-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TuiDialogModule,
    TuiButtonModule,
    TuiInputModule,
    TuiErrorModule,
    ReactiveFormsModule,
    CommonModule,
    TuiTextfieldControllerModule,
    TuiFieldErrorPipeModule,
    TuiInputFilesModule,
  ],
})
export class EditPublicationDialogComponent {
  @Output() publicationSaved = new EventEmitter<void>();
  form: FormGroup;
  readonly control = new FormControl();
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap(file => (file ? this.makeRequest(file) : of(null))),
  );

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) protected readonly context: TuiDialogContext<void, any>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      short_title: [context.data.short_title || '', Validators.required],
      full_title: [context.data.full_title || '', Validators.required],
      text: [context.data.text || '', Validators.required],
      image: [null],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('short_title', this.form.value.short_title);
      formData.append('full_title', this.form.value.full_title);
      formData.append('text', this.form.value.text);

      if (this.control.value) {
        formData.append('image', this.control.value);
      }

      this.context.completeWith({
        ...this.context.data,
        ...this.form.value,
        image: this.control.value,
      });
      this.publicationSaved.emit();
    }
  }

  onCancel(): void {
    this.context.completeWith();
  }

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.control.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);

    return timer(1000).pipe(
      map(() => {
        if (Math.random() > 0.5) {
          return file;
        }

        this.rejectedFiles$.next(file);

        return null;
      }),
      finalize(() => this.loadingFiles$.next(null)),
    );
  }
}
