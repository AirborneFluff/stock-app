import { Component } from '@angular/core';
import seedPartData from '../../../ng-client/src/assets/seed-data-parts.json'
import {DbService} from "./_services/db.service";
import {StockLevel} from "./_data/stock-level";
import {Part} from "./_data/part";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-client';
  dataLoaded = false;

  constructor(private db: DbService) {}
  ngOnInit(): void {
    return;
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
            supplySources: [],
            stockLocation: part.stockLocation
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
