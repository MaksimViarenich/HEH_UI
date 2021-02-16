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

  constructor(private usersService: UsersService,
              private toaster: ToasterService) {
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.toaster.open('Сan not get users');
      }
    );
  }
}
