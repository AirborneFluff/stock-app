import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchBarComponent} from "./search-bar.component";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchBarModule { }
