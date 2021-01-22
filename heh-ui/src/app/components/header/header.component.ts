import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class HeaderComponent implements OnInit {
  ngOnInit() {
  }

  constructor(private router: Router) { }

  goToPerson() {
    this.router.navigate(['/profile']);
  }
  goTodiscounts(){
    this.router.navigate(['/discounts']);
  }
  goToLogout() {
    let logout = confirm("Do you really want to go out ?");
   
    if(logout===true){
      this.router.navigate(['/discounts']);
    }
    else{
      return
    }
  }
}
