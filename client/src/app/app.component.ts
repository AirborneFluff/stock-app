import { Component, OnInit } from '@angular/core';
import { DbService } from "./_services/db.service";
import seedPartData from '../assets/seed-data-parts.json'
import {Part} from "./_data/part";
import {StockLevel} from "./_data/stock-level";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  dataLoaded = false;

  constructor(private db: DbService) {}
  ngOnInit(): void {
    this.seedData().then(() => {
      this.dataLoaded = true;
    })
    // this.db.parts.firstOrDefault(() => true).then(result => {
    //   if (result) {
    //     this.dataLoaded = true;
    //     return;
    //   }
    //   this.seedData().then(() => {
    //     this.dataLoaded = true;
    //   })
    // });
  }

  seedData() {
    return new Promise((resolve) => {
      this.db.parts.clearData().then(() => {
        let tasks: any = [];
        seedPartData.forEach(part => {
          let stockLevels: StockLevel[] = [];
          part.stockLevels.forEach(val => {
            stockLevels.push({
              quantity: val.quantity,
              date: new Date(val.date)})
            })
          const newPart: Part = {
            category: part.category,
            description: part.description,
            id: part.id,
            sku: part.sku,
            stockLevels: stockLevels,
            supplySources: []

          }
          tasks.push(this.db.parts.add(newPart));
        })

        Promise.all(tasks).then(() => {
          resolve(true);
        });
      });
    })
  }
}
