import { Routes } from '@angular/router';
import { AuthGuard } from "./core/auth/guards/auth.guard";
import { RoleGuard } from "./core/auth/guards/role.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'vaccination-calendar',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'children',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/children/children.component').then(m => m.ChildrenComponent)
  },
  {
    path: 'info',
    loadComponent: () => import('./pages/info/info.component').then(m => m.InfoComponent)
  },
  {
    path: 'publication',
    loadComponent: () => import('./pages/publication/publication.component').then(m => m.PublicationComponent)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () => import('./admin/pages/admin-board/admin-board.component').then(m => m.AdminBoardComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];
