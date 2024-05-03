import { Component } from '@angular/core';
import {TuiBlockStatusModule} from "@taiga-ui/layout";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    TuiBlockStatusModule
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.less'
})
export class PageNotFoundComponent {

}
