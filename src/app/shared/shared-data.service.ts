import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Controller } from '../Modules/Payment/pricing/pricing.controller';

interface NavigationFlow {
  contextRoute: string;
  nextPage: string;
  data: any;
  controller?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _userData = new BehaviorSubject<any>(null);
  private _tokenType = new BehaviorSubject<any>(null);
  private _bannerDetailsImageUrl = new BehaviorSubject<string>('');
  private _formStructure = new BehaviorSubject<any>('');
  private _tokenImage = new BehaviorSubject<any>('');
  private _createResponse = new BehaviorSubject<any>(null);
  private _navigationFlow = new BehaviorSubject<NavigationFlow>(null);
  public userData = this._userData.asObservable();
  public tokenType = this._tokenType.asObservable();
  public bannerDetailsImageUrl = this._bannerDetailsImageUrl.asObservable();
  public formStructure = this._formStructure.asObservable();
  public tokenImage = this._tokenImage.asObservable();
  public createResponse = this._createResponse.asObservable();
  public navigationFlow = this._navigationFlow.asObservable();

  constructor() {}

  setNavigationFlow(contextRoute: string, nextRoute: string, data: any, controller?: Controller){
    this._navigationFlow.next({
      contextRoute,
      nextPage: nextRoute,
      data,
      controller
    })
  }

  setUserData(userData: any) {
    this._userData.next(userData);
  }

  setTokenType(tokenType: any) {
    this._tokenType.next(tokenType);
  }

  setData(data: string) {
    this._bannerDetailsImageUrl.next(data);
  }

  setFormStructure(data: any) {
    this._formStructure.next(data);
  }

  setTokenImage(file: File) {
    this._tokenImage.next(file);
  }

  setCreateResponse(data: any) {
    this._createResponse.next(data);
  }

  getTokenType(){
    return this._tokenType.getValue();
  }

  getData() {
    return this._bannerDetailsImageUrl.getValue();
  }

  getFormStructure() {
    return this._formStructure.getValue();
  }

  getImageData() {
    return this._formStructure.getValue();
  }

  getResponseData() {
    return this._bannerDetailsImageUrl.getValue();
  }
}