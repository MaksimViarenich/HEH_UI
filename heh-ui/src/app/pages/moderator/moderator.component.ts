import {Component, OnInit} from '@angular/core';
import {MODERATOR_TABS} from '../../models/tab';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss']
})
export class ModeratorComponent implements OnInit {

  tabsModerator = MODERATOR_TABS;

  constructor() {
  }

  ngOnInit(): void {
  }

}
