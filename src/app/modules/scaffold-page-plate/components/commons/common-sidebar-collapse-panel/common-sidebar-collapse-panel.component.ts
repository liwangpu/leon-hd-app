import { Component, OnInit, AfterViewInit, TemplateRef, Input, QueryList, ElementRef, ViewChildren, Renderer2 } from '@angular/core';

@Component({
  selector: 'page-plate-common-sidebar-collapse-panel',
  templateUrl: './common-sidebar-collapse-panel.component.html',
  styleUrls: ['./common-sidebar-collapse-panel.component.scss']
})
export class CommonSidebarCollapsePanelComponent implements OnInit, AfterViewInit {

  @Input() panels: Array<{ title: string, panel: TemplateRef<any> }> = [];
  @ViewChildren('contentCt') contentCts: QueryList<ElementRef>;
  constructor(protected renderer2: Renderer2) { }

  ngOnInit() {
  }

  collapse(curContent: Element) {
    if (this.contentCts.length <= 1) return;

    this.contentCts.forEach(ele => {
      this.renderer2.removeClass(ele.nativeElement, 'actived');
    });
    this.renderer2.addClass(curContent, 'actived');
  }//collapse

  ngAfterViewInit(): void {
    if (this.contentCts.length > 0) {
      let defaultEle = this.contentCts.toArray()[0];
      this.renderer2.addClass(defaultEle.nativeElement, 'actived');
    }
  }//ngAfterViewInit

}
