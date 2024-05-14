import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupFormService {
  constructor() {}

  generateForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      midname: new FormControl(''),
      dob: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required)
    }, { validators: this.checkPasswords });
  }

  private checkPasswords: ValidatorFn = (group: AbstractControl): { [key: string]: boolean } | null => {
    const password = group.get('password');
    const confirmPassword = group.get('passwordConfirm');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ notSame: true });
      return { notSame: true };
    } else {
      return null;
    }
  };
}
