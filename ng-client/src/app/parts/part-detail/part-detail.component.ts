import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class PartDetailComponent implements OnInit, OnDestroy{
  readonly _pageStateOwner: string = 'parts-detail-component';
  part!: Part;
  tabIndex: number = 0;

  constructor(private route: ActivatedRoute, public db: DbService, public loading: LoadingService, private pageState: PageStateService){}

  ngOnInit(): void {
    const tabIndex = this.pageState.retreiveProperty(this._pageStateOwner, 'tabIndex');
    if (tabIndex) this.tabIndex = tabIndex;
    this.loading.start();
    setTimeout(() => this.getPart())
  }

  ngOnDestroy(): void {
    this.pageState.storeProperty(this._pageStateOwner,'tabIndex', this.tabIndex);
  }

  getPart() {
    const urlParam = this.route.snapshot.paramMap.get("partId");
    if (!urlParam) return;

    this.db.parts.find(urlParam).then(result => {
      if (!result) return;
      this.part = result;
    }).finally(() => {
      this.loading.stop();
    })
  }
}
