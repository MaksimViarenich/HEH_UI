import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { isString, toLower, forEach } from 'lodash';

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

    if (isString(token)) {
      this.decoded = jwt_decode(token);
      forEach(this.decoded.role, (role: string) => {
        this.roles.push(toLower(role));
      });

      return this.roles;
    }
  }
}
