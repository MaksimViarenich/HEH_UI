import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectOption } from '../../../models/select-option';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { FiltersService } from '../../discounts/filters.service';
import { Category } from '../../../models/category';
import { Tag } from '../../../models/tag';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-categories-tags',
  templateUrl: './categories-tags.component.html',
  styleUrls: ['./categories-tags.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CategoriesTagsComponent implements OnInit {
  categoryOptions: SelectOption;
  tagsOptions: SelectOption;
  categoriesAll: Category[] = [];
  tagsAll: Tag[] = [];
  activeCategoryId: any;
  tagsOptionsCopy: any;
  isDisabled: boolean;

  constructor(private filterService: FiltersService,
              private toaster: ToasterService) {
    this.categoryOptions = {
      label: 'categories-and-tags.category',
      options: []
    };

    this.tagsOptions = {
      label: 'categories-and-tags.tag',
      options: []
    };
    this.isDisabled = true;
  }

  ngOnInit(): void {
    this.filterService.getCategoriesTags().subscribe(
      (data) => {
        this.categoriesAll = data;
        console.log(data);
        data.forEach((category: any) => {
          this.categoryOptions.options.push({
            id: category.id,
            viewValue: category.name
          });
          category.tags.forEach((tag: any) => {
            this.tagsOptions.options.push({
              id: tag.id,
              viewValue: tag.name
            });
            this.tagsOptionsCopy = cloneDeep(this.tagsOptions.options);
            this.tagsAll.push({
              categoryId: tag.categoryId,
              name: tag.name,
              id: tag.id
            });
          });
        });
      },
      (error) => {
        this.toaster.open('Сan not get categories and tags');
      }
    );
  }
  showTagsList(): void {
    if (this.activeCategoryId !== undefined) {
      this.tagsOptions.options = [];
      this.isDisabled = false;
      const activeCategoryItem = this.categoriesAll.filter((category: any) => {
        return category.id === this.activeCategoryId;
      });
      // @ts-ignore
      activeCategoryItem[0].tags.forEach((tag: any) => {
        this.tagsOptions.options.push({
          id: tag.id,
          viewValue: tag.name
        });
      });
    } else {
      this.isDisabled = true;
      this.tagsOptions.options = cloneDeep(this.tagsOptionsCopy);
    }
  }
}
