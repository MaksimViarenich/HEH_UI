import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  categoriesAll: Category[] = [];
  tagsAll: Tag[] = [];
  categoryObj: any;
  tagObj: any;
  activeCategoryId: any;
  tagsAllCopy: any;
  isDisabled: boolean;

  constructor(private filtersService: FiltersService,
              private toaster: ToasterService) {
    this.isDisabled = true;
  }

  getAllCategoriesAndTags(): void {
    this.filtersService.getCategoriesTags().subscribe(
      (data) => {
        if (!(data.find((item: any) => item.id === this.activeCategoryId))){
          this.activeCategoryId = '';
        }
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
        this.showTagsList();
      },
      (error) => {
        this.toaster.open('Сan not get categories and tags');
      }
    );
  }

  addCategory(category: string, reload: any): void {
    this.categoryObj = {};
    this.categoryObj.name = category;
    this.filtersService.addNewCategory(this.categoryObj).subscribe(
      (data) => {
        this.toaster.open('New category has been added', 'success');
        reload.emit();
      },
      (error) => {
        this.toaster.open('There is no possibility to add a new category');
      }
    );
  }

  addTag(tag: string, reload: any): void {
    this.tagObj = {};
    this.tagObj.categoryId = this.activeCategoryId;
    this.tagObj.name = tag;
    this.filtersService.addNewTag(this.tagObj).subscribe(
      (data) => {
        this.toaster.open('New tag has been added', 'success');
        reload.emit();
      },
      (error) => {
        this.toaster.open('There is no possibility to add a new tag');
      }
    );
  }

  deleteCategory(categoryId: string, reload: any): void {
    this.filtersService.deleteCategory(categoryId).subscribe(
      (data) => {
        this.toaster.open('Category has been deleted', 'success');
        reload.emit();
      },
      (error) => {
        this.toaster.open('There is no possibility to delete this category');
      }
    );
  }

  deleteTag(tagId: string, reload: any): void {
    this.filtersService.deleteTag(tagId).subscribe(
      (data) => {
        this.toaster.open('Tag has been deleted', 'success');
        reload.emit();
      },
      (error) => {
        this.toaster.open('There is no possibility to delete this tag');
      }
    );
  }

  onChangeData(params: string): void {
    this.tagsAll = [];
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
