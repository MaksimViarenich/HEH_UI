import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../../../models/user-info';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { FiltersService } from '../../../services/filter-service/filters.service';
import { UserProfileService } from '../../../pages/user-profile/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProfileComponent implements OnInit {

  user: UserInfo;
  userPhoto: any;
  location: string;

  constructor(private router: Router,
              private userProfileService: UserProfileService,
              private filtersService: FiltersService,
              private toaster: ToasterService) {
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
    this.location = '';
  }


  goToPerson(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('expDate');
    sessionStorage.removeItem('userPhoto');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('location');
    this.router.navigate(['/login']);
  }

  ngOnInit(): any {
    this.userProfileService.getUser().subscribe(
      (data) => {
        this.user = data;
        this.location = this.filtersService.getAddressByCityId(data.address.cityId);
        sessionStorage.setItem('userEmail', data.email);
        sessionStorage.setItem('location', data.address.cityId);
      },
      () => {
        this.toaster.open('Сan not get user profile');
      }
    );

    this.userProfileService.getUserProfilePhoto().subscribe(
      (data) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.userPhoto = reader.result;
          sessionStorage.setItem('userPhoto', this.userPhoto);
        }, false);

        if (data) {
          reader.readAsDataURL(data);
        }
      },
      () => {
        this.toaster.open('Сan not get user photo');
      }
    );
  }
}
