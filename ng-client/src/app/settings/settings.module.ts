import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import {HeaderModule} from "../header/header.module";



@NgModule({
  declarations: [
    SettingsPageComponent
  ],
    imports: [
        CommonModule,
        HeaderModule
    ],
  exports: [
    SettingsPageComponent
  ]
})
export class SettingsModule { }
