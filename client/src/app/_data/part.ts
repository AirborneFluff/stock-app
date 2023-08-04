import {SupplySource} from "./supply-source";
import {BaseEntity} from "./base-entity";
import {StockLevel} from "./stock-level";

export interface Part extends BaseEntity {
  sku: string,
  description: string,
  category: string,
  supplySources: SupplySource[],
  stockLevels: StockLevel[]
}
