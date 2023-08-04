import {Component, OnInit} from '@angular/core';
import {DbService} from "../../../_services/db.service";
import {Part} from "../../../_data/part";
@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.css']
})
export class PartsListComponent implements OnInit {
  parts: Part[] = [];

  constructor(public db: DbService) {}

  ngOnInit(): void {
    this.db.parts.where(() => true, 50).then(result => {
      this.parts = result;
    })
  }

  getRelatedEntity(part: Part) {
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

    protected readonly console = console;
}
