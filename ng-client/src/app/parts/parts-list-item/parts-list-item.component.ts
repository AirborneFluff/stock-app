import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';
import {Part} from "../../_data/part";

@Component({
  selector: 'app-parts-list-item',
  templateUrl: './parts-list-item.component.html',
  styleUrls: ['./parts-list-item.component.scss']
})
export class PartsListItemComponent {
  @Input() part: Part | undefined = undefined
  @Input() hideExtras: boolean = false;
  @Output() extrasOverflow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('extraContainer') extraContainer!: ElementRef;


  get stockLevel(){
    if (!this.part) return null;
    if (!this.part.stockLevels.length) return null;
    this.part.stockLevels.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    })
    return this.part.stockLevels[0].quantity;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkContainerSize();
  }

  ngOnInit() {
    this.checkContainerSize();
  }

  checkContainerSize() {
    if (this.extraContainer) {
      const element = this.extraContainer.nativeElement
      const elementRect = element.getBoundingClientRect();
      if (elementRect.width < element.scrollWidth) {
        this.extrasOverflow.emit(true);
        return;
      }

      this.extrasOverflow.emit(false);
    }
  }
}
