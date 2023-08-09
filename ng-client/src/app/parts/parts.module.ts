import { NgModule } from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import { PartsListComponent } from './parts-list/parts-list.component';
import { HeaderModule } from "../header/header.module";
import { AddNewPartComponent } from './add-new-part/add-new-part.component';
import {SearchBarModule} from "../search-bar/search-bar.module";
import {RouterLink} from "@angular/router";
import { PartsListItemComponent } from './parts-list-item/parts-list-item.component';
import { PartDetailComponent } from './part-detail/part-detail.component';
import { PartStockListComponent } from './part-stock-list/part-stock-list.component';
import { AddPartStockLevelComponent } from './add-part-stock-level/add-part-stock-level.component';
import { SharedModule} from "../shared/shared.module";
import { DialogModule } from "../dialog/dialog.module"



@NgModule({
  declarations: [
    PartsListComponent,
    AddNewPartComponent,
    PartsListItemComponent,
    PartDetailComponent,
    PartStockListComponent,
    AddPartStockLevelComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    SearchBarModule,
    NgForOf,
    RouterLink,
    SharedModule,
    DialogModule
  ],
  exports: [
    PartsListComponent
  ]
})
export class PartsModule { }
