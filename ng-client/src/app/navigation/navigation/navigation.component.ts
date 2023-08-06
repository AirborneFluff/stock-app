import { Component } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  currentRoute: 'parts' | 'orders' | 'reports' | 'settings' = 'parts';

  constructor(router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe((val: any) => {
      this.currentRoute = val.url.substring(1);
    })
  }


}
