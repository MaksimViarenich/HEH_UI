import {DiscountsService} from './discounts.service';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Discount} from '../../models/discount';
import {SearchOptions} from '../../models/search-options';
import {ModalService} from '../../services/modal-service/modal.service';
import {FiltersService} from './filters.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  searchFieldsOptions: SearchOptions;

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private filtersService: FiltersService,
              private discountService: DiscountsService) {
    this.searchFieldsOptions = {
      selectOptions: {
        label: 'search.location',
        options: []
      },
      multiSelectOptions: [
        {
          label: 'search.category',
          options: []
        },
        {
          label: 'search.tag',
          options: []
        },
        {
          label: 'search.vendor',
          options: []
        },
      ]
    };
  }

  discounts: Array<Discount> = [];

  openDiscountDetails(discount: Discount): void {
    // this.modalService.openDiscountDetailsModal(discount);
  }

  ngOnInit(): void {
    this.filtersService.loadFilters();

    const filters = this.filtersService.getFilters();

    this.searchFieldsOptions.selectOptions.options = filters.locations;
    this.searchFieldsOptions.multiSelectOptions[0].options = filters.categories;
    this.searchFieldsOptions.multiSelectOptions[1].options = filters.tags;
    this.searchFieldsOptions.multiSelectOptions[2].options = filters.vendors;

    this.discountService.getDiscounts().subscribe(
      (data) => {
        this.discounts = data.value;
      }
    );
  }

}
