import {Component, OnInit} from '@angular/core';
import {NavigationTabs} from '../../models/navigation-tabs';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss']
})
export class ModeratorComponent implements OnInit {

  tabsModerator: NavigationTabs[] = [
    {
      name: 'Vendors',
      path: '/moderator/vendors'
    },
    {
      name: 'Categories & Tabs',
      path: '/moderator/categories_tags'
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
