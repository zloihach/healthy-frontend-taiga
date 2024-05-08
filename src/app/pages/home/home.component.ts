import {Component, Inject, OnInit} from '@angular/core';
import {TuiAlertService, TuiGroupModule, TuiSvgModule} from "@taiga-ui/core";
import {TuiActionModule, TuiBadgeModule, TuiRadioBlockModule, TuiTabsModule} from "@taiga-ui/kit";
import {VaccineCardComponent} from "../../shared/components/vaccine-card/vaccine-card.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TuiActionModule,
    TuiBadgeModule,
    VaccineCardComponent,
    ReactiveFormsModule,
    TuiGroupModule,
    TuiRadioBlockModule,
    NgForOf,
    TuiTabsModule,
    TuiSvgModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private readonly authService: AuthService,
  ) {
  }

  activeItemIndex = 0;
  user: any;


  readonly vaccineTypeRadio = new FormGroup({
    testValue: new FormControl('orange'),
  });


  readonly vaccineType = ['Эпидемиология', 'Нац. Календарь'];

  onClick(result: string): void {
    this.alerts.open(result).subscribe();
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(x => this.user = x);
  }
}
