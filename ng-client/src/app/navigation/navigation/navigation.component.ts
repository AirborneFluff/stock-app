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

  constructor(private router: Router) {}

  public get currentRoute() {
    const splitUrl = this.router.url.split('/');
    return splitUrl[1];
  }


}
