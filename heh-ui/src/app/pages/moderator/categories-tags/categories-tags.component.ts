import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { cloneDeep } from 'lodash';
import { forEach, isEqual, find } from 'lodash';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { FiltersService } from '../../../services/filter-service/filters.service';
import { Category } from '../../../models/category';
import { Tag } from '../../../models/tag';

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
        if (!(find(data, (item: any) => isEqual(item.id, this.activeCategoryId)))){
          this.activeCategoryId = '';
        }
        this.categoriesAll = data;
        forEach(data, (category: any) => {
          forEach(category.tags, (tag: any) => {
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
      () => {
        this.toaster.open('Сan not get categories and tags');
      }
    );
  }

  addCategory(category: string, reload: any): void {
    this.categoryObj = {};
    this.categoryObj.name = category;
    this.filtersService.addNewCategory(this.categoryObj).subscribe(
      () => {
        this.toaster.open('New category has been added', 'success');
        reload.emit();
      },
      (error) => {
        const errorMessage = error.error.errors.hasOwnProperty('Name') ? error.error.errors.Name[0] : 'There is no possibility to add a new category';
        this.toaster.open(errorMessage);
      }
    );
  }

  addTag(tag: string, reload: any): void {
    this.tagObj = {};
    this.tagObj.categoryId = this.activeCategoryId;
    this.tagObj.name = tag;
    this.filtersService.addNewTag(this.tagObj).subscribe(
      () => {
        this.toaster.open('New tag has been added', 'success');
        reload.emit();
      },
      (error) => {
        const errorMessage = error.error.errors.hasOwnProperty('Name') ? error.error.errors.Name[0] : 'There is no possibility to add a new tag';
        this.toaster.open(errorMessage);
      }
    );
  }

  deleteCategory(categoryId: string, reload: any): void {
    this.filtersService.deleteCategory(categoryId).subscribe(
      () => {
        this.toaster.open('Category has been deleted', 'success');
        reload.emit();
      },
      (error) => {
        const errorMessage = error.error ? error.error : 'There is no possibility to delete this category';
        this.toaster.open(errorMessage);
      }
    );
  }

  deleteTag(tagId: string, reload: any): void {
    this.filtersService.deleteTag(tagId).subscribe(
      () => {
        this.toaster.open('Tag has been deleted', 'success');
        reload.emit();
      },
      () => {
        this.toaster.open('There is no possibility to delete this tag');
      }
    );
  }

  editCategory(category: any, reload: any): void{
    this.filtersService.editCategory(category).subscribe(
      () => {
        this.toaster.open('Category has been changed', 'success');
        reload.emit();
      },
      (error) => {
        const errorMessage = error.error.errors.hasOwnProperty('Name') ? error.error.errors.Name[0] : 'There is no possibility to change this category';
        this.toaster.open(errorMessage);
      }
    );
  }


  editTag(tag: any, reload: any): void{
    this.filtersService.editTag(tag).subscribe(
      () => {
        this.toaster.open('Tag has been changed', 'success');
        reload.emit();
      },
      (error) => {
        const errorMessage = error.error.errors.hasOwnProperty('Name') ? error.error.errors.Name[0] : 'There is no possibility to change this tag';
        this.toaster.open(errorMessage);
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
      forEach(this.categoriesAll, (category: any) => {
        if (isEqual(this.activeCategoryId, category.id)) {
          this.tagsAll = category.tags;
        }
      });
    } else {
      this.isDisabled = true;
      this.tagsAll = cloneDeep(this.tagsAllCopy);
    }
  }
}
