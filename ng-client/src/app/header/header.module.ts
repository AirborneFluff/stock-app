import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { HeaderReturnButtonComponent } from './header-return-button/header-return-button.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { HeaderSubtitleComponent } from './header-subtitle/header-subtitle.component';
import { HeaderActionButtonComponent } from './header-action-button/header-action-button.component';
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    PageHeaderComponent,
    HeaderReturnButtonComponent,
    HeaderTitleComponent,
    HeaderSubtitleComponent,
    HeaderActionButtonComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    PageHeaderComponent,
    HeaderReturnButtonComponent,
    HeaderTitleComponent,
    HeaderSubtitleComponent,
    HeaderActionButtonComponent,
  ]
})
export class HeaderModule { }
