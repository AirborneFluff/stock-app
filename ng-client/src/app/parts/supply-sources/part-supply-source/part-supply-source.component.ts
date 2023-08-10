import {Component, Input, OnInit} from '@angular/core';
import {SupplySource} from "../../../_data/supply-source";
import {Supplier} from "../../../_data/supplier";
import {DbService} from "../../../_services/db.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AddSupplySourcePriceComponent} from "../add-supply-source-price/add-supply-source-price.component";
import {Part} from "../../../_data/part";

@Component({
  selector: 'app-part-supply-source',
  templateUrl: './part-supply-source.component.html',
  styleUrls: ['./part-supply-source.component.scss']
})
export class PartSupplySourceComponent implements OnInit {
  _supplySource!: SupplySource;
  @Input() part: Part | undefined = undefined;
  supplier: Supplier | undefined;

  @Input()
  set supplySource(val: SupplySource) {
    this._supplySource = val;
  }

  get supplySource() {
    return this._supplySource;
  }

  constructor(private db: DbService, private bottomSheet: MatBottomSheet) {
  }

  openAddPriceBottomSheet() {
    this.bottomSheet.open(AddSupplySourcePriceComponent).afterDismissed().subscribe(result => {
      this.supplySource.prices.push(result);
      this.updatePart();
    });
  }

  ngOnInit(): void {
    this.db.suppliers.find(this.supplySource.supplierId).then(supplier => {
      if (!supplier) return;
      this.supplier = supplier;
    })
  }

  updatePart() {
    if (!this.part) return;
    const index = this.part?.supplySources.indexOf(this._supplySource);
    console.log(index)
    if (index == -1 || index == undefined) return;

    this.db.parts.add(this.part);
  }
}
