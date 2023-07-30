import { Component, OnInit } from '@angular/core';
import { DbService } from "./_services/db.service";
import seedPartData from '../assets/seed-data-parts.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private db: DbService) {}
  ngOnInit(): void {
    this.db.parts.firstOrDefault(() => true).then(result => {
      if (result == undefined) this.seedData();
    });
  }

  seedData() {
    this.db.parts.clearData().then(() => {
      seedPartData.forEach(part => {
        this.db.parts.add(part);
      })
    });
  }
}
