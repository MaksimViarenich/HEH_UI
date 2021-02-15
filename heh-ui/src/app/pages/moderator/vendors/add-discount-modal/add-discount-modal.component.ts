import {Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Discount} from '../../../../models/discount';
import {Address} from '../../../../models/address';
import {Phones} from '../../../../models/phones';
import {FiltersService} from '../../../discounts/filters.service';
import {ToasterService} from '../../../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-add-discount-modal',
  templateUrl: './add-discount-modal.component.html',
  styleUrls: ['./add-discount-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddDiscountModalComponent implements OnInit {
  @Output() saveDiscountEvent = new EventEmitter<any>();
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
    console.log(this.discountDetail);
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
  saveDiscount(discount: any): void{
    return this.saveDiscountEvent.emit(discount);
  }
}
