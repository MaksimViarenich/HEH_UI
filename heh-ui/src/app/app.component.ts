import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private translate: TranslateService, private route: ActivatedRoute ) {
    // translate.stream('header.admin').subscribe((val) => {
    //   console.log(val);
    // });
  }

  // changeLocalizationSubscriber(): void {
  //   this.route.queryParams.subscribe(params => {
  //     const lang = params.lang;
  //     this.translate.use(lang);
  //   });
  // }

  ngOnInit(): any {
    // this.changeLocalizationSubscriber();
  }
}
