import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {
  TuiBreakpointService,
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownComponent,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import {MenuItem} from "./menu-item.interface";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {TuiAccordionModule} from "@taiga-ui/kit";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiButtonModule,
    NgForOf,
    AsyncPipe,
    NgIf,
    TuiActiveZoneModule,
    TuiSidebarModule,
    TuiAccordionModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @ViewChild(TuiHostedDropdownComponent) component?: TuiHostedDropdownComponent;

  open = false;

  constructor(private router: Router, @Inject(TuiBreakpointService)
  readonly breakpoint$: TuiBreakpointService) {
  }

  readonly webApis = ['Common', 'Audio', 'Canvas', 'Geolocation', 'MIDI', 'Workers'];

  readonly tinkoff = [
    'Taiga-UI',
    'ng-event-plugins',
    'ng-polymorpheus',
    'ng-dompurify',
  ];

  toggle(open: boolean): void {
    this.open = open;
  }
  ngOnInit() {
  }
}
