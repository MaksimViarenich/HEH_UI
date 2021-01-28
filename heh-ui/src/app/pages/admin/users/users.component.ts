import { UserInfo } from './../../../models/user-info';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  users: UserInfo[] = [
    {
      name: 'Michael Browk',
      email: 'michael.browk@exadel.com',
      role: 'user',
      isAсtive: true,
      avatar: '../../../assets/images/header_profile.svg'
    },
    {
      name: 'Petro Kachur',
      email: 'michael.browk@exadel.com',
      role: 'moderator',
      isAсtive: false,
      avatar: '../../../assets/images/header_profile.svg'
    },
    {
      name: 'Andriy Zheka',
      email: 'michael.browk@exadel.com',
      role: 'user',
      isAсtive: true,
      avatar: '../../../assets/images/header_profile.svg'
    },
    {
      name: 'Kostya Shikarchuk',
      email: 'michael.browk@exadel.com',
      role: 'admin',
      isAсtive: true,
      avatar: '../../../assets/images/header_profile.svg'
    },
    {
      name: 'Kostya Shikarchuk',
      email: 'michael.browk@exadel.com',
      role: 'admin',
      isAсtive: true,
      avatar: '../../../assets/images/header_profile.svg'
    },
    {
      name: 'Kostya Shikarchuk',
      email: 'michael.browk@exadel.com',
      role: 'admin',
      isAсtive: true,
      avatar: '../../../assets/images/header_profile.svg'
    },
    {
      name: 'Kostya Shikarchuk',
      email: 'michael.browk@exadel.com',
      role: 'admin',
      isAсtive: true,
      avatar: '../../../assets/images/header_profile.svg'
    },
    {
      name: 'Kostya Shikarchuk',
      email: 'michael.browk@exadel.com',
      role: 'admin',
      isAсtive: true,
      avatar: '../../../assets/images/header_profile.svg'
    },
    {
      name: 'Kostya Shikarchuk',
      email: 'michael.browk@exadel.com',
      role: 'admin',
      isAсtive: true,
      avatar: '../../../assets/images/header_profile.svg'
    },
    {
      name: 'Kostya Shikarchuk',
      email: 'michael.browk@exadel.com',
      role: 'admin',
      isAсtive: true,
      avatar: '../../../assets/images/header_profile.svg'
    },
    {
      name: 'Kostya Shikarchuk',
      email: 'michael.browk@exadel.com',
      role: 'admin',
      isAсtive: true,
      avatar: '../../../assets/images/header_profile.svg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
