import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { UserProfileService } from './user-profile.service';
import { UsersService } from '../admin/users/users.service';
import { UserInfo } from '../../models/user-info';
import { FiltersService } from '../../services/filter-service/filters.service';
import { isEqual, indexOf, forEach } from 'lodash';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UserProfileComponent implements OnInit {
  newslettersChecked: boolean;
  filtersOptions: any;
  user: UserInfo | any;
  userPhoto: any;
  location: string;
  separatorKeysCodes: number[];
  allOptions: any;
  selectedOptions: Array<any>;
  categoryNotifications: Array<any>;
  tagNotifications: Array<any>;
  vendorNotifications: Array<any>;

  @ViewChild('auto') matAutocomplete: MatAutocomplete | undefined;

  constructor(public translate: TranslateService,
              private usersService: UsersService,
              private filtersService: FiltersService,
              private userProfileService: UserProfileService,
              private toaster: ToasterService) {
    this.newslettersChecked = true;
    this.separatorKeysCodes = [ENTER, COMMA];
    this.location = '';
    this.allOptions = [];
    this.selectedOptions = [];
    this.categoryNotifications = [];
    this.tagNotifications = [];
    this.vendorNotifications = [];

    this.filtersOptions = {
        locations: [],
        categories: [],
        tags: [],
        vendors: []
      };
    this.user = {
      id: '',
      role: '',
      name: '',
      email: '',
      address: {
        id: '',
        countryId: '',
        cityId: '',
        street: '',
      },
      isActive: false,
    };
  }

  getNotifications(): void {
    forEach(this.allOptions.categories, (allCategories: any) => {
      if (indexOf(this.categoryNotifications, isEqual((allCategories.id), -1))) {
        if (!isEqual(indexOf(this.selectedOptions, allCategories.id), -1)) {
          this.categoryNotifications.push(allCategories.id);
        }
      }
    });
    forEach(this.allOptions.tags, (allTags: any) => {
      if (isEqual(indexOf(this.tagNotifications, allTags.id), -1)) {
        if (!isEqual(indexOf(this.selectedOptions, allTags.id), -1)) {
          this.tagNotifications.push(allTags.id);
        }
      }
    });
    forEach(this.allOptions.vendors, (allVendors: any) => {
      if (isEqual(indexOf(this.vendorNotifications, allVendors.id), -1)) {
        if (!isEqual(indexOf(this.selectedOptions, allVendors.id), -1)) {
          this.vendorNotifications.push(allVendors.id);
        }
      }
    });
  }

  saveProfile(): void {
    this.getNotifications();

    const userNotification = {
      categoryNotifications: this.categoryNotifications,
      tagNotifications: this.tagNotifications,
      vendorNotifications: this.vendorNotifications,
      newVendorNotificationIsOn: this.user.newVendorNotificationIsOn,
      newDiscountNotificationIsOn: this.user.newDiscountNotificationIsOn,
      hotDiscountsNotificationIsOn: this.user.hotDiscountsNotificationIsOn,
      allNotificationsAreOn: this.user.allNotificationsAreOn
    };

    this.userProfileService.editProfile(userNotification).subscribe(
      (data) => {
        this.toaster.open('Profile was updated', 'success');
      },
      (error) => {
        this.toaster.open('Update issue was occurred');
      }
    );
  }

  ngOnInit(): void {
    this.filtersService.loadFilters().then(() => {
      this.filtersOptions = this.filtersService.getFilters();
      this.allOptions = {
        categories: [...this.filtersOptions.categories],
        tags: [...this.filtersOptions.tags],
        vendors: [...this.filtersOptions.vendors],
      };
    });

    this.userProfileService.getUser().subscribe(
      (data) => {
        this.user = data;
        this.location = this.filtersService.getAddressByCityId(data.address.cityId);
        this.selectedOptions = [...data.categoryNotifications, ...data.tagNotifications, ...data.vendorNotifications];
      },
      (error) => {
        this.toaster.open('Сan not get user profile');
      }
    );

    this.userProfileService.getUserProfilePhoto().subscribe(
      (data) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.userPhoto = reader.result;
        }, false);

        if (data) {
          reader.readAsDataURL(data);
        }
      },
      (error) => {
        this.toaster.open('Сan not get user photo');
      }
    );
  }
}
