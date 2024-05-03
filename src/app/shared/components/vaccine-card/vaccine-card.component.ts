import { Component } from '@angular/core';
import {TuiButtonModule, TuiLinkModule} from "@taiga-ui/core";
import {TuiPlatformModule} from "@taiga-ui/cdk";
import {
  TuiAvatarModule,
  TuiCardModule,
  TuiHeaderModule,
  TuiSurfaceModule,
  TuiTitleModule
} from '@taiga-ui/experimental';
import {TuiBadgeModule} from "@taiga-ui/kit";


@Component({
  selector: 'app-vaccine-card',
  standalone: true,
  imports: [
    TuiLinkModule,
    TuiPlatformModule,
    TuiButtonModule,
    TuiCardModule,
    TuiSurfaceModule,
    TuiHeaderModule,
    TuiTitleModule,
    TuiAvatarModule,
    TuiAvatarModule,
    TuiBadgeModule
  ],
  templateUrl: './vaccine-card.component.html',
  styleUrl: './vaccine-card.component.less'
})
export class VaccineCardComponent {

}
