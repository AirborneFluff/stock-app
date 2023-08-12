import { Component } from '@angular/core';
import {Part} from "../../_data/part";
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../../_services/db.service";
import {LoadingService} from "../../_services/loading.service";
import {PageStateService} from "../../_services/page-state.service";

@Component({
  selector: 'app-part-detail',
  templateUrl: './part-detail.component.html',
  styleUrls: ['./part-detail.component.scss']
})
export class PartDetailComponent {
  readonly _pageStateOwner: string = 'parts-detail-component';
  partExists: boolean = true;
  part!: Part;
  _tabIndex: number = 0;

  set tabIndex(val: number) {
    this.pageState.storeProperty(this._pageStateOwner,'tabIndex', val);
    this._tabIndex = val;
  }

  get tabIndex(){
    return this._tabIndex;
  }

  constructor(private route: ActivatedRoute, public db: DbService, public loading: LoadingService, private pageState: PageStateService){}

  ngOnInit(): void {
    this._tabIndex = this.pageState.retreiveProperty(this._pageStateOwner, 'tabIndex');
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
