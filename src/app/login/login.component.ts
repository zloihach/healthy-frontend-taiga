import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiCheckboxLabeledModule, TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {RouterLink, RouterOutlet} from "@angular/router";
import {TuiButtonModule, TuiLinkModule} from "@taiga-ui/core";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiCheckboxLabeledModule,
    RouterLink,
    TuiLinkModule,
    TuiButtonModule,
    RouterOutlet
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    agreeToToC: new FormControl(false, Validators.requiredTrue),
  });
}
