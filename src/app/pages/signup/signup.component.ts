import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
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
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { SignUpRequest } from '../../core/auth/interfaces/signup.interface'; // Ensure this path is correct

interface GenderOption {
  id: number;
  name: string;
  value: 'MALE' | 'FEMALE';
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
    { id: 1, name: 'Мужской', value: 'MALE' },
    { id: 2, name: 'Женский', value: 'FEMALE' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      midname: new FormControl(''),
      dob: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required)  // Используем пустую строку для инициализации
    }, { validators: this.checkPasswords });
  }

  genderStringify = (item: GenderOption): string => {
    return item.name;
  };

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
      const formValue = this.form.value;

      // Преобразуем форму в нужный формат
      const signUpRequest: SignUpRequest = {
        email: formValue.email,
        password: formValue.password,
        firstname: formValue.firstname,
        lastname: formValue.lastname,
        midname: formValue.midname,
        dob: this.formatDate(formValue.dob),
        sex: formValue.sex.value  // Передаем только значение пола
      };

      console.log('Submitting sign-up request:', signUpRequest);  // Логируем данные перед отправкой

      this.authService.signUp(signUpRequest).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    }
  }

  private formatDate(date: { year: number, month: number, day: number }): string {
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}T00:00:00.000Z`;
  }
}
