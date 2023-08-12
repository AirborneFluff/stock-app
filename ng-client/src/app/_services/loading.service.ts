import { Injectable } from '@angular/core';
import {ReplaySubject} from "rxjs";
import {Supplier} from "../_data/supplier";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSource = new ReplaySubject<boolean>(1);
  loading$ = this.loadingSource.asObservable();

  constructor() {
    this.loadingSource.next(false);
  }

  public start() {
    this.loadingSource.next(true);
  }

  public stop() {
    this.loadingSource.next(false);
  }
}
