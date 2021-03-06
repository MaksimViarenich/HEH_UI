import { Component } from '@angular/core';
import { MODERATOR_TABS } from '../../models/tab';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss']
})
export class ModeratorComponent {

  tabsModerator = MODERATOR_TABS;

}
