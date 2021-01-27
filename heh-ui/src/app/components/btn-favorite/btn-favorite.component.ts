import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-btn-favorite',
  templateUrl: './btn-favorite.component.html',
  styleUrls: ['./btn-favorite.component.scss']
})
export class BtnFavoriteComponent implements OnInit {
  @Input() isFavorite: boolean | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
