import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {ChildrenComponent} from "./children/children.component";
import {ArticlesComponent} from "./articles/articles.component";
import {InfoComponent} from "./info/info.component";

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'dashboard', pathMatch: 'full', component: DashboardComponent
  },
  {
    path: 'vaccination-calendar', pathMatch: 'full', component: CalendarComponent
  },
  {
    path: 'children', pathMatch: 'full', component: ChildrenComponent
  },
  {
    path: 'articles', pathMatch: 'full', component: ArticlesComponent
  },
  {
    path: 'info', pathMatch: 'full', component: InfoComponent
  },
  {
    path: '**',pathMatch: 'full', component: PageNotFoundComponent
  }
];
