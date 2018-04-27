import { Directive, ElementRef, HostListener, Renderer2, EventEmitter, Output, Input } from '@angular/core';

@Directive({
  selector: '[appProductCategoryItem]'
})
export class CategoryItemDirective {
  @Input() id: string;
  @Output() onSelected: EventEmitter<string> = new EventEmitter();
  @HostListener('click') onClick() {
    this.renderer.addClass(this.el.nativeElement, 'category-item-actived');
    this.onSelected.next(this.id);
    this.selected = true;
  }
  private selected: boolean;
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  reset() {
    if (this.selected) {
      this.renderer.removeClass(this.el.nativeElement, 'category-item-actived');
      this.selected = false;
    }
  }

}
