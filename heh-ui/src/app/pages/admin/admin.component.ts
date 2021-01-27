import {Component, OnInit} from '@angular/core';
import {ADMIN_TABS} from '../../models/tab';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  tabsAdmin = ADMIN_TABS;

  constructor() {
  }

  ngOnInit(): void {
  }

}
