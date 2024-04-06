import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _bannerDetailsImageUrl = new BehaviorSubject<string>('');
  private _formStructure = new BehaviorSubject<any>('');
  public bannerDetailsImageUrl = this._bannerDetailsImageUrl.asObservable();
  public formStructure = this._formStructure.asObservable();

  constructor() {}

  setData(data: string) {
    this._bannerDetailsImageUrl.next(data);
  }

  setFormStructure(data: any) {
    this._formStructure.next(data);
  }

  getData() {
    return this._bannerDetailsImageUrl.getValue();
  }

  getFormStructure() {
    return this._formStructure.getValue();
  }
}