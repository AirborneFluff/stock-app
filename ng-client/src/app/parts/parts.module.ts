import { NgModule } from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import { PartsListComponent } from './parts-list/parts-list.component';
import { HeaderModule } from "../header/header.module";
import { AddNewPartComponent } from './add-new-part/add-new-part.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {SearchBarModule} from "../search-bar/search-bar.module";
import {RouterLink} from "@angular/router";
import { PartsListItemComponent } from './parts-list-item/parts-list-item.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    PartsListComponent,
    AddNewPartComponent,
    PartsListItemComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MatBottomSheetModule,
    SearchBarModule,
    NgForOf,
    RouterLink,
    MatListModule,
    NgForOf,
    MatIconModule
  ],
  exports: [
    PartsListComponent
  ]
})
export class PartsModule { }
