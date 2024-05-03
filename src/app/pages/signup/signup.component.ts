import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
    imports: [
        RouterOutlet
    ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.less'
})
export class SignupComponent {

}
