import { Component, OnInit } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiButtonModule,
  TuiHintModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {ActivatedRoute, Router, RouterLink, RouterModule} from '@angular/router';
import {AuthService} from "../../core/auth/auth.service";
import {TuiCheckboxLabeledModule, TuiInputModule, TuiInputPasswordModule, TuiIslandModule} from "@taiga-ui/kit";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    TuiSvgModule,
    RouterLink,
    TuiInputPasswordModule,
    ReactiveFormsModule,
    TuiCheckboxLabeledModule,
    TuiLoaderModule,
    NgIf,
    TuiButtonModule,
    TuiIslandModule,
    TuiInputModule,
    TuiHintModule
  ],
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]),
      remember: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        localStorage.setItem('returnUrl', params['returnUrl']);
      }
    });
  }

  login(): void {
    if (this.form.valid) {
      this.loading = true;
      this.authService.login(
        this.form.value.email,
        this.form.value.password
      ).subscribe({
        next: () => {
          this.loading = false;
          const returnUrl = localStorage.getItem('returnUrl');
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          } else {
            this.router.navigateByUrl('/vaccination-calendar');
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
