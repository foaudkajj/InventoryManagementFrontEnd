import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
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
  },
  {
    path: 'finance',
    loadChildren: () => import('./Finance/finance.module').then(m => m.FinanceModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryAppRoutingModule { }
