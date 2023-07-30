import {SupplySource} from "./supply-source";

export interface Part {
  sku: string,
  description: string,
  category: string,
  supplySources: SupplySource[]
}
