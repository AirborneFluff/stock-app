import {BaseEntity} from "../../_data/base-entity";
import {NgForage} from "ngforage";
// @ts-ignore
import { v4 as uuid } from 'uuid';

export abstract class DataRepository<T extends BaseEntity> {
  public readonly storeName!: string;
  constructor(protected readonly forage: NgForage, storeName: string) {
    this.storeName = storeName;
  }
  protected setStore(){
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
        if (items.length > maximumResults && maximumResults != -1) return null;
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

    data.id = uuid();
    return this.forage.setItem<BaseEntity>(data.id, data);
  }
}
