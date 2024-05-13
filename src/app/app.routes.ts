import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {HomeComponent} from "./pages/home/home.component";
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ChildrenComponent} from "./pages/children/children.component";
import {InfoComponent} from "./pages/info/info.component";
import {PublicationComponent} from "./pages/publication/publication.component";
import {AuthGuard} from "./core/auth/auth.guard";

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'vaccination-calendar', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'children', pathMatch: 'full', component: ChildrenComponent, canActivate: [AuthGuard] },
  { path: 'publication', pathMatch: 'full', component: PublicationComponent, canActivate: [AuthGuard] },
  { path: 'info', pathMatch: 'full', component: InfoComponent, canActivate: [AuthGuard] },
  // { path: 'admin', pathMatch: 'full', component: AdminComponent, canActivate: [AdminGuard] },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
