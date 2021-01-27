import { UserInfo } from './../../models/user-info';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserCardComponent implements OnInit {

  @Input() user: UserInfo | undefined;

  color: ThemePalette = 'primary';
  checked: boolean | undefined;
  disabled: false;

  constructor() {
  }

  ngOnInit(): void {
    this.checked = this.user?.isAсtive;
  }

}
