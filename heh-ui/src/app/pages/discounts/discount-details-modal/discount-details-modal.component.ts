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
import {ModalService} from '../../../services/modal-service/modal.service'
import { forEach, isEqual, size, cloneDeep, reduce, toLower, assign } from 'lodash';

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
  pristineEditingValue = cloneDeep(this.editingValue);
  discountId: string = this.data.id;
  address = new FormControl();

  @ViewChild(AgmMap) map!: AgmMap;

  constructor(
    private geocodeService: GeocodeService,
    private discountService: DiscountsService,
    private toaster: ToasterService,
    public mapsApiLoader: MapsAPILoader,
    private userProfileService: UserProfileService,
    private filtersService: FiltersService,
    private favoriteService: FavoritesService,
    private modalService: ModalService,
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
    this.zoom = 12;
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

  checkChanges(): any {
    const isChanged = isEqual(this.data.favoriteNote, this.editingValue);
    const message = 'Are you sure you want to close the pop-up? Your changes will not be saved';
    if (!isChanged) {
      const dialogRef = this.modalService.openConfirmModal(message, 'Close');

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.matDialogRef.close('');
        }
      });
    } else {
      this.matDialogRef.close('');
    }
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

  canNotBeSaved(): boolean {
    return isEqual(this.editingValue, this.pristineEditingValue);
  }

  displayActiveMarkers(): void {
    this.markers = [];

    forEach(this.activeAddresses, address => {
      this.geocodeService.findLocation(address, (obj: Marker) => {
        this.markers.push(obj);
      });
    });

    setTimeout(() => {
      if (isEqual(size(this.markers), 1)) {
        this.location = this.markers[0];
        this.zoom = 12;
      } else if (size(this.markers) > 1) {
        this.location.lat = reduce(this.markers, (sum, marker) => sum + marker.lat, 0) / size(this.markers);
        this.location.lng = reduce(this.markers, (sum, marker) => sum + marker.lng, 0) / size(this.markers);
        this.zoom = 5;
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.matDialogRef.backdropClick().subscribe(() => {
      this.checkChanges();
    });
    this.discountService.getDiscountDetails(this.discountId).subscribe(
      (data) => {
        this.discountDetails = data;

        forEach(data.addresses, (item: { cityId: string; street: string; }) => {
          this.addresses.push(`${this.filtersService.getAddressByCityId(item.cityId)} ${item.street}`);
        });

        if (!isEqual(size(this.addresses), 0)) {
          this.geocodeService.findLocation(this.addresses[0], (obj: Marker) => {
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
            this.userProfileService.getUser().subscribe(
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

        if (size(data.links)) {
          this.links = assign({}, ...data.links.map((link: any) => {
            return {
              [toLower(link.type)]: link.url
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
