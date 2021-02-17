import { UserInfo } from '../../../models/user-info';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from './users.service';
import { ToasterService } from '../../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  users: UserInfo[] = [];
  topUsers: any;
  skipUsers: any;
  previousScrollPosition: any;
  totalCounter: any;

  constructor(private usersService: UsersService,
              private toaster: ToasterService) {
    this.topUsers = 6;
    this.skipUsers = 0;
    this.previousScrollPosition = 0;
    this.totalCounter = 0;
  }

  getUsersList(top: any, skip: any): void {
    this.usersService.getUsers(top, skip).subscribe(
      (data) => {
        data.value.forEach((user: any) => {
          this.users.push(user);
        });
        this.totalCounter = data['@odata.count'];
      },
      (error) => {
        this.toaster.open('Сan not get users');
      }
    );
  }

  ngOnInit(): void {
    this.getUsersList(this.topUsers, this.skipUsers);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.users.length === this.totalCounter)) {
      this.skipUsers += this.topUsers;
      this.getUsersList(this.topUsers, this.skipUsers);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }
}
