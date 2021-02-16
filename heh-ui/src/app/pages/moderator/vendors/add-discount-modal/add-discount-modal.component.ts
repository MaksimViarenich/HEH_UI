import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Discount } from '../../../../models/discount';
import { Address } from '../../../../models/address';
import { Phones } from '../../../../models/phones';
import { FiltersService } from '../../../discounts/filters.service';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-add-discount-modal',
  templateUrl: './add-discount-modal.component.html',
  styleUrls: ['./add-discount-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddDiscountModalComponent implements OnInit {
  discountDetail: Discount;
  vendorAddresses: Array<Address>;
  vendorPhones: Array<Phones>;
  categoriesAll: any;
  tagsByCategory: any;

  constructor(private filtersService: FiltersService,
              private toaster: ToasterService,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.discountDetail = data.discount;
    this.vendorAddresses = data.addresses;
    this.vendorPhones = data.phones;
    this.categoriesAll = [];
    this.tagsByCategory = [];
  }

  vendor = new FormControl();
  address = new FormControl();
  phone = new FormControl();
  promoCode = new FormControl();
  conditions = new FormControl();
  date = new FormControl();
  tag = new FormControl();
  category = new FormControl();

  ngOnInit(): void {
    this.getAllCategoriesAndTags();
    this.showTagList();
  }

  showTagList(): void {
    this.categoriesAll.forEach((category: any) => {
      if (this.discountDetail.categoryId === category.id) {
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
