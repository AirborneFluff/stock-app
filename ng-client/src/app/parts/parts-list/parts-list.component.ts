import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AddNewPartComponent} from "../add-new-part/add-new-part.component";
import {DbService} from "../../_services/db.service";
import {Part} from "../../_data/part";
import {PaginationParams} from "../../_models/pagination-params";
import {PageEvent} from "@angular/material/paginator";
import {LoadingService} from "../../_services/loading.service";

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.scss']
})
export class PartsListComponent implements OnInit {
  hideExtraDetails: boolean = false;
  parts: Part[] = [];
  pagination: PaginationParams = {
    length: 0, pageIndex: 0, pageSize: 25, previousPageIndex: 0
  }
  searchTerm: string = '';
  constructor(private _bottomSheet: MatBottomSheet, private db: DbService, private loading: LoadingService) {}

  openBottomSheet(): void {
    this._bottomSheet.open(AddNewPartComponent).afterDismissed().subscribe(x => {
      if (!x) return;
      this.parts.push(x);
    });
  }

  ngOnInit(): void {
    this.updatePartsList();
  }

  searchParts(term: string) {
    if (term.length >= 3) {
      this.searchTerm = term;
    }
    if (term.length < 3) {
      this.searchTerm = '';
    }
    this.updatePartsList();
  }

  updatePartsList() {
    let predicate = undefined;
    if (this.searchTerm) {
      predicate = (x: Part) => {
        const descriptionMatch = x.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
        const skuMatch = x.sku?.toLowerCase().includes(this.searchTerm.toLowerCase());
        const locationMatch = x.stockLocation?.toLowerCase().includes(this.searchTerm.toLowerCase());
        const categoryMatch = x.category?.toLowerCase().includes(this.searchTerm.toLowerCase());
        return descriptionMatch || skuMatch || locationMatch || categoryMatch;
      }
    }
    if (!predicate) predicate = (() => true);
    this.loading.start();
    this.db.parts.getPaginatedList(predicate, this.pagination).then(result => {
      this.parts = result.items;
    }).finally(() => {
      this.loading.stop();
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.length = e.length;
    this.pagination.pageSize = e.pageSize;
    this.pagination.pageIndex = e.pageIndex;
    this.updatePartsList();
  }

  handleHideExtras(event: boolean) {
    this.hideExtraDetails = event;
  }
}
