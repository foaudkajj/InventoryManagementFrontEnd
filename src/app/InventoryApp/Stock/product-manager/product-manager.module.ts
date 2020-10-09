import { NgModule } from '@angular/core';

import { ProductManagerRoutingModule } from './product-manager-routing.module';
import { ProductManagerComponent } from './product-manager.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ColorsService } from 'app/InventoryApp/services/Colors.service';
import { ProductService } from 'app/InventoryApp/services/products.service';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EticketTemplateComponent } from './eticket-template/eticket-template.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { DxBoxModule, DxDataGridModule, DxFormModule, DxTagBoxModule } from 'devextreme-angular';
import { DxStoreService } from 'app/InventoryApp/services/dx-store.service';
import { InventorySharedModule } from 'app/InventoryApp/inventory-shared.module';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [ProductManagerComponent, EticketTemplateComponent],
  imports: [
    InventorySharedModule,
    ProductManagerRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    NgxBarcodeModule,
    DxBoxModule,
    DxDataGridModule,
    MatGridListModule,
    DxTagBoxModule,
    DxFormModule
  ],
  providers: [ColorsService, ProductService, BranchesService, DxStoreService]
})
export class ProductManagerModule { }
