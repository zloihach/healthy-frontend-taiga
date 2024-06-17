import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {TuiAccordionModule} from "@taiga-ui/kit";

@Component({
  selector: 'app-publication-list',
  standalone: true,
    imports: [
        NgForOf,
        TuiAccordionModule
    ],
  templateUrl: './publication-list.component.html',
  styleUrl: './publication-list.component.less'
})
export class PublicationListComponent {

}
