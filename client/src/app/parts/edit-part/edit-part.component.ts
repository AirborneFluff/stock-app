import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from "@angular/material/bottom-sheet";
import {DbService} from "../../_services/db.service";
import {Part} from "../../_data/part";

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.scss']
})
export class EditPartComponent implements OnInit {
  part!: Part;
  partForm!: FormGroup;
  constructor(private _bottomSheet: MatBottomSheet, private db: DbService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    if (!(data as Part)) return;
    this.part = data;
  }

  ngOnInit(): void {
    if (!this.part) return;
    this.initForm();
  }
  close() {
    this._bottomSheet.dismiss();
  }
  initForm() {
    this.partForm = new FormGroup({
      sku: new FormControl(this.part.sku, Validators.required),
      description: new FormControl(this.part.description, Validators.required),
      category: new FormControl(this.part.category, Validators.required),
      stockLocation: new FormControl(this.part?.stockLocation)
    })
  }

  submit() {
    if (!this.partForm.valid) return;

    this.part.sku = this.partForm.get('sku')?.value;
    this.part.description = this.partForm.get('description')?.value;
    this.part.category = this.partForm.get('category')?.value;
    this.part.stockLocation = this.partForm.get('stockLocation')?.value;

    this.db.parts.add(this.part).then(result => {
      this._bottomSheet.dismiss(result);
    });
  }

}
