import { Injectable } from "@angular/core"
import { HttpClient, HttpParams} from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-handle-error.service';
import { Constants } from "../utils/Constantes";

@Injectable()
export class Requests {
    apiUrl = Constants.API_URL;

    //ENDPOINTS
    create_bond = `bonds/create`;
    pricing = `bonds/pricing`;
    balance = `balance/rt`;

    auth_token = localStorage.getItem('auth_token');

    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('AuthService');
    }

    public getHttpOptions() {
        let auth_token = localStorage.getItem('auth_token');
        var httpOptions
        return httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }

    public getBalance(): any {
        var httpOptions = this.getHttpOptions()
        return this.http.get<any>(`${this.apiUrl}${this.balance}`, httpOptions)
    }

    public createBond(bondData: any): any {
        console.log(`${this.apiUrl}${this.create_bond}`, bondData)
        var httpOptions = this.getHttpOptions()
        return this.http.post<any>(`${this.apiUrl}${this.create_bond}`, bondData, httpOptions)
    }

    public pricingBond(bondData: any): Observable<Object | null> {
        console.log(`${this.apiUrl}${this.pricing}`, bondData)
        var httpOptions = this.getHttpOptions()
        return this.http.post<any>(`${this.apiUrl}${this.pricing}`, bondData, httpOptions)
    }
}