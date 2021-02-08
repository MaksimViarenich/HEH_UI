import {UserInfo} from '../../../models/user-info';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UsersService} from './users.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  users: UserInfo[] = [];

  constructor(private usersService: UsersService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.usersService.getUsers().subscribe(
      (data) => {
        console.log(data);
        this.users = data;
      },
      (error) => {
        this.snackBar.open(
          'Can not load users',
          'Close',
          {verticalPosition: 'top'}
        );
      }
    );
  }
}
