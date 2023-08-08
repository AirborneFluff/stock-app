import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Part} from "../../_data/part";
import {DbService} from "../../_services/db.service";

@Component({
  selector: 'app-add-new-part',
  templateUrl: './add-new-part.component.html',
  styleUrls: ['./add-new-part.component.scss']
})
export class AddNewPartComponent implements OnInit {
  partForm!: FormGroup;
  constructor(private _bottomSheet: MatBottomSheet, private db: DbService) {}

  ngOnInit(): void {
    this.initForm();
  }
  close() {
    this._bottomSheet.dismiss();
  }
  initForm() {
    this.partForm = new FormGroup({
      sku: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      stockLocation: new FormControl(),
      stockLevel: new FormControl(null, Validators.pattern("^[0-9]*$"))
    })
  }

  submit() {
    if (!this.partForm.valid) return;

    const newPart: Part = {
      id: "", stockLevels: [], supplySources: [],
      sku: this.partForm.get('sku')?.value,
      description: this.partForm.get('description')?.value,
      category: this.partForm.get('category')?.value,
      stockLocation: this.partForm.get('stockLocation')?.value,
    }

    const stockLevel = this.partForm.get('stockLevel')?.value;
    if (stockLevel) {
      newPart.stockLevels.push({
        date: new Date(),
        quantity: stockLevel
      })
    }

    this.db.parts.add(newPart).then(result => {
      this._bottomSheet.dismiss(result);
    });
  }

}
