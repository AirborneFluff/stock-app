import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header-action-button',
  templateUrl: './header-action-button.component.html',
  styleUrls: ['./header-action-button.component.scss']
})
export class HeaderActionButtonComponent {
  @Input() svgSize: 'sm' | 'md' | 'lg' = 'md';

}
