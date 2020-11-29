import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoledProductsComponent } from './soled-products.component';

const routes: Routes = [
  { path: '', component: SoledProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoledProductsRoutingModule { }
