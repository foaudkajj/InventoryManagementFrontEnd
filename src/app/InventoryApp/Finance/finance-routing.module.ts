import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'transactionaccount', loadChildren: () => import('./TransactionAccount/transaction-account.module').then(m => m.TransactionAccountModule) },
  { path: 'transactioncard', loadChildren: () => import('./TransactionCard/transaction-card.module').then(m => m.TransactionCardModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
