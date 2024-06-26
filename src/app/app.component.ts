import { HttpClientModule } from '@angular/common/http';
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { HeaderComponent } from "./layout/header/header.component";
import { VaccineCardComponent } from "./shared/components/cards/vaccine-card/vaccine-card.component";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {ChildrenComponent} from "./pages/children/children.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TuiRootModule,
    HttpClientModule,
    TuiDialogModule,
    TuiAlertModule,
    LoginComponent,
    HeaderComponent,
    VaccineCardComponent,
    TuiTableModule,
    ChildrenComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
  ]
})
export class AppComponent {
  title = 'Healthy';
}
