import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", redirectTo: "stock", pathMatch: "full" },
  {
    path: 'stock',
    loadChildren: () => import('./Stock/stock.module').then(m => m.StockModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryAppRoutingModule { }
