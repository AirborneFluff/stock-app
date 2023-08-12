import { Component } from '@angular/core';
import seedPartData from '../../../ng-client/src/assets/seed-data-parts.json'
import {DbService} from "./_services/db.service";
import {StockLevel} from "./_data/stock-level";
import {Part} from "./_data/part";
import {LoadingService} from "./_services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-client';
  dataLoaded = false;

  constructor(private db: DbService, public loading: LoadingService) {}
  ngOnInit(): void {}
}
