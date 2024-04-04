import { Injectable, NgModule } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http'

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-handle-error.service';
import { Constants } from "../utils/Constantes";

enum RestMethods {
    POST = 'POST',
    GET = 'GET',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

@Injectable()
export class Auth {

    apiUrl = Constants.API_URL
    apiUrlImg = "//Constants.API_IMAGENS"

    //Endpoints
    _preLogin = 'pre_login';
    _login = 'login';
    _logout = 'logout';

    constructor(private http: HttpClient){
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
        let errorMessage = 'An unknown error occurred';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            switch (error.status) {
                case 400:
                    return throwError(error.error.error);
            }
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

    private getAuthTokenHeader(): HttpHeaders {
        const authToken = localStorage.getItem('auth_token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': authToken ? authToken : ''
        });
    }

    private performRequest(method: RestMethods, endpoint: string, body: any): Observable<any> {
        const httpOptionsWithAuthToken = {
            headers: this.getAuthTokenHeader()
        };

        let requestObservable: Observable<any>;
        let moduleString: string = "/login/"

        switch (method) {
            case RestMethods.POST:
                requestObservable = this.http.post(`${this.apiUrl}${moduleString}${endpoint}`, body, httpOptionsWithAuthToken);
                break;
            case RestMethods.GET:
                requestObservable = this.http.get(`${this.apiUrl}${moduleString}${endpoint}`, httpOptionsWithAuthToken);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        return requestObservable.pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    public preLogin(email: string, password: string): Observable<Object | null>{
        return this.performRequest(RestMethods.POST, this._preLogin, { email, password });
    }

    public login(identifier: string, password: string, otpCode: string): Observable<Object | null>{
        return this.performRequest(RestMethods.POST, this._login, { identifier, password, otpCode });
    }

}