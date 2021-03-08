import { Component } from '@angular/core';
import { ADMIN_TABS } from '../../models/tab';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent {
  tabsAdmin = ADMIN_TABS;
}
