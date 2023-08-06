import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartsListComponent } from './parts-list/parts-list.component';
import { HeaderModule } from "../header/header.module";
import { AddNewPartComponent } from './add-new-part/add-new-part.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';



@NgModule({
  declarations: [
    PartsListComponent,
    AddNewPartComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MatBottomSheetModule
  ],
  exports: [
    PartsListComponent
  ]
})
export class PartsModule { }
