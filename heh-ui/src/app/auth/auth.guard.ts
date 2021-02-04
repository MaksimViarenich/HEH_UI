import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
      if (this.authService.isAuthenticated()) {
        return true;
      }

      this.router.navigate(['/login']);

      return false;
    }

  // canActivate(): boolean {
  //   if (!this.auth.isLoggedIn) {
  //     this.router.navigate(['/login']);
  //
  //     return false;
  //   }
  //
  //   return true;
  // }
}
