import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AddNewPartComponent} from "../add-new-part/add-new-part.component";
import {DbService} from "../../_services/db.service";
import {Part} from "../../_data/part";

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.scss']
})
export class PartsListComponent implements OnInit {
  parts: Part[] = [];
  constructor(private _bottomSheet: MatBottomSheet, private db: DbService) {}

  openBottomSheet(): void {
    this._bottomSheet.open(AddNewPartComponent).afterDismissed().subscribe(x => {
      if (!x) return;
      this.parts.push(x);
    });
  }

  ngOnInit(): void {
    this.db.parts.where(() => true, 50).then(result => {
      this.parts = result;
    })
  }

  searchParts(term: string) {
    if (term.length < 3) {
      this.getParts();
      return;
    }
    this.db.parts.where(x => {
      const descriptionMatch = x.description.toLowerCase().includes(term.toLowerCase());
      const skuMatch = x.sku.toLowerCase().includes(term.toLowerCase());
      const locationMatch = x.stockLocation.toLowerCase().includes(term.toLowerCase());
      const categoryMatch = x.category.toLowerCase().includes(term.toLowerCase());
      return descriptionMatch || skuMatch || locationMatch || categoryMatch;
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