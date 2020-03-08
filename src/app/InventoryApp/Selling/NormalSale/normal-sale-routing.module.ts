import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NormalSaleComponent } from './normal-sale.component';


const routes: Routes = [
  { path: '', component: NormalSaleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NormalSaleRoutingModule { }
