import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterDataComponent } from './master-data.component';


const routes: Routes = [
  { path: '', component: MasterDataComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
