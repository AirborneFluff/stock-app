import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { HeaderReturnButtonComponent } from './header-return-button/header-return-button.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { HeaderSubtitleComponent } from './header-subtitle/header-subtitle.component';
import { HeaderActionButtonComponent } from './header-action-button/header-action-button.component';
import {MatIconModule} from "@angular/material/icon";
import { PageTitleComponent } from './page-title/page-title.component';
import { HeaderSubContentComponent } from './header-sub-content/header-sub-content.component';



@NgModule({
  declarations: [
    PageHeaderComponent,
    HeaderReturnButtonComponent,
    HeaderTitleComponent,
    HeaderSubtitleComponent,
    HeaderActionButtonComponent,
    PageTitleComponent,
    HeaderSubContentComponent,
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
    PageTitleComponent,
    HeaderSubContentComponent
  ]
})
export class HeaderModule { }
