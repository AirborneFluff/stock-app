import {Component, Input} from '@angular/core';
import {Part} from "../../../_data/part";
import {StockLevel} from "../../../_data/stock-level";

@Component({
  selector: 'app-part-stock',
  templateUrl: './part-stock.component.html',
  styleUrls: ['./part-stock.component.css']
})
export class PartStockComponent {
  private _part: Part | undefined = undefined;
  @Input()
  set part(value: Part | undefined) {
    this._part = value;
    if (!this._part) return;

    this._part.stockLevels.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    })
  }
  get part() {
    return this._part;
  }

  public get currentStockLevel(): number {
    if (!this.part) return -1;

    return this.part.stockLevels[0].quantity;
  }

}
