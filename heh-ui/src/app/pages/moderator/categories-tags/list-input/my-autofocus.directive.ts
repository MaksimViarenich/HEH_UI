import { AfterViewInit } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMyAutofocus]'
})

export class MyAutofocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void  {
    this.el.nativeElement.focus();
  }
}
