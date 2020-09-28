import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ColorsService } from 'app/InventoryApp/services/Colors.service';
import { BranchesService } from 'app/InventoryApp/services/branches.service';
import { TranslateService } from '@ngx-translate/core';
import { PaymentMethodsService } from 'app/InventoryApp/services/payment-methods.service';
import { PaymentMethod } from 'app/InventoryApp/Models/PaymentMethod';
import { Color } from 'app/InventoryApp/Models/Color';
import { Branch } from 'app/InventoryApp/Models/Branch';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SwalService } from 'app/InventoryApp/services/Swal.Service';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {
  // Array contains placeholders we want to show.
  FormFieldsPlaceholder = [];
  MasterDatasFormGroup: FormGroup;
  MasterData: any;
  MDFormShow: boolean = null;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  formFields = [];
  message: string;
  // This is used to know the selected Master Data
  SelectedMDNumber: number;
  // This is used to specify the columns we need to show in the grid.
  displayedColumnsInGrid = ['actions'];
  // This is used to get an instance of the table.
  @ViewChild(MatTable, { static: false }) MDTable: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private fb: FormBuilder,
    private colorsService: ColorsService,
    private branchesService: BranchesService,
    public translate: TranslateService,
    private paymentService: PaymentMethodsService,
    private Swal: SwalService,
  ) {
  }

  ngOnInit() {
    this.MasterData = [{ Value: 0, ViewValue: this.translate.instant('STOCK_MODULE.MASTER_DATA.BRANCHES') },
    { Value: 1, ViewValue: this.translate.instant('STOCK_MODULE.MASTER_DATA.COLORS') },
    { Value: 2, ViewValue: this.translate.instant('STOCK_MODULE.MASTER_DATA.PAYMENT_METHODS') }]
  }



  MDChanged(value) {
    // The next line helps to prevent showing the form before assigning data to the form group
    this.MDFormShow = true;
    this.SelectedMDNumber = value;
    this.displayedColumnsInGrid = [];
    this.GetMDTableData();
    // Bransh
    if (value == 0) {
      this.MasterDatasFormGroup = this.fb.group({
        Name: ['', Validators.compose([
          Validators.required
        ])
        ],
        Location: ['', Validators.compose([
          Validators.required,
        ])],
      });
      this.FormFieldsPlaceholder = [this.translate.instant('STOCK_MODULE.MASTER_DATA.BRANCH_NAME'), this.translate.instant('STOCK_MODULE.MASTER_DATA.BRANCH_ADRES')];
      this.AssignForFieldsAndTableColumns(this.MasterDatasFormGroup.controls);
    }
    // Color
    else if (value == 1) {
      this.MasterDatasFormGroup = this.fb.group({
        ColorName: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(10)
        ])
        ],
        ShortenColor: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(10)
        ])],
      });
      this.FormFieldsPlaceholder = [this.translate.instant('STOCK_MODULE.MASTER_DATA.COLORS'), this.translate.instant('STOCK_MODULE.MASTER_DATA.COLORS_SHORTCODES')];
      this.AssignForFieldsAndTableColumns(this.MasterDatasFormGroup.controls);

    }

    // PaymentMethods
    else if (value == 2) {
      this.MasterDatasFormGroup = this.fb.group({
        PaymentName: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(10)
        ])
        ],
        PaymentType: ['', Validators.compose([
          // Validators.required,
          Validators.maxLength(10)
        ])],
      });
      this.FormFieldsPlaceholder = [this.translate.instant('STOCK_MODULE.MASTER_DATA.PAYMENT_NAME'), this.translate.instant('STOCK_MODULE.MASTER_DATA.PAYMENT_TYPE')];
      this.AssignForFieldsAndTableColumns(this.MasterDatasFormGroup.controls);

    }

  }

  AssignForFieldsAndTableColumns(controls) {
    this.formFields = Object.entries(controls);
    this.displayedColumnsInGrid = Object.keys(controls).concat('actions');
  }

  DataBeforeSentToServer = [];
  AddRowToMDTable() {
    if (!this.MasterDatasFormGroup.invalid) {
      let addObs: Observable<any> = null;

      // Bransh
      if (this.SelectedMDNumber == 0) {
        this.DataBeforeSentToServer.push({
          Name: this.MasterDatasFormGroup.controls.Name.value,
          Location: this.MasterDatasFormGroup.controls.Location.value,
        });
        addObs = this.branchesService.AddBranches(this.DataBeforeSentToServer)
      }
      // Color 
      else if (this.SelectedMDNumber == 1) {
        this.DataBeforeSentToServer.push({
          ColorName: this.MasterDatasFormGroup.controls.ColorName.value,
          ShortenColor: this.MasterDatasFormGroup.controls.ShortenColor.value,
        });
        addObs = this.colorsService.AddColors(this.DataBeforeSentToServer)
      }

      // Payment Method 
      else if (this.SelectedMDNumber == 2) {
        this.DataBeforeSentToServer.push({
          PaymentName: this.MasterDatasFormGroup.controls.PaymentName.value,
          PaymentType: this.MasterDatasFormGroup.controls.PaymentType.value || 0,
        });
        addObs = this.paymentService.AddPaymentMethods(this.DataBeforeSentToServer)
      }

      if (addObs) {
        addObs.toPromise().then(res => {
          if (this.SelectedMDNumber == 0) {
            this.message = this.translate.instant('Messages.SuccessMessage', { Item: this.MasterData[0].ViewValue })
          }
          else if (this.SelectedMDNumber == 1) {
            this.message = this.translate.instant('Messages.SuccessMessage', { Item: this.MasterData[1].ViewValue })
          }
          else if (this.SelectedMDNumber == 2) {
            this.message = this.translate.instant('Messages.SuccessMessage', { Item: this.MasterData[2].ViewValue })
          }
          this.Swal.showSuccessMessage(this.message)
        }).finally(() => this.GetMDTableData());
      }

    }


  }

  async DeleteFromMDTable(row: any) {
    let deleteObs: Observable<any> = null;
    let objToCast: any;
    // Bransh
    if (this.SelectedMDNumber == 0) {
      objToCast = row;
      let conforming = await this.Swal.showDeletingMessage()
      if (conforming.isConfirmed) {
        deleteObs = this.branchesService.DeleteBranch((<Branch>objToCast).Id);
        this.Swal.showDeletConforme()
      }
    }
    // Color
    else if (this.SelectedMDNumber == 1) {
      objToCast = row;
      let conforming = await this.Swal.showDeletingMessage()
      if (conforming.isConfirmed) {
        deleteObs = this.colorsService.DeleteColor((objToCast as Color).Id);
        this.Swal.showDeletConforme()
      }
    }
    // Payment Method
    else if (this.SelectedMDNumber == 2) {
      objToCast = row;
      let conforming = await this.Swal.showDeletingMessage()
      if (conforming.isConfirmed) {
        deleteObs = this.paymentService.DeletePaymentMethod((objToCast as PaymentMethod).Id);
        this.Swal.showDeletConforme()
      }
    }


    if (deleteObs) {
      deleteObs.toPromise().finally(() => this.GetMDTableData());
    }
  }


  GetMDTableData() {

    // Empty array for every Master Data Change
    this.DataBeforeSentToServer = [];

    let dataObs: Observable<any> = null;

    // Bransh
    if (this.SelectedMDNumber == 0) {
      dataObs = this.branchesService.GetBranches();
    } else
      // Color
      if (this.SelectedMDNumber == 1) {
        dataObs = this.colorsService.GetColors();
      }
      else
        // Payment Method
        if (this.SelectedMDNumber == 2) {
          dataObs = this.paymentService.GetPaymentMethods();
        }



    // Here we get the data for the selected Master Data and refresh the table
    if (dataObs) {
      dataObs.subscribe(result => {
        this.dataSource.data = result.data;
        // this.MDTable.renderRows();
      })
    } else {
      // Empty Table DataSource for every Master Data Change
      this.dataSource.data = [];
    }



  }

}
