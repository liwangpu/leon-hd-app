import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLitimgCt]'
})
export class LitimgCtDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this._onFocusIn();
    this.onFocus.emit(this.id);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.onFocusOut.emit(this.id);
    this._onFocusOut();
    // if (!this.selected)
    //   this.reset();
  }

  @HostListener('click') onClick() {
    this.active();
    this.onSelect.emit(this.id);
    this.selected = true;
  }
  @Input() id: string;
  @Output() onSelect: EventEmitter<string> = new EventEmitter();
  @Output() onFocus: EventEmitter<string> = new EventEmitter();
  @Output() onFocusOut: EventEmitter<string> = new EventEmitter();
  private selected: boolean;
  private activeClass = 'shared-litimg-ct-actived';
  private focusClass = 'shared-litimg-ct-focus';
  constructor(private el: ElementRef, private render2: Renderer2) {

  }

  private _onFocusIn() {
    this.render2.addClass(this.el.nativeElement, this.focusClass);
  }

  private _onFocusOut() {
    this.render2.removeClass(this.el.nativeElement, this.focusClass);
  }


  active() {
    this.render2.addClass(this.el.nativeElement, this.activeClass);
  }

  reset() {
    this.render2.removeClass(this.el.nativeElement, this.activeClass);
    this.selected = false;
  }

}
