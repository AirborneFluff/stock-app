import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DbService} from "../../../_services/db.service";

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {
  supplierForm!: FormGroup;
  nameInitial: string | null = null;
  constructor(public dialogRef: MatDialogRef<AddSupplierComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private db: DbService) {
    this.nameInitial = data;
    console.log(data)
  }

  ngOnInit(): void {
    this.initForm();
  }
  close() {
    this.dialogRef.close();
  }
  initForm() {
    console.log(this.nameInitial)
    this.supplierForm = new FormGroup({
      name: new FormControl(this.nameInitial, Validators.required),
      website: new FormControl(null)
    })
  }

  submit() {
    if (!this.supplierForm.valid) return;

    this.db.suppliers.add({
      id: "",
      name: this.supplierForm.get('name')?.value,
      website: this.supplierForm.get('website')?.value
    }).then(result => {
      this.dialogRef.close(result);
    }).catch(() => {
      this.dialogRef.close();
    })
  }
}
