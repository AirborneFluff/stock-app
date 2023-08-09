import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ConfirmDialogComponent
  ]
})
export class DialogModule { }
