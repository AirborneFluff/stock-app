import {Component, OnDestroy} from '@angular/core';
import {Part} from "../../_data/part";
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../../_services/db.service";
import {LoadingService} from "../../_services/loading.service";
import {PageStateService} from "../../_services/page-state.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {EditPartComponent} from "../edit-part/edit-part.component";

@Component({
  selector: 'app-part-detail',
  templateUrl: './part-detail.component.html',
  styleUrls: ['./part-detail.component.scss']
})
export class PartDetailComponent implements OnDestroy {
  readonly _pageStateOwner: string = 'parts-detail-component';
  part!: Part;
  tabIndex: number = 0;

  constructor(private route: ActivatedRoute, public db: DbService, public loading: LoadingService, private pageState: PageStateService, private bottomSheet: MatBottomSheet) {
    const tabIndex = this.pageState.retreiveProperty(this._pageStateOwner, 'tabIndex');
    if (tabIndex) this.tabIndex = tabIndex;
    this.getPart();
  }

  ngOnDestroy(): void {
    this.pageState.storeProperty(this._pageStateOwner,'tabIndex', this.tabIndex);
  }

  openEditPart() {
    this.bottomSheet.open(EditPartComponent, {
      data: this.part
    })
  }

  getPart() {
    const urlParam = this.route.snapshot.paramMap.get("partId");
    if (!urlParam) return;

    this.loading.start();
    this.db.parts.find(urlParam).then(result => {
      if (!result) return;
      this.part = result;
    }).finally(() => {
      this.loading.stop();
    })
  }
}
