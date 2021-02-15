import { OnInit, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/app/services/toaster-service/toaster.service';
import { Discount } from '../../../models/discount';
import { DiscountsService } from '../discounts.service';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details-modal.component.html',
  styleUrls: ['./discount-details-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscountDetailsModalComponent implements OnInit {
  discountDetails: any;
  links: any;
  constructor(
    private discountService: DiscountsService,
    private toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: Discount
  ) {
    this.discountDetails = {
      tagsIds: [],
    };
    this.links = {
      website: '',
      instagram: '',
      facebook: '',
      vkontakte: '',
    };
  }
  address = new FormControl();
  discountId: string = this.data.id;
  lat = 53.90731553965919;
  lng = 27.552685142738643;

  ngOnInit(): void {
    this.discountService.getDiscountDetails(this.discountId).subscribe(
      (data) => {
        this.discountDetails = data;

        if (data.links.length) {
          this.links = Object.assign({}, ...data.links.map((link: any) => {
            return {
              [link.type.toLowerCase()]: link.url
            };
          }));
        }
        this.toaster.open('Information about discount has been received', 'success');
      },
      (error) => {
        this.toaster.open('Can not get discountId');
      }
    );
  }
}
