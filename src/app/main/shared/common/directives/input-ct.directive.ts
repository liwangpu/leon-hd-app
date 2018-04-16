import { Directive, OnInit, Output, Input, EventEmitter, HostListener, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[dmzInputCt]'
})
export class InputCtDirective implements OnInit, AfterViewInit {
  @Input() ctIndentity: string;
  @Output() OnCtInit: EventEmitter<IInputCtData> = new EventEmitter();
  @Output() OnCtChange: EventEmitter<IInputCtData> = new EventEmitter();
  @HostListener('change') onCtChange() {
    this.OnCtChange.emit({ ctIndentity: this.ctIndentity, ctValue: this.el.nativeElement.value });
  }

  constructor(private el: ElementRef) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.OnCtInit.emit({ ctIndentity: this.ctIndentity, ctValue: this.el.nativeElement.value });
  }

}

export interface IInputCtData {
  ctValue: any;
  ctIndentity?: string;
}
