import {TranslateService} from '@ngx-translate/core';
import {Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, Input} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ToasterService} from '../../services/toaster-service/toaster.service';
import {UserProfileService} from './user-profile.service';
import {UsersService} from '../admin/users/users.service';
import {UserInfo} from '../../models/user-info';
import {Tag} from '../../models/tag';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  newslettersChecked = false;
  disabled = true;

  user: UserInfo;

  typesOfSubscription: string[] = ['profile.service', 'profile.vendors', 'profile.city', 'profile.hot_sales'];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = ['Food'];
  allTags: string[] = ['Food', 'Beauty', 'Domino\'s Pizza', 'Sushi', 'Sport', 'H&M'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('auto') matAutocomplete: MatAutocomplete | undefined;

  constructor(public translate: TranslateService,
              private usersService: UsersService,
              private userProfleService: UserProfileService,
              private toaster: ToasterService) {
    this.user = {
      id: '',
      role: '',
      name: '',
      email: '',
      address: [],
      isActive: false,
      tagNotifications: [],
    };
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    // @ts-ignore
    this.tagInput.nativeElement.id = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
    this.userProfleService.getUser().subscribe(
      (data) => {
        this.user = data;
        console.log(data);
      },
      (error) => {
        this.toaster.open('Сan not get user profile');
      }
    );
  }
}
