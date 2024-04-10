import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants } from "../utils/Constantes";
import { RestMethods } from "./types/enum/RestMethods";
import { HttpErrorHandler } from "./http-handle-error.service";

@Injectable()
export class AppService {

    apiUrl = Constants.API_URL

    //Endpoints
    _createERC20 = 'createERC20';
    _createERC721 = 'createERC721';


    constructor(private http: HttpClient, private errorHandler: HttpErrorHandler ){
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
        let moduleString: string = "/app/"

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

    public createERC20(network: string, form: any, imageFile?: File): Observable<Object | null>{
        return this.performRequest(RestMethods.POST, this._createERC20, { network, form });
    }

    public createERC721(network: string, form: any, imageFile?: File): Observable<Object | null>{
        return this.performRequest(RestMethods.POST, this._createERC721, { network, form });
    }

}