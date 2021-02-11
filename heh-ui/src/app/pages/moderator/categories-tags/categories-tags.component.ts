import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToasterService} from '../../../services/toaster-service/toaster.service';
import {FiltersService} from '../../discounts/filters.service';
import {Category} from '../../../models/category';
import {Tag} from '../../../models/tag';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-categories-tags',
  templateUrl: './categories-tags.component.html',
  styleUrls: ['./categories-tags.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CategoriesTagsComponent implements OnInit {
  categoriesAll: Category[] = [];
  tagsAll: Tag[] = [];
  activeCategoryId: any;
  tagsAllCopy: any;
  isDisabled: boolean;

  constructor(private filterService: FiltersService,
              private toaster: ToasterService) {
    this.isDisabled = true;
  }

  getAllCategoriesAndTags(): void {
    this.filterService.getCategoriesTags().subscribe(
      (data) => {
        this.categoriesAll = data;
        data.forEach((category: any) => {
          category.tags.forEach((tag: any) => {
            this.tagsAll.push({
              categoryId: tag.categoryId,
              name: tag.name,
              id: tag.id
            });
            this.tagsAllCopy = cloneDeep(this.tagsAll);
          });
        });
      },
      (error) => {
        this.toaster.open('Сan not get categories and tags');
      }
    );
  }

  onChangeData(params: string): void {
    this.getAllCategoriesAndTags();
  }

  ngOnInit(): void {
    this.getAllCategoriesAndTags();
  }

  showTagsList(): void {
    if (this.activeCategoryId) {
      this.tagsAll = [];
      this.isDisabled = false;
      this.categoriesAll.forEach((category: any) => {
        if (this.activeCategoryId === category.id) {
          this.tagsAll = category.tags;
        }
      });
    } else {
      this.isDisabled = true;
      this.tagsAll = cloneDeep(this.tagsAllCopy);
    }
  }
}
