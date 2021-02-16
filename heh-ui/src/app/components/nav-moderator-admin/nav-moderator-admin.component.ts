import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Tab } from '../../models/tab';

@Component({
  selector: 'app-nav-moderator-admin',
  templateUrl: './nav-moderator-admin.component.html',
  styleUrls: ['./nav-moderator-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavModeratorAdminComponent implements OnInit {
  @Input() tabs: Array<Tab> | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
