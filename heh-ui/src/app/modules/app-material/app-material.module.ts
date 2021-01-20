import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule
  ],
  imports: [],
  providers: []
})
export class AppMaterialModule {
}
