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
  ReportList = [
    { Value: 'BestSellingProducts', Translate: 'STOCK_MODULE.PRODUCT_REPORTS.BEST_SELLING_PRODUCTS' },
    { Value: 'BestSellers', Translate: 'STOCK_MODULE.PRODUCT_REPORTS.BEST_SELLERS' },
    { Value: 'BestSellingCategories', Translate: 'STOCK_MODULE.PRODUCT_REPORTS.BEST_SELLING_CATEGORIES' },
    { Value: 'BestSellingColors', Translate: 'STOCK_MODULE.PRODUCT_REPORTS.BEST_SELLING_COLORS' },
    { Value: 'BestSellingSizes', Translate: 'STOCK_MODULE.PRODUCT_REPORTS.BEST_SELLING_TOP_TEN_SIZES' },
    { Value: 'MostProfitableProducts', Translate: 'STOCK_MODULE.PRODUCT_REPORTS.MOST_PROFITABLE_PRODUCTS' },
    { Value: 'LeastProfitableProducts', Translate: 'STOCK_MODULE.PRODUCT_REPORTS.LEAST_PROFITABLE_PRODUCTS' },
    { Value: 'BestSellingCategoriesByGender', Translate: 'STOCK_MODULE.PRODUCT_REPORTS.BEST_SELLING_CATEGORIES_BY_GENDER' },
    { Value: 'TotalProfitAccordingToCategoryAndGender', Translate: 'STOCK_MODULE.PRODUCT_REPORTS.TOTAL_PROFIT_CATEGORY_GENDER' },
    { Value: 'Eod', Translate: 'STOCK_MODULE.PRODUCT_REPORTS.EOD_REPORT' },

  ];
  selectedReport = '';
  constructor(
    public _translate: TranslateService,
    private router: Router) { }

  ReportSelectBoxChanged(report) {
    this.selectedReport = report;
  }

  ShowReport() {
    let url = this.router.createUrlTree(['ReportViewer'], { queryParams: { ReportName: `${this.selectedReport}?` } })
    window.open('#' + url.toString(), '_blank')
  }

  ngOnInit(): void {
  }

}
