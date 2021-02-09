import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSellingDto } from '../Models/DTOs/ProductSellingDTO';
import { RefundProductsDto } from '../Models/DTOs/RefundProductsDto';
import { SaleDetailsAndProductDto } from '../Models/DTOs/SaleDetailsAndProductDto';
import { ChangeProductDto } from '../Models/DTOs/ChangeProductDto';

@Injectable({
  providedIn: 'root'
})
export class NormalSatisService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  GetProductDetails(ProductBarcode: string): Observable<any> {
    let result$ = this.get(`NormalSatis/GetProductDetails/${ProductBarcode}`);
    return result$;
  }

  SellProducts(productSellingDto: ProductSellingDto): Observable<any> {
    let result$ = this.post(`NormalSatis/SellProducts`, productSellingDto);
    return result$;
  }

  GetSoledProductsByUserID(UserId: number, StartDate?: string, EndDate?: string): Observable<any> {
    let result$;
    if (!StartDate)
      result$ = this.get(`NormalSatis/GetSelledProductsByUserId/${UserId}`);
    else
      result$ = this.get(`NormalSatis/GetSelledProductsByUserId/${UserId}/${StartDate}/${EndDate}`);
    return result$;
  }

  RefundProducts(refundProductsDto: RefundProductsDto): Observable<any> {
    let result$ = this.post(`NormalSatis/RefundProducts`, refundProductsDto);
    return result$;
  }

  ChangeProducts(changeProductDto: ChangeProductDto): Observable<any> {
    let result$ = this.post(`NormalSatis/ChangeProducts`, changeProductDto);
    return result$;
  }

}
