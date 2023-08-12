import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NavigationModule } from "./navigation/navigation.module";
import { PartsModule } from "./parts/parts.module";
import { HeaderModule } from "./header/header.module";
import {SettingsModule} from "./settings/settings.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    PartsModule,
    SettingsModule,
    HeaderModule,
    NavigationModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
