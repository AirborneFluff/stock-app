import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import {HeaderModule} from "../header/header.module";
import {SearchBarModule} from "../search-bar/search-bar.module";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    SearchBarModule,
    MatButtonModule
  ],
  exports: [
    SettingsPageComponent
  ]
})
export class SettingsModule { }
