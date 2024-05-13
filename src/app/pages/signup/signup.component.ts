import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiStepperModule,
  TuiSelectModule,
  TuiInputDateModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiFilterByInputPipeModule,
  TuiStringifyContentPipeModule
} from "@taiga-ui/kit";
import { TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";

interface GenderOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiIslandModule,
    TuiStepperModule,
    TuiSelectModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiSvgModule,
    RouterLink,
    TuiInputDateModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiTextfieldControllerModule,
    TuiFilterByInputPipeModule,
    TuiStringifyContentPipeModule
  ]
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  step = 1;

  genderOptions: GenderOption[] = [
    { id: 1, name: 'Мужской' },
    { id: 2, name: 'Женский' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required]),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      midname: new FormControl(''),
      dob: new FormControl(''),
      sex: new FormControl('', Validators.required)
    }, { validators: this.checkPasswords });
  }

  genderStringify(item: GenderOption): string {
    return item.name;
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): { [key: string]: boolean } | null => {
    const password = group.get('password');
    const confirmPassword = group.get('passwordConfirm');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { notSame: true };
    }
    return null;
  };

  nextStep(): void {
    this.step++;
  }

  previousStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  submit(): void {
    if (this.form.valid) {
      const { passwordConfirm, ...signUpData } = this.form.value;
      this.authService.signUp(signUpData).subscribe({
        next: response => console.log('User registered', response),
        error: error => console.error('Registration error', error)
      });
    }
  }
}
