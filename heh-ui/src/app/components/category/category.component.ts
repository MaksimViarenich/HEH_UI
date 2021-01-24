import {Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() discountCategory: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
