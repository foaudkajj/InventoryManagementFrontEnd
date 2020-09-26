import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDto } from '../Models/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  GetProducts(): Observable<any> {
    let result$ = this.get(`Products`);
    return result$;
  }
  GetProduct(id: number): Observable<any> {
    let result$ = this.get(`Products/${id}`);
    return result$;
  }

  ModifyProduct(id: number, Product: ProductDto): Observable<any> {
    let result$ = this.put(`Products/${id}`, Product);
    return result$;
  }

  AddProducts(Products: ProductDto[]): Observable<any> {
    let result$ = this.post(`Products`, Products);
    return result$;
  }

  DeleteProduct(id: number): Observable<any> {
    let result$ = this.delete(`Products/${id}`);
    return result$;
  }

  IncreaseProductCount(ProductId: number, Count: number): Observable<any> {
    let result$ = this.get(`Products/IncreaseProductCount?ProductId=${ProductId}&Count=${Count}`);
    return result$;
  }

}
