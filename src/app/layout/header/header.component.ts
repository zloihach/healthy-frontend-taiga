import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import {
  TuiBreakpointService,
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiLinkModule, TuiSvgModule
} from '@taiga-ui/core';
import { MenuItem } from './menu-item.interface';
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {TuiAccordionModule} from "@taiga-ui/kit";
import {TuiIconModule} from "@taiga-ui/experimental";


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
    TuiAccordionModule,
    TuiLinkModule,
    TuiIconModule,
    TuiSvgModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[] = [
    {name: 'Кабинет', link: '/dashboard'},
    {name: 'Календарь прививок', link: '/vaccination-calendar'},
    {name: 'Дети', link: '/children'},
    {name: 'Статьи', link: '/publication'},
    {name: 'Информация', link: '/info'}
  ];

  authItems: MenuItem[] = [
    {name: 'Регистрация', link: '/signup'},
    {name: 'Войти', link: '/login'}
  ];

  open: boolean = false;

  constructor(public breakpoint$: TuiBreakpointService) {
  }

  ngOnInit() {
  }

  toggle(open: boolean): void {
    this.open = open;
  }
}
