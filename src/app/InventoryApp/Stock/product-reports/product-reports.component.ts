import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ReportUrls } from 'app/InventoryApp/Enums/ReportUrls';

@Component({
  selector: 'app-product-reports',
  templateUrl: './product-reports.component.html',
  styleUrls: ['./product-reports.component.scss']
})
export class ProductReportsComponent implements OnInit {
  ReportList = ['BestSellingProducts'];
  selectedReport = '';
  constructor(
    public _translate: TranslateService,
    private router: Router) { }

  ReportSelectBoxChanged(report) {
    this.selectedReport = report;
  }

  ShowReport() {
    let url = this.router.createUrlTree(['ReportViewer'], { queryParams: { ReportName: `${ReportUrls.BestSellingProducts}?` } })
    window.open('#' + url.toString(), '_blank')
  }

  ngOnInit(): void {
  }

}
