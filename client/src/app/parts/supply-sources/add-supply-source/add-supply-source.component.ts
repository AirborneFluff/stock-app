import {Component, OnInit, ViewChild} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DbService} from "../../../_services/db.service";
import {Supplier} from "../../../_data/supplier";
import {RequireMatch} from "../../../_validators/requiredMatch";
import {ReplaySubject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddSupplierComponent} from "../add-supplier/add-supplier.component";
import {SupplySource} from "../../../_data/supply-source";

@Component({
  selector: 'app-add-supply-source',
  templateUrl: './add-supply-source.component.html',
  styleUrls: ['./add-supply-source.component.scss']
})
export class AddSupplySourceComponent implements OnInit {
  supplySourceForm!: FormGroup;
  private supplierSource = new ReplaySubject<Supplier[]>(1);
  suppliers$ = this.supplierSource.asObservable();
  constructor(private _bottomSheet: MatBottomSheet, public db: DbService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
    this.updateSuppliers();
  }
  updateSuppliers() {
    this.db.suppliers.where(() => true).then(result => {
      this.supplierSource.next(result);
    })
  }
  close() {
    this._bottomSheet.dismiss();
  }
  initForm() {
    this.supplySourceForm = new FormGroup({
      supplier: new FormControl(null, [Validators.required, RequireMatch]),
      sku: new FormControl(null, Validators.required),
      manufacturerSku: new FormControl(null)
    })
  }

  displayWith(supplier: Supplier): string {
    return supplier?.name;
  }

  openSupplierDialog() {
    const dialogRef = this.dialog.open(AddSupplierComponent, {
      data: this.supplySourceForm.get('supplier')?.value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.updateSuppliers();
      this.supplySourceForm.get('supplier')?.setValue(result)
    });
  }

  submit() {
    if (!this.supplySourceForm.valid) return;
    this._bottomSheet.dismiss({
      manufacturerSKU: this.supplySourceForm.get('manufacturerSku')?.value,
      prices: [],
      supplierId: this.supplySourceForm.get('supplier')?.value?.id,
      supplierSKU: this.supplySourceForm.get('sku')?.value
    });
  }

}
