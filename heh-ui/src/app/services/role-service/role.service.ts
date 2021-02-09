import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles: any;
  decoded: any;

  constructor() {
    this.roles = {
      administrator: false,
      moderator: false,
      employee: false,
    };
  }

  getRoles(): any {
    const token = localStorage.getItem('isAuth');
    if (typeof token === 'string') {
      this.decoded = jwt_decode(token);

      if (this.decoded.role.length) {
        this.roles = Object.assign({}, ...this.decoded.role.map((role: string) => {
          return {
            [role.toLowerCase()]: true
          };
        }));
      }

      return this.roles;
    }
  }
}
