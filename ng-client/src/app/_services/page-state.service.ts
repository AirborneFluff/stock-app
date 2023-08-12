import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {
  private _store: any = {};

  constructor() { }

  public storeProperty(owner: string, propertyName: string, value: any) {
    if (propertyName.includes('|') || owner.includes('|')) return false;
    this._store[`${owner}|${propertyName}`] = value;
    return true;
  }

  public retreiveProperty(owner: string, propertyName: string) {
    return this._store[`${owner}|${propertyName}`];
  }
}
