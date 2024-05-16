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
import { debounceTime, distinctUntilChanged } from "rxjs";
import { ExampleNativeDateTransformerDirective } from "../../shared/directives/nativeDateTransformer.directive"; // Ensure this path is correct

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

  genderOptions: GenderOption[] = [
    { id: 1, name: 'Мужской', value: 'MALE' },
    { id: 2, name: 'Женский', value: 'FEMALE' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private signupFormService: SignupFormService
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

    // Проверка на наличие сессии
    if (this.authService.currentUserValue) {
      this.router.navigate(['/vaccination-calendar']);
    }
  }

  genderStringify = (item: GenderOption): string => {
    return item.name;
  };

  nextStep(): void {
    if (this.form.get('email')?.valid && this.form.get('password')?.valid && this.form.get('passwordConfirm')?.valid && this.isEmailValid) {
      this.step++;
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
      console.log(formValue.dob);
      const signUpRequest: SignUpRequest = {
        email: formValue.email,
        password: formValue.password,
        firstname: formValue.firstname,
        lastname: formValue.lastname,
        midname: formValue.midname,
        dob: formValue.dob,
        sex: formValue.sex.value
      };

      console.log('Submitting sign-up request:', signUpRequest);

      this.authService.signUp(signUpRequest).subscribe({
        next: () => {
          this.router.navigate(['/vaccination-calendar']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
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
}
