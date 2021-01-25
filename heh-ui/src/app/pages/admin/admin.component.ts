import {Component, OnInit} from '@angular/core';
import {NavigationTabs} from '../../models/navigation-tabs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  tabsAdmin: NavigationTabs[] = [
    {
      name: 'Users',
      path: '/admin/users'
    },
    {
      name: 'Event History',
      path: '/admin/history'
    },
    {
      name: 'Statistics',
      path: '/admin/statistics'
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
