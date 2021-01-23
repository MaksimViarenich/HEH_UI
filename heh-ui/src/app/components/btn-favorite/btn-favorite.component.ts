import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-btn-favorite',
  templateUrl: './btn-favorite.component.html',
  styleUrls: ['./btn-favorite.component.scss']
})
export class BtnFavoriteComponent implements OnInit {
  isFavorite = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
