import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../../../_services/db.service";
import {Part} from "../../../_data/part";

@Component({
  selector: 'app-part-detail',
  templateUrl: './part-detail.component.html',
  styleUrls: ['./part-detail.component.css']
})
export class PartDetailComponent {
  partExists: boolean = true;
  part!: Part;
  currentTab: 'stock' | 'sources' | 'past-orders' = 'stock';

  constructor(private route: ActivatedRoute, public db: DbService){}

  ngOnInit(): void {
    this.getPart()?.then(result => {
      if (!result) {
        this.partExists = false;
        return;
      }
      console.log(result)
      this.part = result;
    }).catch(err => {
      this.partExists = false;
    })
  }

  getPart() {
    const urlParam = this.route.snapshot.paramMap.get("partId");
    if (!urlParam) return;

    return this.db.parts.find(urlParam);
  }

}
