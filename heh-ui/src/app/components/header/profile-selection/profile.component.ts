import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../../../models/user-info';
import { ProfileService } from './profile.service';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { FiltersService } from '../../../services/filter-service/filters.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProfileComponent implements OnInit {

  user: UserInfo;
  location: string;

  constructor(private router: Router,
              private profileService: ProfileService,
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
    this.router.navigate(['/login']);
  }

  ngOnInit(): any {
    this.profileService.getUser().subscribe(
      (data) => {
        this.user = data;
        this.location = this.filtersService.getAddressByCityId(data.address.cityId);
        sessionStorage.setItem('location', data.address.cityId);
      },
      () => {
        this.toaster.open('Сan not get user profile');
      }
    );
  }
}
