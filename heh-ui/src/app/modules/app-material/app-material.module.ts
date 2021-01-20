import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
  ],
  imports: [],
  providers: []
})
export class AppMaterialModule {
}