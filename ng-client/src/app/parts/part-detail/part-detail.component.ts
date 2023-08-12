import { Component } from '@angular/core';
import {Part} from "../../_data/part";
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../../_services/db.service";
import {LoadingService} from "../../_services/loading.service";

@Component({
  selector: 'app-part-detail',
  templateUrl: './part-detail.component.html',
  styleUrls: ['./part-detail.component.scss']
})
export class PartDetailComponent {
  partExists: boolean = true;
  part!: Part;

  constructor(private route: ActivatedRoute, public db: DbService, public loading: LoadingService){}

  ngOnInit(): void {
    this.loading.start();
    this.getPart()?.then(result => {
      if (!result) {
        return;
      }
      this.part = result;
    }).catch(err => {
      this.partExists = false;
    }).finally(() => {

      this.loading.stop();
    })
  }

  getPart() {
    const urlParam = this.route.snapshot.paramMap.get("partId");
    if (!urlParam) return;

    return this.db.parts.find(urlParam);
  }

}
