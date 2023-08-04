import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DEFAULT_CONFIG, NgForageOptions, Driver } from 'ngforage';
import { PartsListComponent } from './components/parts/parts-list/parts-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PartDetailComponent } from './components/parts/part-detail/part-detail.component';
import { PartStockComponent } from './components/parts/part-stock/part-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    PartsListComponent,
    NavigationComponent,
    PartDetailComponent,
    PartStockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    {
      provide: DEFAULT_CONFIG,
      useValue: {
        name: 'StockApp',
        driver: [
          Driver.INDEXED_DB,
          Driver.LOCAL_STORAGE
        ]
      } as NgForageOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }