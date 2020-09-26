import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'masterdata', loadChildren: () => import('./master-data/master-data.module').then(m => m.MasterDataModule) },
  { path: 'productmanagement', loadChildren: () => import('./product-manager/product-manager.module').then(m => m.ProductManagerModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
