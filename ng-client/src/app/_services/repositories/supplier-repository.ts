import {Supplier} from "../../_data/supplier";
import {DataRepository} from "./data-repository";

export class SupplierRepository extends DataRepository<Supplier> {
  public get supplierNames() {
    this.setStore();

    return new Promise<string[]>((resolve, reject) => {
      let items: string[] = [];

      this.forage.iterate((data: Supplier) => {
        items.push(data.name);
      }).then(() => {
        resolve(items);
      }).catch(() => {
        reject();
      })
    });
  }
}

//
// constructor(forage: NgForage, storeName: string) {
//   super(forage, storeName);
// }
