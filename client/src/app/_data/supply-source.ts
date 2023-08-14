import {BaseEntity} from "./base-entity";
import {PriceBreak} from "./price-break";

export interface SupplySource {
  supplierId: string,
  supplierSKU: string,
  manufacturerSKU: string,
  prices: PriceBreak[];
}
