import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-normal-sale',
  templateUrl: './normal-sale.component.html',
  styleUrls: ['./normal-sale.component.scss'],
})
export class NormalSaleComponent implements OnInit, AfterViewInit {

  tabs: any[] = [];
  constructor(public _translate: TranslateService) {

    this.tabs = [
      {
        id: 0,
        text: this._translate.instant("SELLING_MODULE.NORMAL_SALE.SALE"),
        icon: "fas fa-shopping-basket",
      },
      // {
      //   id: 1,
      //   text: this._translate.instant("SELLING_MODULE.NORMAL_SALE.RETURN"),
      //   icon: "fas fa-redo",
      // },
      {
        id: 2,
        text: this._translate.instant("SELLING_MODULE.NORMAL_SALE.CHANGE_RETURN"),
        icon: "fas fa-exchange-alt",
      }
    ];
  }

  ngOnInit() {


  }

  ngAfterViewInit() {

  }
  selectTab(e) {
    console.log(e)
  }


}
