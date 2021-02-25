import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-event',
  templateUrl: './type-event.component.html',
  styleUrls: ['./type-event.component.scss']
})
export class TypeEventComponent implements OnInit {
  @Input() type: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
