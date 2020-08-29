import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", redirectTo: "stock", pathMatch: "full" },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'stock',
    loadChildren: () => import('./Stock/stock.module').then(m => m.StockModule),
  },
  {
    path: 'selling',
    loadChildren: () => import('./Selling/selling.module').then(m => m.SellingModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryAppRoutingModule { }
