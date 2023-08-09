import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure you want to do this?';
  @Input() confirmText: string = 'Yes';
  @Input() cancelText: string = 'Cancel';
  @Input() confirmColor: ThemePalette = undefined;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = !data?.title ? this.title : data.title;
    this.message = !data?.message ? this.message : data.message;
    this.confirmText = !data?.confirmText ? this.confirmText : data.confirmText;
    this.cancelText = !data?.cancelText ? this.cancelText : data.cancelText;
    this.confirmColor = !data?.confirmColor ? this.confirmColor : data.confirmColor;
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
