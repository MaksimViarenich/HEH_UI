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

  constructor(private usersService: UsersService,
              private toaster: ToasterService,
              private filterService: FiltersService) { }

  ngOnInit(): void {
    this.filterService.queryParams = '';
    this.usersService.getUsers().subscribe(
      (data) => {
        this.users = data.value;
      },
      (error) => {
        this.toaster.open('Сan not get users');
      }
    );
  }

  applyUserSearch(): void {
    this.filterService.setQueryParams(this.searchData);
    this.searchData.searchUserText = '';
    this.usersService.getUsers().subscribe(
      (data) => {
        this.users = data.value;
      },
      (error) => {
        this.toaster.open('Сan not get users');
      }
    );
  }
}
