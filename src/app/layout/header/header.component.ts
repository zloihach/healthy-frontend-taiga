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
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @ViewChild(TuiHostedDropdownComponent) component?: TuiHostedDropdownComponent;

  readonly items: MenuItem[] = [
    {label: 'Login', path: '/login'},
    {label: 'Sign Up', path: '/signup'}
  ];

  open = false;

  constructor(private router: Router, @Inject(TuiBreakpointService)
  readonly breakpoint$: TuiBreakpointService) {
  }

  ngOnInit(): void {
  }

  onClick(item: MenuItem): void {
    this.router.navigate([item.path]);
    this.closeDropdown();
  }

  closeDropdown(): void {
    this.open = false;
    this.component?.nativeFocusableElement?.focus();
  }
}
