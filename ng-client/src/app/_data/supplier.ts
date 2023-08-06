import {BaseEntity} from "./base-entity";

export interface Supplier extends BaseEntity {
  id: string,
  name: string,
  website: string
}
