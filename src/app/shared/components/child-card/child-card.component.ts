import { Component } from '@angular/core';
import {TuiBadgeModule} from "@taiga-ui/kit";
import {TuiButtonModule} from "@taiga-ui/core";
import {TuiCardModule, TuiHeaderModule, TuiSurfaceModule, TuiTitleModule} from "@taiga-ui/experimental";
import {TuiPlatformModule} from "@taiga-ui/cdk";

@Component({
  selector: 'app-child-card',
  standalone: true,
    imports: [
        TuiBadgeModule,
        TuiButtonModule,
        TuiCardModule,
        TuiHeaderModule,
        TuiPlatformModule,
        TuiSurfaceModule,
        TuiTitleModule
    ],
  templateUrl: './child-card.component.html',
  styleUrl: './child-card.component.less'
})
export class ChildCardComponent {

}
