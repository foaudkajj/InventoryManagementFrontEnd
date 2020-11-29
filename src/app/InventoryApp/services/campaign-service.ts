import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Color } from '../Models/Color';
import { CampaignDto } from '../Models/CampaignDto';

@Injectable()
export class CampaignService extends BaseService {
    constructor(httpClient: HttpClient, router: Router) {
        super(httpClient, router);
    }

    GetCampaigns(): Observable<any> {
        let result$ = this.get(`Campaign/Get`);
        return result$;
    }

    AddCampaign(colors: CampaignDto[]): Observable<any> {
        let result$ = this.post(`Campaign/Insert`, colors);
        return result$;
    }

    DeleteCampaign(id: number): Observable<any> {
        let result$ = this.post(`Campaign/Delete?Key=${id}`, {});
        return result$;
    }
}