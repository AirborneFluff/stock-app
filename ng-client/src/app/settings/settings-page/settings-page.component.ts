import { Component } from '@angular/core';
import {DbService} from "../../_services/db.service";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {

  constructor(private db: DbService) {}

  clearStoredData() {
    this.db.parts.clearData();
    this.db.suppliers.clearData();
  }

  seedDatabase() {
    this.db.useSeedData();
  }

}
