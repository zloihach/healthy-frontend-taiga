// import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Injector } from '@angular/core';
// import {AuthService} from "../auth.service";
//
// export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   const injector = Injector.create({
//     providers: [
//       { provide: AuthService, deps: [] }
//     ]
//   });
//   const authService = injector.get(AuthService);
//   const requiredRoles = route.data['roles'] as string[];
//
//   const currentUser = authService.currentUserValue;
//   if (currentUser && requiredRoles.some(role => currentUser.role === role)) {
//     console.log(currentUser.role);
//     return true;
//   } else {
//     console.error('Access denied - User does not have required role');
//     return false;
//   }
// };

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['roles'] as Array<string>; // Используем скобочную нотацию
    const currentUser = this.authService.currentUserValue;

    if (!currentUser) {
      console.error('No user logged in');
      return false;
    }

    const hasRole = requiredRoles.some(role => currentUser.role === role);
    if (!hasRole) {
      console.error('Access denied - User does not have required role');
      return false;
    }

    return true;
  }
}
