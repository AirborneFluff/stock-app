import {SupplySource} from "./supply-source";
import {BaseEntity} from "./base-entity";

export interface Part extends BaseEntity {
  sku: string,
  description: string,
  category: string,
  supplySources: SupplySource[]
}
