import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiButtonModule,
  TuiHintModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule, TuiCheckboxLabeledModule, TuiIslandModule } from '@taiga-ui/kit';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, TuiInputModule,
    TuiInputPasswordModule, TuiButtonModule, TuiCheckboxLabeledModule,
    TuiIslandModule, RouterModule, TuiSvgModule, TuiLoaderModule, TuiTextfieldControllerModule, TuiHintModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]),
    remember: new FormControl(false),
  });
  protected loading: boolean = false;
  readonly control = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  login(): void {
    if (this.form.valid) {
      this.loading = true;
      this.authService.login(
        this.form.value.email,
        this.form.value.password
      ).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          this.loading = false;
          console.error('Login failed:', error);
        }
      });
    }
  }
}
