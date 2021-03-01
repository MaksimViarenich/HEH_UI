import { UserProfileService } from '../../user-profile/user-profile.service';
import { GeocodeService } from './geocode.service';
import { FiltersService } from '../../../services/filter-service/filters.service';
import { OnInit, Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/app/services/toaster-service/toaster.service';
import { DiscountsService } from '../discounts.service';
import { Marker } from 'src/app/models/marker';
import { FavoritesService } from '../../favorites/favorites.service';
import * as _ from 'lodash';

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
  result: any;
  activeAddresses: Array<string>;
  userLocation: string;
  editingValue = this.data.favoriteNote;
  discountId: string = this.data.id;
  address = new FormControl();

  @ViewChild(AgmMap) map!: AgmMap;

  constructor(
    private geocodeService: GeocodeService,
    private discountService: DiscountsService,
    private toaster: ToasterService,
    public mapsApiLoader: MapsAPILoader,
    private userProfleService: UserProfileService,
    private filtersService: FiltersService,
    private favoriteService: FavoritesService,
    private matDialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.discountDetails = {
      tagsIds: [],
    };
    this.isViewCountsVisible = true;
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
  }

  submitEditNote(): void {
    this.favoriteService.addUpdateFavorite(this.discountId, this.editingValue, 'update').subscribe(
      () => {
        this.toaster.open('Information has been updated', 'success');
        this.matDialogRef.close(this.discountId);
      },
      (error) => {
        const errorMessage = error.error.errors.hasOwnProperty('Note') ? error.error.errors.Note[0] : 'Information hasn\'t been updated';
        this.toaster.open(errorMessage);
      }
    );
  }

  displayActiveMarkers(): void {
    this.markers = [];

    _.forEach(this.activeAddresses, address => {
      this.geocodeService.findLocation(address, (obj: Marker) => {
        this.markers.push(obj);
      });
    });

    setTimeout(() => {
      if (_.isEqual(_.size(this.markers), 1)) {
        this.location = this.markers[0];
        this.zoom = 14;
      } else if (_.size(this.markers) > 1) {
        this.location.lat = _.reduce(this.markers, (sum, marker) => sum + marker.lat, 0) / _.size(this.markers);
        this.location.lng = _.reduce(this.markers, (sum, marker) => sum + marker.lng, 0) / _.size(this.markers);
        this.zoom = 5;
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.discountService.getDiscountDetails(this.discountId).subscribe(
      (data) => {
        this.discountDetails = data;

        _.forEach(data.addresses, (item: { cityId: string; street: string; }) => {
          this.addresses.push(`${this.filtersService.getAddressByCityId(item.cityId)} ${item.street}`);
        });

        if (!_.isEqual(_.size(this.addresses), 0)) {
          this.geocodeService.findLocation(this.addresses[0], (obj: Marker) => {
            this.markers[0] = obj;
            this.location = obj;
          });
          this.activeAddresses[0] = this.addresses[0];
        } else {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              this.location.lat = position.coords.latitude;
              this.location.lng = position.coords.longitude;
              this.markers[0] = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
            });
          } else {
            this.userProfleService.getUser().subscribe(
              (user: { address: { cityId: string; street: string }; }) => {
                this.userLocation = `${this.filtersService.getAddressByCityId(user.address.cityId)} ${user.address.street}`;
                this.geocodeService.findLocation(this.userLocation, (obj: Marker) => {
                  this.location = obj;
                });
              },
              () => {
                this.toaster.open('Сan not get user location');
              }
            );
          }
        }

        if (_.size(data.links)) {
          this.links = Object.assign({}, ...data.links.map((link: any) => {
            return {
              [_.toLower(link.type)]: link.url
            };
          }));
        }
      },
      () => {
        this.toaster.open('Can not get discountId');
      }
    );
  }
}
