import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PartsListComponent} from "./components/parts/parts-list/parts-list.component";

const routes: Routes = [
  { path: '', component: PartsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
