import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
import {AuthService} from "../../core/auth/auth.service";
import {Subscription} from "rxjs";


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
export class HeaderComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  authItems: MenuItem[] = [
    { name: 'Войти', link: '/login' },
    { name: 'Регистрация', link: '/signup' }
  ];
  user: any;
  protected open: boolean = false;
  private subscription!: Subscription;

  constructor(
    public breakpoint$: TuiBreakpointService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser.subscribe(user => {
      this.user = user;
      if (user) {
        this.menuItems = [
          { name: 'Календарь прививок', link: '/vaccination-calendar' },
          { name: 'Кабинет', link: '/dashboard' },
          { name: 'Дети', link: '/children' },
          { name: 'Статьи', link: '/publication' },
          { name: 'Информация', link: '/info' }
        ];
        if (user.role && user.role === 'ADMIN') {
          this.menuItems = [
            { name: 'Главная', link: '/admin' },
            { name: 'Личный кабинет', link: '/dashboard'},
            { name: 'Пользователи', link: '/user-list'},
            { name: 'Прививки', link: '/vaccine-list' },
            { name: 'Публикации', link: '/publication-list' },
          ];
        }
      } else {
        this.menuItems = [
          { name: 'Статьи', link: '/publication' },
          { name: 'Информация', link: '/info' }
        ];
      }
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {});
  }
  toggle(open: boolean): void {
    this.open = open;
  }
}
