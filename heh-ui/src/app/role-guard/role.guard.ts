import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import { RoleService } from '../services/role-service/role.service';
import { ToasterService } from '../services/toaster-service/toaster.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(private roleService: RoleService,
              private toaster: ToasterService,
              private router: Router) {
  }
  canActivate(): any {
    if (this.roleService.getRoles().administrator) {
      return true;
    } else {
      this.router.navigate(['/discounts']);
      this.toaster.open('You don\`t have administrator permissions');

      return false;
    }
  }
  canActivateChild(): any {
    if (this.roleService.getRoles().moderator) {
      return true;
    } else {
      this.router.navigate(['/discounts']);
      this.toaster.open('You don\`t have moderator / administrator permissions');

      return false;
    }
  }
}
