import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { PartsListComponent } from "./parts/parts-list/parts-list.component";
import {SettingsPageComponent} from "./settings/settings-page/settings-page.component";

const routes: Routes = [
  { path: '', redirectTo: 'parts', pathMatch: 'full' },
  { path: 'parts', component: PartsListComponent  },
  { path: 'settings', component: SettingsPageComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
