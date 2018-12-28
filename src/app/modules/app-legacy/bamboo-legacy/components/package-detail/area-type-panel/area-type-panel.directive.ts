import { Directive, Input, EventEmitter, Output, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPackageAreaTypePanel]'
})
export class AreaTypePanelDirective {

  @Input() fid: string;
  @Output() onSelected: EventEmitter<string> = new EventEmitter();
  @HostListener('click')
  onClick() {
    this.seleteMe();
    this.onSelected.next(this.fid);
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }//constructor

  clearSelected() {
    this.renderer.removeClass(this.el.nativeElement, 'item-selected');
  }//

  seleteMe() {
    this.renderer.addClass(this.el.nativeElement, 'item-selected');
  }//seleteMe
}
