import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vendor-card',
  templateUrl: './vendor-card.component.html',
  styleUrls: ['./vendor-card.component.scss']
})
export class VendorCardComponent implements OnInit {
  @Input() data: any | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
