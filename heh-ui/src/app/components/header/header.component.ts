import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  ngOnInit() {

  }
  constructor(private router: Router) { }

  goToPerson() {
    this.router.navigate(['/person']);
  }

  goToLogout() {
    this.router.navigate(['/logout']);
  }
}
