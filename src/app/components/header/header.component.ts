import { Component } from '@angular/core';
import {TuiButtonModule} from "@taiga-ui/core";
import {RouterLink} from "@angular/router";
import {routes} from "../../app.routes";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TuiButtonModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {

}
