import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from "@angular/material/bottom-sheet";
import {DbService} from "../../_services/db.service";
import {Part} from "../../_data/part";
import {StockLevel} from "../../_data/stock-level";

@Component({
  selector: 'app-add-part-stock-level',
  templateUrl: './add-part-stock-level.component.html',
  styleUrls: ['./add-part-stock-level.component.scss']
})
export class AddPartStockLevelComponent implements OnInit {
  stockLevelForm!: FormGroup;
  constructor(private _bottomSheet: MatBottomSheet, private db: DbService, @Inject(MAT_BOTTOM_SHEET_DATA) public part: Part) {}

  ngOnInit(): void {
    this.initForm();
  }
  close() {
    this._bottomSheet.dismiss();
  }
  initForm() {
    this.stockLevelForm = new FormGroup({
      quantity: new FormControl(null, Validators.required),
      date: new FormControl(new Date(), Validators.required)
    })
  }

  submit() {
    if (!this.stockLevelForm.valid) return;

    const stockLevel: StockLevel = {
      quantity: this.stockLevelForm.get('quantity')?.value,
      date: this.stockLevelForm.get('date')?.value
    }

    this.part.stockLevels.push(stockLevel);

    this.db.parts.add(this.part).then(result => {
      this._bottomSheet.dismiss(result);
    })
  }

}
