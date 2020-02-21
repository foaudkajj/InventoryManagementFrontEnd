import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTypeSelectingPageComponent } from './user-type-selecting-page.component';


const routes: Routes = [
  {
    path: '',
    component: UserTypeSelectingPageComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTypeSelectingPageRoutingModule { }
