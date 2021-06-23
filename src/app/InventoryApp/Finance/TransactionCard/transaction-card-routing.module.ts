import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionCardComponent } from './transaction-card.component';

const routes: Routes = [
  { path: '', component: TransactionCardComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionCardRoutingModule { }
