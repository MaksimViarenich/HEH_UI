import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Discount } from '../../../../models/discount';
import { Address } from '../../../../models/address';
import { Phones } from '../../../../models/phones';
import { FiltersService } from '../../../../services/filter-service/filters.service';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';
import { cloneDeep, isEqual, forEach } from 'lodash';

@Component({
  selector: 'app-add-discount-modal',
  templateUrl: './add-discount-modal.component.html',
  styleUrls: ['./add-discount-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddDiscountModalComponent implements OnInit {
  form: FormGroup;
  discountDetail: Discount;
  pristineDiscountDetail: Discount;
  vendorAddresses: Array<Address>;
  vendorPhones: Array<Phones>;
  categoriesAll: any;
  tagsByCategory: any;

  constructor(private filtersService: FiltersService,
              private toaster: ToasterService,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.discountDetail = data.discount;
    this.pristineDiscountDetail = cloneDeep(this.discountDetail);
    this.vendorAddresses = data.addresses;
    this.vendorPhones = data.phones;
    this.categoriesAll = [];
    this.tagsByCategory = [];
    this.form = new FormGroup({
      address: new FormControl(),
      phone: new FormControl(),
      promoCode: new FormControl('', [Validators.required]),
      conditions: new FormControl('', [Validators.required]),
      dateStart: new FormControl('', [Validators.required]),
      dateEnd: new FormControl(),
      category: new FormControl('', [Validators.required]),
      tag: new FormControl()
    });
  }

  ngOnInit(): void {
    this.getAllCategoriesAndTags();
    this.showTagList();
  }

  canNotBeSaved(): boolean {
    return isEqual(this.discountDetail, this.pristineDiscountDetail);
  }

  showTagList(): void {
    this.tagsByCategory = [];
    forEach(this.categoriesAll, (category: any) => {
      if (isEqual(this.discountDetail.categoryId, category.id)) {
        this.tagsByCategory = category.tags;
      }
    });
  }

  getAllCategoriesAndTags(): void {
    this.filtersService.getCategoriesTags().subscribe(
      (data) => {
        this.categoriesAll = data;
        this.showTagList();
      },
      (error) => {
        this.toaster.open('Сan not get categories and tags');
      }
    );
  }
}
