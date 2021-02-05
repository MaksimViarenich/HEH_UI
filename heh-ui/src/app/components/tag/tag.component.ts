import { Category } from './../../models/category';
import { TagService } from './tag.service';
import {  Component, Input, OnInit  } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() discountTag: string | undefined;
  categoryArray: Category[] = [];

  constructor(public tagService: TagService) {
  }

  ngOnInit(): void {
    this.tagService.getTags().subscribe(
      (data) => {
        this.categoryArray = data;
        localStorage.setItem('categories', JSON.stringify(this.categoryArray));
      }
    );
  }

}
