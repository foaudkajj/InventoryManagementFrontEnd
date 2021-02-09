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
import { NgxBarcodeModule } from 'ngx-barcode';
import { DxBoxModule, DxButtonModule, DxDataGridModule, DxFormModule, DxSelectBoxModule, DxTagBoxModule } from 'devextreme-angular';
import { InventorySharedModule } from 'app/InventoryApp/inventory-shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { CampaignApplyingScreenComponent } from './components/campaignApplying/campaign-applying-screen.component';
import { EticketTemplateComponent } from './components/eticket-template/eticket-template.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CampaignService } from 'app/InventoryApp/services/campaign-service';

@NgModule({
  declarations: [ProductManagerComponent, EticketTemplateComponent, CampaignApplyingScreenComponent, CampaignApplyingScreenComponent],
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
    DxFormModule,
    DxSelectBoxModule,
    MatDialogModule,
    DxButtonModule
  ],
  providers: [ColorsService, ProductService, BranchesService, CampaignService]
})
export class ProductManagerModule { }
