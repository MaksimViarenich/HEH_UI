import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { includes } from 'lodash';
import { RoleService } from '../../services/role-service/role.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {
  constructor(
    private roleService: RoleService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkUserRole(next);
  }

  checkUserRole(route: ActivatedRouteSnapshot): any {
    const roles = this.roleService.getRoles();

    if (includes(roles, route.data.role)) {
      return true;
    } else {
      this.router.navigate(['/discounts']);
    }
  }
}
