import {Component, Input, OnInit} from '@angular/core';
import {Part} from "../../../_data/part";
import {DbService} from "../../../_services/db.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AddSupplySourceComponent} from "../add-supply-source/add-supply-source.component";

@Component({
  selector: 'app-part-supply-source-list',
  templateUrl: './part-supply-source-list.component.html',
  styleUrls: ['./part-supply-source-list.component.scss']
})
export class PartSupplySourceListComponent implements OnInit {
  @Input() part: Part | undefined = undefined;


  constructor(private db: DbService, private bottomSheet: MatBottomSheet) {
  }

  openAddSupplySourceBottomSheet() {
    this.bottomSheet.open(AddSupplySourceComponent).afterDismissed().subscribe(result => {
      if (!result) return;
      if (!this.part) return;
      this.part.supplySources.push(result);
      this.db.parts.add(this.part);
    });
  }

  ngOnInit(): void {
  }
}
