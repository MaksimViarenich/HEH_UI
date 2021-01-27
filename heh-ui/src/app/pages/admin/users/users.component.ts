import { UserInfo } from './../../../models/user-info';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: UserInfo[] = [
    {
      name: 'Michael Browk',
      email: 'michael.browk@exadel.com',
      role: 'user',
      isAсtive: true,
      avatar: '../../../assets/img/header_profile.svg'
    },
    {
      name: 'Petro Kachur',
      email: 'michael.browk@exadel.com',
      role: 'user',
      isAсtive: false,
      avatar: '../../../assets/img/header_profile.svg'
    },
    {
      name: 'Andriy Zheka',
      email: 'michael.browk@exadel.com',
      role: 'user',
      isAсtive: true,
      avatar: '../../../assets/img/header_profile.svg'
    },
    {
      name: 'Kostya Shikarchuk',
      email: 'michael.browk@exadel.com',
      role: 'user',
      isAсtive: true,
      avatar: '../../../assets/img/header_profile.svg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
