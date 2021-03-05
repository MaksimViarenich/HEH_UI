import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { UsersService } from '../../pages/admin/users/users.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UserCardComponent implements OnInit {

  @Input() user: any;
  userPhoto: any;

  color: ThemePalette = 'primary';
  isActive: boolean | undefined;
  role: string | undefined;

  constructor(private usersService: UsersService,
              private toaster: ToasterService) {
    this.role = '';
    this.userPhoto = '';
  }

  setUserPhotoAdmin(userId: string): void {
    this.usersService.getUserPhotoAdmin(userId).subscribe((data: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        this.userPhoto = reader.result;
      };
    },
    (error: any) => {
      this.toaster.open('Could not get user photo');
    });
  }

  changeUserRole(value: string): void {
    this.usersService.changeRole(this.user.id, value).subscribe(
      (data) => {
        this.toaster.open('User role was changed', 'success');
      },
      (error) => {
        this.toaster.open('Couldn\'t change role');
      });
  }

  changeUserState(): void {
    this.usersService.changeState(this.user.id, this.isActive).subscribe(
      (data) => {
        this.toaster.open('User state was changed', 'success');
      },
      (error) => {
        this.toaster.open('Couldn\'t change state');
      });
  }

  ngOnInit(): void {
    this.setUserPhotoAdmin(this.user.id);
    this.isActive = this.user?.isActive;
    this.role = this.user?.role;
  }
}

