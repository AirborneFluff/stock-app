import { Injectable } from '@angular/core';
import {NgForage} from "ngforage";
// @ts-ignore
import {Part} from "../_data/part";
import seedPartData from "../../assets/seed-data-parts.json";
import seedSupplierData from "../../assets/seed-data-suppliers.json";
import {StockLevel} from "../_data/stock-level";
import {SupplierRepository} from "./repositories/supplier-repository";
import {PartRepository} from "./repositories/part-repository";
import {DataRepository} from "./repositories/data-repository";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private readonly dbName: string = 'stockApp';
  public parts!: PartRepository;
  public suppliers!: SupplierRepository;

  constructor(private readonly forage: NgForage) {
    forage.name = this.dbName;
    this.parts = new PartRepository(forage, 'parts');
    this.suppliers = new SupplierRepository(forage, 'suppliers');
  }

  public useSeedData() {
    return new Promise((resolve) => {
      this.parts.clearData().then(() => {
        let tasks: any = [];
        seedSupplierData.forEach(supplier => {
          tasks.push(this.suppliers.add(supplier));
        })

        seedPartData.forEach(part => {
          let stockLevels: StockLevel[] = [];
          part.stockLevels.forEach(val => {
            stockLevels.push({
              quantity: val.quantity,
              date: new Date(val.date)
            })
          })
          const newPart: Part = {
            category: part.category,
            description: part.description,
            id: part.id,
            sku: part.sku,
            stockLevels: stockLevels,
            supplySources: part.supplySources,
            stockLocation: part.stockLocation
          }
          tasks.push(this.parts.add(newPart));
        })

        Promise.all(tasks).then(() => {
          resolve(true);
        });
      });
    })
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
