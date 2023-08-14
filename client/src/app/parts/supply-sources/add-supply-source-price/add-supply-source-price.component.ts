import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatBottomSheet} from "@angular/material/bottom-sheet";
import {PriceBreak} from "../../../_data/price-break";

@Component({
  selector: 'app-add-supply-source-price',
  templateUrl: './add-supply-source-price.component.html',
  styleUrls: ['./add-supply-source-price.component.scss']
})
export class AddSupplySourcePriceComponent implements OnInit {
  priceBreakForm!: FormGroup;
  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
    this.initForm();
  }
  close() {
    this._bottomSheet.dismiss();
  }
  initForm() {
    this.priceBreakForm = new FormGroup({
      unitCost: new FormControl(null, [Validators.required, Validators.min(0)]),
      quantity: new FormControl(1, [Validators.required, Validators.min(0)])
    })
  }

  submit() {
    if (!this.priceBreakForm.valid) return;

    const priceBreak: PriceBreak = {
      unitCost: this.priceBreakForm.get('unitCost')?.value,
      quantity: this.priceBreakForm.get('quantity')?.value
    }

    this._bottomSheet.dismiss(priceBreak);
  }

}

