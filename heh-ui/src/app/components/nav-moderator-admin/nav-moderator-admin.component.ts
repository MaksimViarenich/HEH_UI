import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Tab } from '../../models/tab';

@Component({
  selector: 'app-nav-moderator-admin',
  templateUrl: './nav-moderator-admin.component.html',
  styleUrls: ['./nav-moderator-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NavModeratorAdminComponent {
  @Input() tabs: Array<Tab> | undefined;
}
