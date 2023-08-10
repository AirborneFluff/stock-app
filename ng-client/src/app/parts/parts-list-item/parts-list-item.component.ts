import {Component, Input} from '@angular/core';
import {Part} from "../../_data/part";

@Component({
  selector: 'app-parts-list-item',
  templateUrl: './parts-list-item.component.html',
  styleUrls: ['./parts-list-item.component.scss']
})
export class PartsListItemComponent {
  @Input() part: Part | undefined = undefined;
}
