import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationTabs} from '../../models/navigation-tabs';

@Component({
  selector: 'app-nav-moderator-admin',
  templateUrl: './nav-moderator-admin.component.html',
  styleUrls: ['./nav-moderator-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavModeratorAdminComponent implements OnInit {
  @Input() tabs: Array<NavigationTabs> | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
