import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class InventorySharedModule { }
