import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { forEach, isEqual, size } from 'lodash';

import { UserInfo } from '../../../models/user-info';
import { UsersService } from './users.service';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { FiltersService } from '../../../services/filter-service/filters.service';
import { GridService } from '../../../services/grid-service/grid.service';

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
  breakpoint: number;

  constructor(private usersService: UsersService,
              private toaster: ToasterService,
              private filterService: FiltersService,
              private gridService: GridService) {
    this.topUsers = 9;
    this.skipUsers = 0;
    this.previousScrollPosition = 0;
    this.totalCount = 0;
    this.breakpoint = 0;
  }

  ngOnInit(): void {
    if (history.state.userEmail) {
      this.searchData.searchUserText = history.state.userEmail;
    }
    this.getUsersList(this.searchData, this.topUsers, this.skipUsers);
    this.filterService.queryParams = '';
    this.breakpoint = this.gridService.getUserGrid(window.innerWidth);
  }

  applyUserSearch(): void {
    this.users = [];
    this.skipUsers = 0;
    this.previousScrollPosition = 0;
    this.getUsersList(this.searchData, this.topUsers, this.skipUsers);
  }

  getUsersList(searchData: any, top: any, skip: any): void {
    this.usersService.getUsers(searchData, top, skip).subscribe(
      (data) => {
        forEach(data.value, (user: any) => {
          this.users.push(user);
        });
        this.totalCount = data['@odata.count'];
      },
      () => {
        this.toaster.open('Сan not get users');
      }
    );
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !isEqual(size(this.users), this.totalCount)) {
      this.skipUsers += this.topUsers;
      this.getUsersList(this.searchData, this.topUsers, this.skipUsers);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }

  onResize(event: any): void {
    this.breakpoint = this.gridService.getUserGrid(event.target.innerWidth);
  }
}
