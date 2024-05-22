import { Component } from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ChildCardComponent} from "../child-card/child-card.component";
import {TuiButtonModule} from "@taiga-ui/core";
import {TuiCardModule, TuiHeaderModule, TuiSurfaceModule, TuiTitleModule} from "@taiga-ui/experimental";
import {TuiPlatformModule} from "@taiga-ui/cdk";

@Component({
  selector: 'app-add-child-card',
  standalone: true,
  imports: [
    AsyncPipe,
    ChildCardComponent,
    NgForOf,
    NgIf,
    TuiButtonModule,
    TuiCardModule,
    TuiHeaderModule,
    TuiPlatformModule,
    TuiSurfaceModule,
    TuiTitleModule
  ],
  templateUrl: './add-child-card.component.html',
  styleUrl: './add-child-card.component.less'
})
export class AddChildCardComponent {

}
