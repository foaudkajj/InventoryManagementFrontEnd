import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'usermanagement', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule) },
  { path: 'rolemanagement', loadChildren: () => import('./role-management/role-management.module').then(m => m.RoleManagementModule) },
  { path: 'soledproducts', loadChildren: () => import('./soled-products/soled-products.module').then(m => m.SoledProductsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
