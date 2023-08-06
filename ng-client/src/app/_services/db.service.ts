import { Injectable } from '@angular/core';
import {NgForage} from "ngforage";
// @ts-ignore
import { v4 as uuid } from 'uuid';
// @ts-ignore
import {Part} from "../_data/part";
import {Supplier} from "../_data/supplier";
import {BaseEntity} from "../_data/base-entity";
import {Observable} from "rxjs";

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

  public find(id: string) {
    let tasks: any[] = [];
    this.objForEach(this, (k, v) => {
      if (v instanceof DataRepository) {
        tasks.push(v.find(id));
      }
    })
    return Promise.any(tasks)
  }
  objForEach<T>(obj: T, f: (k: keyof T, v: T[keyof T]) => void): void {
    for (let k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        f(k, obj[k]);
      }
    }
  }
}

export class DataRepository<T extends BaseEntity> {
  public readonly storeName!: string;
  constructor(private readonly forage: NgForage, storeName: string) {
    this.storeName = storeName;
  }
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
  public find(key: string): Promise<T | null> {
    return this.getItem(key);
  }
  public firstOrDefault(predicate: (value: T) => boolean) {
    this.setStore();

    return this.forage.iterate((data: T) => {
      if (predicate(data)) {
        return data;
      }
      return undefined;
    });
  }
  public where(predicate: (value: T) => boolean, maximumResults: number = -1) {
    this.setStore();

    return new Promise<T[]>((resolve, reject) => {
      let items: T[] = [];

      this.forage.iterate((data: T) => {
        if (items.length > maximumResults) return null;
        if (predicate(data)) {
          items.push(data);
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

  private setItem<T>(data: BaseEntity): Promise<BaseEntity | null>;
  private setItem<T>(data: BaseEntity, key: string): Promise<BaseEntity | null>;
  private setItem<T extends BaseEntity>(data: BaseEntity, key?: string): Promise<BaseEntity | null> {
    this.setStore();

    if (key) {
      data.id = key;
      return this.forage.setItem<BaseEntity>(data.id, data);
    }

    if (data.id) return this.forage.setItem<BaseEntity>(data.id, data);

    return this.forage.setItem<BaseEntity>(uuid(), data);
  }
}
