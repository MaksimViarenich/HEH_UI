import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { RoleService } from '../services/role-service/role.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private roleService: RoleService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkUserRole(next, url);
  }

  checkUserRole(route: ActivatedRouteSnapshot, url: any ): any {
    const roles = this.roleService.getRoles();

    if (roles.includes(route.data.role)) {
      console.log(roles);
      console.log(route.data.role);
      console.log(roles.includes(route.data.role));

      return true;
    } else {
      this.router.navigate(['/discounts']);

      return false;
    }
  }
}
