import {Component, OnInit} from '@angular/core';
import {DbService} from "../../../_services/db.service";
import {Part} from "../../../_data/part";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PartAddComponent} from "../part-add/part-add.component";
@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.css']
})
export class PartsListComponent implements OnInit {
  parts: Part[] = [];

  constructor(public db: DbService, private bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
    this.db.parts.where(() => true, 50).then(result => {
      this.parts = result;
    })
  }

  openAddPartSheet() {
    this.bottomSheet.open(PartAddComponent);
  }

  searchParts(term: string) {
    if (term.length < 3) {
      this.getParts();
      return;
    }
    this.db.parts.where(x => {
      return x.description.toLowerCase().includes(term.toLowerCase());
    }, 50).then(results => {
      this.parts = results;
    })
  }

  getParts(pageNumber: number = 0) {
    this.db.parts.where(() => true, 50).then(result => {
      this.parts = result;
    })
  }
}
