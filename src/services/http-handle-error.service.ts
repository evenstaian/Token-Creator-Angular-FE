import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';

import { Clean } from '../utils/clean';
import { Router } from '@angular/router';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(private rotas: Router, public negarAcesso: Clean) { }

  handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
    } else {
        switch (error.status) {
            case 400:
                return throwError(error.error.error);
            case 401:
              this.negarAcesso.cleanAll()
              this.rotas.navigate(['/login'])
              return throwError(error.error.error);
            case 410:
              return throwError({status: error.status, message: error.error.message})
        }
        errorMessage = error.error.message;
    }
    return throwError(errorMessage);
}

  getOutApplication() {
    this.negarAcesso.cleanAll()
    this.rotas.navigate(['/'])
  }

}