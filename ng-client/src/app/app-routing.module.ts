import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { PartsListComponent } from "./parts/parts-list/parts-list.component";

const routes: Routes = [
  { path: '', component: PartsListComponent },
  { path: 'parts', component: PartsListComponent  },
  { path: 'orders', component: AppComponent },
  { path: 'reports', component: AppComponent  },
  { path: 'settings', component: AppComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
