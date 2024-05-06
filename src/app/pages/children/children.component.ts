import { Component } from '@angular/core';
import {ChildCardComponent} from "../../shared/components/child-card/child-card.component";

@Component({
  selector: 'app-children',
  standalone: true,
  imports: [
    ChildCardComponent
  ],
  templateUrl: './children.component.html',
  styleUrl: './children.component.less'
})
export class ChildrenComponent {

}
