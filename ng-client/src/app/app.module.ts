import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationModule } from "./navigation/navigation.module";
import { PartsModule } from "./parts/parts.module";
import { HeaderModule } from "./header/header.module";
import {SettingsModule} from "./settings/settings.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PartsModule,
    SettingsModule,
    HeaderModule,
    NavigationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
