import { Component } from '@angular/core';
import {TuiDocNavigationModule} from "@taiga-ui/addon-doc";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    TuiDocNavigationModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.less'
})
export class SidebarComponent {

}
