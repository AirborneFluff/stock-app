import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PartsListComponent} from "./components/parts/parts-list/parts-list.component";
import {PartDetailComponent} from "./components/parts/part-detail/part-detail.component";

const routes: Routes = [
  { path: '', component: PartsListComponent },
  { path: 'parts', component: PartsListComponent },
  { path: 'parts/:partId', component: PartDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
