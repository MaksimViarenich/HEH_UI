import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  discountCategory: string = 'Food';

  constructor() {
  }

  ngOnInit(): void {
  }

}
