export interface SupplySource {
  supplierUUID: string,
  supplierSKU: string,
  manufacturerSKU: string,
  prices: [value: number, minimumQuantity: number];
}
