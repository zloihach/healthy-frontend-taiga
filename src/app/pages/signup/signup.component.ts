import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiButtonModule, TuiSvgModule} from "@taiga-ui/core";
import {
  TuiCheckboxLabeledModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiSelectModule
} from "@taiga-ui/kit";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiCheckboxLabeledModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiIslandModule,
    TuiSvgModule,
    RouterLink,
    TuiSelectModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.less'
})
export class SignupComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(32)]),
    remember: new FormControl(null, [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
    // Initialization logic if needed
  }
}
