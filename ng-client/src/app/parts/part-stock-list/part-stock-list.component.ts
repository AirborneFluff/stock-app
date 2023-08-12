import {Component, Input} from '@angular/core';
import {Part} from "../../_data/part";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {DbService} from "../../_services/db.service";
import {AddNewPartComponent} from "../add-new-part/add-new-part.component";
import {AddPartStockLevelComponent} from "../add-part-stock-level/add-part-stock-level.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {StockLevel} from "../../_data/stock-level";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoadingService} from "../../_services/loading.service";

@Component({
  selector: 'app-part-stock-list',
  templateUrl: './part-stock-list.component.html',
  styleUrls: ['./part-stock-list.component.scss']
})
export class PartStockListComponent {
  private _part: Part | undefined = undefined;

  constructor(private _bottomSheet: MatBottomSheet, private db: DbService, private dialog: MatDialog, private snackBar: MatSnackBar, public loading: LoadingService) {}

  openBottomSheet(): void {
    this._bottomSheet.open(AddPartStockLevelComponent, { data: this.part }).afterDismissed().subscribe(x => {
      if (!x) return;
      this.part = x;
    });
  }

  openDeleteDialog(entry: StockLevel): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data:  {
        title: "Delete stock entry?",
        message: "Are you sure you want to remove this entry?",
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmColor: 'warn'
      }
    });
    ref.afterClosed().subscribe(val => {
      if (!val) return;
      this.removeStockEntry(entry);
    });
  }
  @Input()
  set part(value: Part | undefined) {
    this._part = value;
    if (!this._part) return;
    if (!this._part.stockLevels) return;
    this._part.stockLevels.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    })
  }
  get part() {
    return this._part;
  }

  public get currentStockLevel(): number {
    if (!this.part) return -1;
    if (!this.part.stockLevels.length) return -1;

    return this.part.stockLevels[0].quantity;
  }

  removeStockEntry(entry: StockLevel) {
    if (!this.part) return;
    if (!this.part.stockLevels) return; // Should never happen if dialog responded

    const index = this.part.stockLevels.indexOf(entry);
    this.part.stockLevels.splice(index, 1);

    this.db.parts.add(this.part).then(result => {
      this.snackBar.open('Stock entry deleted', 'Undo', {
        duration: 3000
      }).onAction().subscribe(() => {
        this.part?.stockLevels.push(entry);
        this.part = this._part; // Force part setter to sort list
      });
    }).catch(x => {
      this.snackBar.open(x);
    })
  }


}
