import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  // {
  //   path: '**',pathMatch: 'full', component: PageNotFoundComponent
  // },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },

];
