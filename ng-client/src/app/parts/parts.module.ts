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
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";



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
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  exports: [
    PartsListComponent
  ]
})
export class PartsModule { }
