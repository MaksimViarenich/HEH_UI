import { UserInfo } from './../../models/user-info';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  user: UserInfo = {
    name: 'Michael Browk',
    email: 'michael.browk@exadel.com',
    role: 'user',
    isAtive: true,
    avatar: '../../assets/img/header_profile.svg'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
