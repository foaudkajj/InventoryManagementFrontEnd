import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTypeSelectingPageRoutingModule } from './user-type-selecting-page-routing.module';
import { UserTypeSelectingPageComponent } from './user-type-selecting-page.component';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [UserTypeSelectingPageComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatGridListModule,
    UserTypeSelectingPageRoutingModule
  ]
})
export class UserTypeSelectingPageModule { }
