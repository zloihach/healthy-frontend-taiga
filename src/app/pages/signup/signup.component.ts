import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { SignUpRequest } from '../../core/auth/interfaces/signup.interface';
import { SignupFormService } from "./services/signup-form.service";
import { debounceTime, distinctUntilChanged, BehaviorSubject } from "rxjs";
import { ExampleNativeDateTransformerDirective } from "../../shared/directives/nativeDateTransformer.directive";
import { VaccineService } from "../../core/services/vaccine/vaccine.service"; // Ensure this path is correct

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
    TuiStringifyContentPipeModule,
    ExampleNativeDateTransformerDirective
  ]
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  step = 1;
  isEmailValid = false;
  isSecondStepValid = new BehaviorSubject<boolean>(false);

  genderOptions: GenderOption[] = [
    { id: 1, name: 'Мужской', value: 'MALE' },
    { id: 2, name: 'Женский', value: 'FEMALE' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private signupFormService: SignupFormService,
    private vaccineService: VaccineService
  ) {}

  ngOnInit(): void {
    this.form = this.signupFormService.generateForm();

    this.form.get('email')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(email => {
        if (this.form.get('email')?.valid) {
          this.checkEmail(email);
        }
      });

    this.form.valueChanges.subscribe(() => {
      this.updateSecondStepValidity();
    });

    if (this.authService.currentUserValue) {
      this.authService.navigateTo('/vaccination-calendar');
    }
  }

  genderStringify = (item: GenderOption): string => {
    return item.name;
  };

  nextStep(): void {
    if (this.step === 1 && this.form.get('email')?.valid && this.form.get('password')?.valid && this.form.get('passwordConfirm')?.valid && this.isEmailValid) {
      this.step++;
    } else if (this.step === 2 && this.isSecondStepValid.getValue()) {
      this.submit(); // Сначала регистрируем пользователя на втором шаге
    } else {
      alert('Пожалуйста, заполните все поля корректно.');
    }
  }

  previousStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  submit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const signUpRequest: SignUpRequest = {
        email: formValue.email,
        password: formValue.password,
        firstname: formValue.firstname,
        lastname: formValue.lastname,
        midname: formValue.midname,
        dob: formValue.dob,
        sex: formValue.sex.value
      };

      this.authService.signUp(signUpRequest).subscribe({
        next: () => {
          console.log('Registration successful');
          this.step = 3; // Переход к третьему шагу после успешной регистрации
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    }
  }

  fillVaccinationCalendar(yes: boolean): void {
    if (yes) {
      this.vaccineService.createVaccinationCalendar().subscribe({
        next: () => {
          console.log('Vaccination calendar created successfully');
          this.router.navigate(['/vaccination-calendar']);
        },
        error: (err) => {
          console.error('Failed to create vaccination calendar', err);
          this.router.navigate(['/vaccination-calendar']);
        }
      });
    } else {
      this.router.navigate(['/vaccination-calendar']);
    }
  }

  private checkEmail(email: string): void {
    this.authService.checkEmail(email).subscribe({
      next: (exists: boolean) => {
        this.isEmailValid = !exists;
        if (!this.isEmailValid) {
          this.form.get('email')?.setErrors({ emailTaken: true });
        }
      },
      error: (err) => {
        console.error('Email check failed', err);
        this.isEmailValid = false;
      }
    });
  }

  private updateSecondStepValidity(): void {
    const isValid = this.form.get('firstname')?.valid &&
      this.form.get('lastname')?.valid &&
      this.form.get('dob')?.valid &&
      this.form.get('sex')?.valid;
    this.isSecondStepValid.next(isValid!);
  }
}
