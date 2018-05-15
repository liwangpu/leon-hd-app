import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLitimgTool]'
})
export class LitimgToolDirective {
  @Input() id: string;
  private activeClass = 'shared-litimg-tool-actived';
  constructor(private el: ElementRef, private render2: Renderer2) {

  }

  active() {
    this.render2.addClass(this.el.nativeElement, this.activeClass);
  }

  reset() {
    this.render2.removeClass(this.el.nativeElement, this.activeClass);
  }

}

