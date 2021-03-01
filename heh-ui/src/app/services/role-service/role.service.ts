import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import * as _ from 'lodash';

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

    if (_.isString(token)) {
      this.decoded = jwt_decode(token);
      _.forEach(this.decoded.role, (role: string) => {
        this.roles.push(_.toLower(role));
      });

      return this.roles;
    }
  }
}
