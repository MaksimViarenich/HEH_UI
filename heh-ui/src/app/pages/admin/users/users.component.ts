import { UserInfo } from '../../../models/user-info';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from './users.service';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { FiltersService } from '../../../services/filter-service/filters.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  users: UserInfo[] = [];
  searchData: any = {};
  topUsers: any;
  skipUsers: any;
  previousScrollPosition: any;
  totalCount: any;

  constructor(private usersService: UsersService,
              private toaster: ToasterService,
              private filterService: FiltersService) {
    this.topUsers = 6;
    this.skipUsers = 0;
    this.previousScrollPosition = 0;
    this.totalCount = 0;
  }

  ngOnInit(): void {
    this.getUsersList(this.topUsers, this.skipUsers);
    this.filterService.queryParams = '';
  }

  applyUserSearch(): void {
    this.filterService.setQueryParams(this.searchData);
    this.users = [];
    this.skipUsers = 0;
    this.previousScrollPosition = 0;
    this.getUsersList(this.topUsers, this.skipUsers);
  }

  getUsersList(top: any, skip: any): void {
    this.usersService.getUsers(top, skip).subscribe(
      (data) => {
        data.value.forEach((user: any) => {
          this.users.push(user);
        });
        this.totalCount = data['@odata.count'];
      },
      (error) => {
        this.toaster.open('Сan not get users');
      }
    );
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.users.length === this.totalCount)) {
      this.skipUsers += this.topUsers;
      this.getUsersList(this.topUsers, this.skipUsers);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }
}
