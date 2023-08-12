import {PaginationParams} from "./pagination-params";

export interface PaginatedList<T> {
  params: PaginationParams,
  items: T[]
}
