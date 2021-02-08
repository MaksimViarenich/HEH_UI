import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';


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
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  login(): any {
    this.authService.login(this.email, this.password).subscribe(
      (data) => {
        localStorage.setItem('isAuth', data.access_token);
        this.router.navigate(['/discounts']);
      },
      (error) => {
        this.snackBar.open(
          'The username and password you entered did not match our records. Please double-check and try again.',
          'Close',
          {verticalPosition: 'top'}
        );
      }
    );
  }

  ngOnInit(): void {
  }

}
