import { UserProfileService } from './../../user-profile/user-profile.service';
import { GeocodeService } from './geocode.service';
import { FiltersService } from 'src/app/pages/discounts/filters.service';
import { OnInit, Component, Inject, ViewEncapsulation, NgZone, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/app/services/toaster-service/toaster.service';
import { DiscountsService } from '../discounts.service';
import { Marker } from 'src/app/models/marker';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details-modal.component.html',
  styleUrls: ['./discount-details-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscountDetailsModalComponent implements OnInit {
  [x: string]: any;
  discountDetails: any;
  links: any;
  location: any;
  zoom: number;
  addresses: Array<string>;
  markers: Array<Marker>;
  loading: boolean;
  selectedAddresses = new FormControl();
  result: any;
  activeAddresses: Array<string>;
  userLocation: string;

  @ViewChild(AgmMap) map!: AgmMap;
  searchElementRef: any;

  constructor(
    private geocodeService: GeocodeService,
    private discountService: DiscountsService,
    private toaster: ToasterService,
    public mapsApiLoader: MapsAPILoader,
    private userProfleService: UserProfileService,
    private filtersService: FiltersService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.discountDetails = {
      tagsIds: [],
    };
    this.addresses = [];
    this.activeAddresses = [];
    this.location = {};
    this.zoom = 10;
    this.userLocation = '';
    this.loading = false;
    this.markers = [];
    this.links = {
      website: '',
      instagram: '',
      facebook: '',
      vkontakte: '',
    };
    // this.mapsApiLoader = mapsApiLoader;
    // this.zone = zone;
  }
  address = new FormControl();
  discountId: string = this.data;

  displayActiveMarkers(): void {
    this.markers = [];

    this.activeAddresses.forEach(address => {
      this.markers.push(this.geocodeService.findLocation(address));
    });
  }

  ngOnInit(): void {
    this.userProfleService.getUser().subscribe(
      (data: { address: { cityId: string; street: string }; }) => {
        this.userLocation = `${this.filtersService.getAddressByCityId(data.address.cityId)} ${data.address.street}`;
        this.location = this.geocodeService.findLocation(this.userLocation);
      },
      (error: any) => {
        this.toaster.open('Сan not get user location');
      }
    );

    this.discountService.getDiscountDetails(this.discountId).subscribe(
      (data) => {
        this.discountDetails = data;

        data.addresses.forEach((item: { cityId: string; street: string; }) => {
          this.addresses.push(`${this.filtersService.getAddressByCityId(item.cityId)} ${item.street}`);
        });

        if (data.links.length) {
          this.links = Object.assign({}, ...data.links.map((link: any) => {
            return {
              [link.type.toLowerCase()]: link.url
            };
          }));
        }
      },
      (error) => {
        this.toaster.open('Can not get discountId');
      }
    );
  }

  // renderAddressMarkers(): any {
  //   this.addresses.forEach(address => {
  //     // tslint:disable-next-line: new-parens
  //     this.geocodeService.geocodeAddress(address).subscribe(
  //       (data) => {
  //         console.log(data);
  //       }
  //     );
  //   });
  // }
}
