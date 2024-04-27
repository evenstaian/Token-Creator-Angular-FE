import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler} from './http-handle-error.service';
import { Constants } from "../utils/Constantes";
import { RestMethods } from "./types/enum/RestMethods";

@Injectable()
export class Auth {

    apiUrl = Constants.API_URL
    apiUrlImg = "//Constants.API_IMAGENS"

    //Endpoints
    _preLogin = 'pre_login';
    _login = 'login';
    _preSignup = 'pre_signup';
    _signup = 'signup';
    _logout = 'logout';

    constructor(private http: HttpClient, private errorHandler: HttpErrorHandler){
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
        let moduleString: string = "/auth/"

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
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
    }

    public preLogin(identifier: string, password: string): Observable<Object | null>{
        return this.performRequest(RestMethods.POST, this._preLogin, { identifier, password });
    }

    public login(identifier: string, password: string, otpCode: string): Observable<Object | null>{
        return this.performRequest(RestMethods.POST, this._login, { identifier, password, otpCode });
    }

    public preSignup(email: string, password: string): Observable<Object | null>{
        return this.performRequest(RestMethods.POST, this._preSignup, { email, password });
    }

    public signup(email: string, password: string, name: string, otpCode: string): Observable<Object | null>{
        return this.performRequest(RestMethods.POST, this._signup, { email, name, password, otpCode });
    }

}