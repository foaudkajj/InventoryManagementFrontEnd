import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Color } from '../Models/Color';

@Injectable()
export class ColorsService extends BaseService {
	constructor(httpClient: HttpClient, router: Router) {
		super(httpClient, router);
	}

	GetColors(): Observable<any> {
		let result$ = this.get(`Colors/Get`);
		return result$;
	}
	// GetColor(id: number): Observable<any> {
	// 	let result$ = this.get(`Colors/${id}`);
	// 	return result$;
	// }

	// ModifyColor(id:number, color:Color): Observable<any> {
	// 	let result$ = this.put(`Colors/${id}`,color);
	// 	return result$;
	// }

	AddColors(colors: Color[]): Observable<any> {
		let result$ = this.post(`Colors/Insert`, colors);
		return result$;
	}

	DeleteColor(id: number): Observable<any> {
		let result$ = this.post(`Colors/Delete?Key=${id}`, {});
		return result$;
	}
}