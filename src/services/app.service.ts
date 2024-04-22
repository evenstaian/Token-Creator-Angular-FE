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
    apiTokenUrl = Constants.API_TOKEN_URL
    apiEventsUrl = Constants.API_EVENTS_URL

    //Endpoints
    _tokenSubscribe = 'tokenSubscribe';
    _getMyTokens = 'getMyTokens';
    _getActionProcess = 'getActionProcess';
    _createERC20 = 'createERC20';
    _createERC721 = 'createERC721';
    _mintERC20 = 'mintERC20Tokens';
    _transferERC20 = 'transferERC20Tokens';
    _burnERC20 = 'burnERC20Tokens';


    constructor(private http: HttpClient, private errorHandler: HttpErrorHandler ){
    }

    private getAuthTokenHeader(): HttpHeaders {
        const authToken = localStorage.getItem('auth_token');
        return new HttpHeaders({
            'Authorization': authToken ? authToken : ''
        });
    }

    private performRequest(method: RestMethods, endpoint: string, body?: any): Observable<any> {
        const httpOptionsWithAuthToken = {
            headers: this.getAuthTokenHeader()
        };

        let requestObservable: Observable<any>;
        let moduleString: string = "/"

        switch (method) {
            case RestMethods.POST:
                requestObservable = this.http.post(`${this.apiTokenUrl}${moduleString}${endpoint}`, body, httpOptionsWithAuthToken);
                break;
            case RestMethods.GET:
                requestObservable = this.http.get(`${this.apiTokenUrl}${moduleString}${endpoint}`, httpOptionsWithAuthToken);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        return requestObservable.pipe(
            catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
        );
    }

    private performEvents(endpoint: string): any {
        return new Observable(subscriber => {
            const url = `${this.apiEventsUrl}/${endpoint}`;
            const eventSource = new EventSource(url);
        
            eventSource.onmessage = event => {
                console.log(event)
              const data = JSON.parse(event.data);
              console.log('Evento recebido:', data);
              if (data.status == "CONFIRMED") {
                subscriber.next(data);
                eventSource.close();
                subscriber.complete();
              }
            };
        
            eventSource.onerror = error => {
              console.error('Erro na conexão do Server-Sent Events:', error);
              eventSource.close();
              subscriber.error(error);
            };
        
            // Função de teardown: será chamada quando o Observable for desinscrito
            return () => {
              eventSource.close();
            };
          });
    }

    public tokenSubscribe(hashId: string): Observable<Object | null>{
        return this.performEvents(`${this._tokenSubscribe}/${hashId}`);
    }

    public getMyTokens(): Observable<Object | null>{
        return this.performRequest(RestMethods.POST, this._getMyTokens);
    }

    public getActionProcess(hashId: string): Observable<Object | null>{
        return this.performRequest(RestMethods.GET, `${this._getActionProcess}/${hashId}`);
    }

    public createERC20(network: string, form: any, imageFile?: File): Observable<Object | null>{
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('network', network);
        formData.append('form', JSON.stringify(form));

        return this.performRequest(RestMethods.POST, this._createERC20, formData);
    }

    public createERC721(network: string, form: any, imageFile?: File): Observable<Object | null>{
    const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('network', network);
        formData.append('form', JSON.stringify(form));

        return this.performRequest(RestMethods.POST, this._createERC721, formData);
    }

    public interactERC20(tokenHashId: string, actionType: string, form: any): Observable<Object | null> {
        const opEndpoint = () => {
            switch (actionType) {
                case "MINT":
                    return this._mintERC20;
                case "TRANSFER":
                    return this._transferERC20;
                case "BURN":
                    return this._burnERC20;
                default:
                    break;
            }
        }
        return this.performRequest(RestMethods.POST, `${opEndpoint()}/${tokenHashId}`, { form });
    }

}