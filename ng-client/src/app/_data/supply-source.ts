import {BaseEntity} from "./base-entity";

export interface SupplySource extends BaseEntity {
  id: string,
  supplierId: string,
  supplierSKU: string,
  manufacturerSKU: string,
  prices: [value: number, minimumQuantity: number];
}
