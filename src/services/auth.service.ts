import { Injectable, NgModule } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-handle-error.service';
import { Constants } from "../utils/Constantes";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
     // 'Authorization': ''
    })
  };

@Injectable()
export class Auth {

    apiUrl = Constants.API_URL
    apiUrlImg = "//Constants.API_IMAGENS"

    //Endpoints
    pre_login = 'pre_login';
    login = 'login';
    logout = 'logout';

    private handleError: HandleError;

    public getHttpOptions(){
        let auth_token = localStorage.getItem('auth_token');
        var httpOptions
        return httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                //'Authorization': auth_token
            })
          };
    }

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
        this.handleError = httpErrorHandler.createHandleError('AuthService');
    }

    public preLoginAdmin(cpf: string, password: string): Observable<Object | null>{
        //console.log("entrou em admin", this.http.post(this.apiUrl+this.login, {cpf, password}))
        return this.http.post(this.apiUrl+this.pre_login, {cpf, password})
        .pipe(
            catchError(this.handleError('preloginPL', null))
        )
    }

    public loginAdmin(cpf: string, password: string, code: string): Observable<Object | null>{
        //console.log("entrou em admin", this.http.post(this.apiUrl+this.login, {cpf, password}))
        return this.http.post(this.apiUrl+this.login, {cpf, password, code})
        .pipe(
            catchError(this.handleError('loginPL', null))
        )
    }

}