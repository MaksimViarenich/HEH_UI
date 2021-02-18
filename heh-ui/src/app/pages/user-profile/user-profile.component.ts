import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { UserProfileService } from './user-profile.service';
import { UsersService } from '../admin/users/users.service';
import { UserInfo } from '../../models/user-info';
import { FiltersService } from '../../services/filter-service/filters.service';

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
              private userProfleService: UserProfileService,
              private toaster: ToasterService) {
    this.newslettersChecked = true;
    this.separatorKeysCodes = [ENTER, COMMA];
    this.location = '';
    this.allOptions = [];
    this.selectedOptions = [];
    this.categoryNotifications = [],
      this.tagNotifications = [],
      this.vendorNotifications = [],

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
    this.allOptions.categories.forEach((allCategories: any) => {
      if (this.categoryNotifications.indexOf(allCategories.id) === -1) {
        if (this.selectedOptions.indexOf(allCategories.id) !== -1) {
          this.categoryNotifications.push(allCategories.id);
        }
      }
    });
    this.allOptions.tags.forEach((allTags: any) => {
      if (this.tagNotifications.indexOf(allTags.id) === -1) {
        if (this.selectedOptions.indexOf(allTags.id) !== -1) {
          this.tagNotifications.push(allTags.id);
        }
      }
    });
    this.allOptions.vendors.forEach((allVendors: any) => {
      if (this.vendorNotifications.indexOf(allVendors.id) === -1) {
        if (this.selectedOptions.indexOf(allVendors.id) !== -1) {
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

    this.userProfleService.editProfile(userNotification).subscribe(
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

    this.userProfleService.getUser().subscribe(
      (data) => {
        this.user = data;
        this.location = this.filtersService.getAddressByCityId(data.address.cityId);
        this.selectedOptions = [...data.categoryNotifications, ...data.tagNotifications, ...data.vendorNotifications];
      },
      (error) => {
        this.toaster.open('Сan not get user profile');
      }
    );
  }
}
