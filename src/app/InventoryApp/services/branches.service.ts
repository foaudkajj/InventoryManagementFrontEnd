import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Branch } from '../Models/Branch';

@Injectable()
export class BranchesService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  GetBranches(): Observable<any> {
    let result$ = this.get(`Branches/Get`);
    return result$;
  }

  // ModifyBranch(id: number, color: Branch): Observable<any> {
  //   let result$ = this.put(`Branches/${id}`, color);
  //   return result$;
  // }

  // AddBranches(colors: Branch[]): Observable<any> {
  //   let result$ = this.post(`Branches/Insert`, colors);
  //   return result$;
  // }

  DeleteBranch(id: number): Observable<any> {
    let result$ = this.delete(`Branches/Delete?Key=${id}`);
    return result$;
  }
}
