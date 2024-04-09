import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _bannerDetailsImageUrl = new BehaviorSubject<string>('');
  private _formStructure = new BehaviorSubject<any>('');
  private _tokenImage = new BehaviorSubject<any>('');
  public bannerDetailsImageUrl = this._bannerDetailsImageUrl.asObservable();
  public formStructure = this._formStructure.asObservable();
  public tokenImage = this._tokenImage.asObservable();

  constructor() {}

  setData(data: string) {
    this._bannerDetailsImageUrl.next(data);
  }

  setFormStructure(data: any) {
    this._formStructure.next(data);
  }

  setTokenImage(file: File) {
    this._tokenImage.next(file);
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
}