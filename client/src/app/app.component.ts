import { Component, OnInit } from '@angular/core';
import { DataService } from "./_services/data.service";
import seedPartData from '../assets/seed-data-parts.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private db: DataService) {}
  ngOnInit(): void {
    // this.seedData();

    this.db.parts.firstOrDefault(x => {
      return Number(x.sku) > 1400;
    }).then(result => console.log(result));

    this.db.parts.where(x => {
      return x.category == 'Outdoors';
    }).then(x => {
      console.log(x);
    });

  }

  seedData() {
    this.db.parts.clearData().then(() => {
      seedPartData.forEach(part => {
        this.db.parts.setItem(part);
      })
    });

  }
}
