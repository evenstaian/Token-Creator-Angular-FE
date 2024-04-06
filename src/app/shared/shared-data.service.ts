import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _bannerDetailsImageUrl = new BehaviorSubject<string>('');
  public bannerDetailsImageUrl = this._bannerDetailsImageUrl.asObservable();

  constructor() {}

  setData(data: string) {
    this._bannerDetailsImageUrl.next(data);
  }

  getData() {
    return this._bannerDetailsImageUrl.getValue();
  }
}