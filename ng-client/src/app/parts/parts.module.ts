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
import { DialogModule } from "../dialog/dialog.module";
import { PartSupplySourceListComponent } from './supply-sources/part-supply-source-list/part-supply-source-list.component';
import { PartSupplySourceComponent } from './supply-sources/part-supply-source/part-supply-source.component';
import { AddSupplySourcePriceComponent } from './supply-sources/add-supply-source-price/add-supply-source-price.component';
import { AddSupplySourceComponent } from './supply-sources/add-supply-source/add-supply-source.component';
import { AddSupplierComponent } from './supply-sources/add-supplier/add-supplier.component';
import { SupplySourcePlaceholderComponent } from './supply-sources/supply-source-placeholder/supply-source-placeholder.component'



@NgModule({
  declarations: [
    PartsListComponent,
    AddNewPartComponent,
    PartsListItemComponent,
    PartDetailComponent,
    PartStockListComponent,
    AddPartStockLevelComponent,
    PartSupplySourceListComponent,
    PartSupplySourceComponent,
    AddSupplySourcePriceComponent,
    AddSupplySourceComponent,
    AddSupplierComponent,
    SupplySourcePlaceholderComponent
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
