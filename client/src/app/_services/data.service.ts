import { Injectable } from '@angular/core';
import {NgForage} from "ngforage";
// @ts-ignore
import { v4 as uuid } from 'uuid';
// @ts-ignore
import {Part} from "../_data/part";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly dbName: string = 'stockApp';
  public parts!: DataRepository<Part>;

  constructor(private readonly forage: NgForage) {
    forage.name = this.dbName;
    this.parts = new DataRepository(forage, 'parts');
  }
}

class DataRepository<T> {
  constructor(private readonly forage: NgForage, private readonly storeName: string) {}

  public clearData() {
    this.forage.storeName = this.storeName;

    return this.forage.clear();
  }

  public firstOrDefault(predicate: (value: T) => boolean) {
    this.forage.storeName = this.storeName;

    return this.forage.iterate((data: T, key: string) => {
      if (predicate(data)) {
        return [key, data];
      }
      return undefined;
    });
  }

  public where(predicate: (value: T) => boolean) {
    this.forage.storeName = this.storeName;

    return new Promise((resolve, reject) => {
      let items: [string, T][] = [];

      this.forage.iterate((data: T, key: string) => {
        if (predicate(data)) {
          items.push([key, data]);
        }
      }).then(() => {
        resolve(items);
      }).catch(() => {
        reject();
      })
    });
  }
  public getItem<T>(key: string): Promise<T | null> {
    this.forage.storeName = this.storeName;

    return this.forage.getItem<T>(key);
  }

  public setItem<T>(data: T): Promise<T | null>;
  public setItem<T>(data: T, key: string): Promise<T | null>;
  public setItem<T>(data: T, key?: string): Promise<T | null> {
    this.forage.storeName = this.storeName;

    if (key) {
      return this.forage.setItem<T>(key, data);
    }
    return this.forage.setItem<T>(uuid(), data);
  }
}
