import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiButtonModule,
  TuiHintModule,
  TuiLoaderModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from "../../core/auth/auth.service";
import { TuiCheckboxLabeledModule, TuiInputModule, TuiInputPasswordModule, TuiIslandModule } from "@taiga-ui/kit";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TuiInputPasswordModule,
    ReactiveFormsModule,
    TuiCheckboxLabeledModule,
    TuiLoaderModule,
    NgIf,
    TuiButtonModule,
    TuiIslandModule,
    TuiInputModule,
    TuiHintModule,
    TuiSvgModule
  ],
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]),
      remember: new FormControl(false),
    });
  }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.authService.navigateTo('/vaccination-calendar');
    }
  }

  login(): void {
    if (this.form.valid) {
      this.loading = true;
      this.authService.login(
        this.form.value.email,
        this.form.value.password,
        this.route.snapshot.queryParams['returnUrl'] || '/vaccination-calendar'
      ).subscribe({
        next: sessionInfo => {
          this.loading = false;
          if (!sessionInfo) {
            console.error('Login failed: No session info returned');
          }
        },
        error: error => {
          this.loading = false;
          console.error('Login failed:', error);
        }
      });
    }
  }
}
