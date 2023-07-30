import { Injectable } from '@angular/core';
import {NgForage} from "ngforage";
// @ts-ignore
import { v4 as uuid } from 'uuid';
// @ts-ignore
import {Part} from "../_data/part";
import {Supplier} from "../_data/supplier";
import {KeyValue} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private readonly dbName: string = 'stockApp';
  public parts!: DataRepository<Part>;
  public suppliers!: DataRepository<Supplier>;

  constructor(private readonly forage: NgForage) {
    forage.name = this.dbName;
    this.parts = new DataRepository(forage, 'parts');
    this.suppliers = new DataRepository(forage, 'suppliers');
  }
}

class DataRepository<T> {
  constructor(private readonly forage: NgForage, private readonly storeName: string) {}
  private setStore(){
    this.forage.storeName = this.storeName;
  }

  public clearData() {
    this.setStore();

    return this.forage.clear();
  }

  public remove(key: string) {
    this.setStore();

    return this.forage.removeItem(key);
  }
  public add(data: T) {
    this.setStore();

    return this.setItem(data);
  }
  public update(key: string, data: T) {
    this.setStore();

    return this.setItem(data, key);
  }
  public find(key: string) {
    return this.getItem(key);
  }
  public firstOrDefault(predicate: (value: T) => boolean) {
    this.setStore();

    return this.forage.iterate((data: T, key: string) => {
      if (predicate(data)) {
        return {
          key: key,
          data: data
        };
      }
      return undefined;
    });
  }
  public where(predicate: (value: T) => boolean, maximumResults: number = -1) {
    this.setStore();

    return new Promise<KeyValue<string, T>[]>((resolve, reject) => {
      let items: KeyValue<string, T>[] = [];

      this.forage.iterate((data: T, key: string) => {
        if (items.length > maximumResults) return null;
        if (predicate(data)) {
          items.push({
            key: key,
            value: data
          });
        }
        return undefined;
      }).then(() => {
        resolve(items);
      }).catch(() => {
        reject();
      })
    });
  }

  private getItem<T>(key: string): Promise<T | null> {
    this.setStore();

    return this.forage.getItem<T>(key);
  }

  private setItem<T>(data: T): Promise<T | null>;
  private setItem<T>(data: T, key: string): Promise<T | null>;
  private setItem<T>(data: T, key?: string): Promise<T | null> {
    this.setStore();

    if (key) {
      return this.forage.setItem<T>(key, data);
    }
    return this.forage.setItem<T>(uuid(), data);
  }
}
