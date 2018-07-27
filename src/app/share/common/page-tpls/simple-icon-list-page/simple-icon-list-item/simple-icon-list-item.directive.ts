import { Directive, Output, EventEmitter, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSimpleIconListItem]'
})
export class SimpleIconListItemDirective {

  seleted = false;
  @Output() selectedChange = new EventEmitter<boolean>();
  @HostListener('click')
  onClick() {
    this.seleted = !this.seleted;
    if (this.seleted)
      this.seleteMe();
    else
      this.clearSelected();
    this.selectedChange.next(this.seleted);
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }//constructor

  clearSelected() {
    this.seleted = false;
    this.renderer.removeClass(this.el.nativeElement, 'item-selected');
  }//

  seleteMe() {
    this.renderer.addClass(this.el.nativeElement, 'item-selected');
  }//seleteMe

}
