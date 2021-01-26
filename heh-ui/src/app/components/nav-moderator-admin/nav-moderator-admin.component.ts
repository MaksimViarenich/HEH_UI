import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Tabs} from '../../models/tabs';

@Component({
  selector: 'app-nav-moderator-admin',
  templateUrl: './nav-moderator-admin.component.html',
  styleUrls: ['./nav-moderator-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavModeratorAdminComponent implements OnInit {
  @Input() tabs: Array<Tabs> | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
