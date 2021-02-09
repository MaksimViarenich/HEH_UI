import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles: any;
  decoded: any;

  constructor() {
    this.roles = [];
  }

  getRoles(): any {
    const token = localStorage.getItem('isAuth');
    this.roles = [];

    if (typeof token === 'string') {
      this.decoded = jwt_decode(token);
      this.decoded.role.forEach((role: string) => {
        this.roles.push(role.toLowerCase());
      });

      return this.roles;
    }
  }
}
