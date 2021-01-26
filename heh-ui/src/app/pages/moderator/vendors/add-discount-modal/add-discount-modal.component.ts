import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Discount} from '../../../../models/discount';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { ViewChild } from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-discount-modal',
  templateUrl: './add-discount-modal.component.html',
  styleUrls: ['./add-discount-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddDiscountModalComponent implements OnInit {
  address = new FormControl();
  phone = new FormControl();
  isActive = false;

  vendors: string[] = [
    'Papa Johns', 'Pizza Tempo', 'Mango', 'Zara', 'Ronin', 'Sushi Vesla', 'KFC', 'Burger King',
  ];

  categories: string[] = [
    'Food', 'Clothes', 'Shop', 'Beauty', 'Sport', 'Car', 'Health', 'Education',
  ];

  discount: Discount = {
    vendor: 'Domino\'s Pizza',
    title: 'Buy our tasty pizza with 10% discount',
    category: 'Food',
    tags: ['Pizza'],
    description: 'Discount available 24/7 for all our pizzas. 10% for weekdays 15% for weekends',
    addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
      'Belarus, Minsk, Lenina street, 25',
      'Belarus, Minsk, Sverdlova street, 1a',
      'Belarus, Minsk, Skryganova street, 48',
      'Belarus, Minsk, Molodezhnaya street, 11',
      'Belarus, Minsk, Esenina street, 5'],
    website: 'https://www.dominos.by',
    phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
    workingHours: '06:00 - 23:00',
    validity: new Date(2021, 11, 31),
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    vk: 'https://vk.com/',
  };

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

  constructor() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
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
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }


  ngOnInit(): void {
  }

}
