import { Directive, ElementRef, Renderer2, Input, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appSizeCt]'
})
export class SizeCtDirective implements OnInit {

  lastWidth: number;
  lastHeight: number;
  destroy$: Subject<boolean> = new Subject();
  // widthChange$:Subject<void
  @Input() heightPct: number;
  @Input() widthPct: number;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.innerWidth = window.innerWidth;
    // console.log('screen size change', this.windowSrv.screenWidth);
    // this.lastWidth = this.windowSrv.screenWidth;
    // this.lastHeight = this.windowSrv.screenHeight;

    let curHeight = this.el.nativeElement.parentElement.offsetWidth;
    if (curHeight !== this.lastWidth) {
      this.fixedHeight(curHeight);
    }

    let curWidth = this.el.nativeElement.parentElement.offsetHeight;
    if (curWidth !== this.lastHeight) {
      this.fixedWidth(curWidth);
    }
  }
  constructor(private el: ElementRef, private render2: Renderer2) {

  }//constructor

  ngOnInit(): void {
    // console.log(111, 'el', this.el.nativeElement.parentElement.offsetHeight);
    this.lastWidth = this.el.nativeElement.parentElement.offsetWidth;
    this.lastHeight = this.el.nativeElement.parentElement.offsetHeight;
  }//ngOnInit

  fixedWidth(cw: number) {
    // if (this.widthPct && this.widthPct > 0) {
    //   let setw = cw * (this.widthPct / 100);
     
    //   // this.render2.setStyle(this.el.nativeElement, 'width', setw + 'px');
    // }
  }//fixedWidth

  fixedHeight(ch: number) {
    if (this.heightPct && this.heightPct > 0) {
      let seth = ch * (this.heightPct / 100);
      // console.log(seth);
      this.render2.setStyle(this.el.nativeElement, 'height', seth + 'px');
    }
  }//fixedWidth
}
