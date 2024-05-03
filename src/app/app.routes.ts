import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AppComponent} from "./app.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {HomeComponent} from "./pages/home/home.component";
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {ChildrenComponent} from "./pages/children/children.component";
import {ArticlesComponent} from "./pages/articles/articles.component";
import {InfoComponent} from "./pages/info/info.component";

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
