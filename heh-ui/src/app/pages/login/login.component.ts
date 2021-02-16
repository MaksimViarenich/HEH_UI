import jwt_decode from 'jwt-decode';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  hide = true;
  email = '';
  password = '';
  decodedToken: any;

  /* Moder
     username = 'user.liza@mail.com';
     password = 'a5Adj7O7';*/

  /* Admin
    "email" : user.alexander@mail.com,
    "password" : 0kash914t3  */

  /* Employee
    "email" : user.joe@mail.com,
    "password" : o90q4r93qt   */
  constructor(
    private authService: AuthService,
    private toaster: ToasterService,
    private router: Router) {
  }

  getExpirationDate(token: string): any {
    if (typeof token === 'string') {
      this.decodedToken = jwt_decode(token);

      const expirationDate = (this.decodedToken.exp * 1000).toString();
      localStorage.setItem('expDate', expirationDate);
    }
  }

  login(): any {
    this.authService.login(this.email, this.password).subscribe(
      (data) => {
        localStorage.setItem('isAuth', data.access_token);
        this.getExpirationDate(data.access_token);
        this.router.navigate(['/discounts']);
      },
      (error) => {
        this.toaster.open('The username and password you entered did not match our records. Please double-check and try again.');
      }
    );
  }

  ngOnInit(): void {
  }
}
