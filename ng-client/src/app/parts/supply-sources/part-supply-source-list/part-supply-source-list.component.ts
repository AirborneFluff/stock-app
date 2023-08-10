import {Component, Input} from '@angular/core';
import {Part} from "../../../_data/part";

@Component({
  selector: 'app-part-supply-source-list',
  templateUrl: './part-supply-source-list.component.html',
  styleUrls: ['./part-supply-source-list.component.scss']
})
export class PartSupplySourceListComponent {
  @Input() part: Part | undefined = undefined;

  protected readonly undefined = undefined;
}
