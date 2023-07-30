import {Component, OnInit} from '@angular/core';
import {DbService} from "../../../_services/db.service";
import {KeyValue} from "@angular/common";
import {Part} from "../../../_data/part";

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.css']
})
export class PartsListComponent implements OnInit {
  parts: KeyValue<string, Part>[] = [];

  constructor(private db: DbService) {}

  ngOnInit(): void {
    this.db.parts.where(() => true, 10).then(result => {
      this.parts = result;
    })
  }

}
