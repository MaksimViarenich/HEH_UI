import { TranslateService } from '@ngx-translate/core';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cloneDeep, isEqual, forEach } from 'lodash';
import { Discount } from '../../../../models/discount';
import { Address } from '../../../../models/address';
import { Phones } from '../../../../models/phones';
import { FiltersService } from '../../../../services/filter-service/filters.service';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';
import { ModalService } from '../../../../services/modal-service/modal.service';

@Component({
  selector: 'app-add-discount-modal',
  templateUrl: './add-discount-modal.component.html',
  styleUrls: ['./add-discount-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddDiscountModalComponent implements OnInit {
  form: FormGroup;
  discountDetail: Discount;
  pristineDiscountDetail: any;
  vendorAddresses: Array<Address>;
  vendorPhones: Array<Phones>;
  categoriesAll: any;
  tagsByCategory: any;

  constructor(private filtersService: FiltersService,
              private toaster: ToasterService,
              private matDialogRef: MatDialogRef<any>,
              private modalService: ModalService,
              private translateService: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.discountDetail = data.discount;
    this.pristineDiscountDetail = cloneDeep(this.discountDetail);
    this.vendorAddresses = data.addresses;
    this.vendorPhones = data.phones;
    this.categoriesAll = [];
    this.tagsByCategory = [];
    this.form = new FormGroup({
      address: new FormControl('', [Validators.required]),
      phone: new FormControl(),
      promoCode: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      conditions: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      dateStart: new FormControl('', [Validators.required]),
      dateEnd: new FormControl(),
      category: new FormControl('', [Validators.required]),
      tag: new FormControl()
    });
  }

  checkChanges(): any {
    if (!this.data.discount.id) {
      this.pristineDiscountDetail = {
        addressesIds: undefined,
        categoryId: undefined,
        conditions: undefined,
        endDate: undefined,
        phonesIds: undefined,
        promoCode: undefined,
        startDate: undefined,
        tagsIds: undefined,
      };
    }
    const isChanged = isEqual(this.discountDetail, this.pristineDiscountDetail);

    const confirmData = {
      message: this.translateService.instant('confirmation.change.message'),
      buttonPositive: this.translateService.instant('confirmation.change.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.change.button-negative'),
    };

    if (!isChanged) {
      const dialogRef = this.modalService.openConfirmModal(confirmData);

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.discountDetail = cloneDeep(this.pristineDiscountDetail);
          this.matDialogRef.close(this.discountDetail);
        }
      });
    } else {
      this.matDialogRef.close('');
    }
  }

  ngOnInit(): void {
    this.matDialogRef.backdropClick().subscribe(() => {
      this.checkChanges();
    });
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
      () => {
        this.toaster.open('Сan not get categories and tags');
      }
    );
  }
}
