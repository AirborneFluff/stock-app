import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
})
export class SharedModule { }
