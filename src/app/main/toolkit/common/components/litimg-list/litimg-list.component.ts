import { Component, OnInit, Input, Output, AfterViewInit, ViewChildren, QueryList, EventEmitter } from '@angular/core';
//class interface ..
import { Ilitimg } from "../../interfaces/ilitimg";
import { LitimgCtDirective } from '../../directives/litimg-ct.directive';
import { LitimgToolDirective } from '../../directives/litimg-tool.directive';
import { DialogService } from '../../services/dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../services/snackbar.service';
@Component({
  selector: 'app-litimg-list',
  templateUrl: './litimg-list.component.html',
  styleUrls: ['./litimg-list.component.css']
})
export class LitimgListComponent implements OnInit, AfterViewInit {

  @ViewChildren(LitimgCtDirective) litCts: QueryList<LitimgCtDirective>;
  @ViewChildren(LitimgToolDirective) litTools: QueryList<LitimgToolDirective>;
  @Input() imgs: Array<Ilitimg>;//
  @Input() imgSize: number = 80;
  @Input() isEdit: boolean;
  @Output() onSelect: EventEmitter<string> = new EventEmitter();
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onCopy: EventEmitter<string> = new EventEmitter();
  private selectedId: string;
  private seed: number = 0;
  private saved: boolean = true;
  private blankId = "---";
  private NglitIds = [];
  constructor(private dialogSrv: DialogService, private translate: TranslateService, private snackbarSrv: SnackbarService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    if (this.imgs && this.imgs.length > 0) {
      let sid = this.imgs[0].id;
      this.activeLit(sid);
      this.selectedId = sid;
      this.onSelect.emit(this.transLitId(sid));
    }
  }
  /**
   * 激活选中的缩略图信息
   * @param id 
   */
  private activeLit(id?: string) {
    if (!this.litCts || this.litCts.length <= 0) return;
    this.litCts.forEach((it) => {
      if (it.id === id)
        it.active();
      else
        it.reset();
    });
  }

  /**
   * 激活缩略图工具栏
   * @param id 
   */
  private activeLitTool(id: string) {
    if (!id || !this.litTools || this.litTools.length <= 0) return;
    this.litTools.forEach((it) => {
      if (it.id === id)
        it.active();
      else
        it.reset();
    });
  }

  update(lit: Ilitimg) {
    for (let idx = 0, len = this.imgs.length; idx < len; idx++) {
      if (this.imgs[idx].id === this.selectedId) {
        this.imgs[idx] = lit;
        this.selectedId = lit.id;
        break;
      }
    }
    this.saved = true;
  }

  _onSelected(id: string) {
    this.activeLit(id);
    this.selectedId = id;
    this.onSelect.emit(this.transLitId(id));
  }//onSelected

  _onFocus(id: string) {
    this.activeLitTool(id);
  }//onFocus


  _onFocusOut() {
    this.activeLitTool(this.blankId);
  }//onFocusOut

  _onDelete(id: string) {
    this.translate.get('message.DeleteConfirm', { value: this.getLitName(id) })
      .subscribe(msg => {
        let dialog = this.dialogSrv.confirmDialog(msg);
        dialog.afterClosed().subscribe(() => {
          if (dialog.componentInstance.isConfirm) {
            this.onDelete.emit(id);
            this.imgs = this.imgs.filter(it => it.id !== id);
            if (id === this.selectedId) {
              this.saved = true;
            }
          }
        });
      });
  }//onDelete

  _onAdd() {
    if (!this.saved) {
      //提示未提交
      this.translate.get('message.Cannot_Add_Cuz_UnSaving').subscribe(msg => {
        this.snackbarSrv.simpleBar(msg);
      });
      return;
    }
    this.seed += 1;
    let nid = `additem${this.seed}`;
    this.imgs.push({ id: nid, name: '正在编辑' });
    this.NglitIds.push(nid);
    //延迟等待render渲染
    setTimeout(() => {
      this.activeLit(nid);
      this.onSelect.emit(this.transLitId(nid));
    }, 300);
    this.saved = false;
    this.selectedId = nid;
  }//_onAdd

  _onCopy(id: string) {
    this.translate.get('message.CopyConfirm', { value: this.getLitName(id) })
      .subscribe(msg => {
        let dialog = this.dialogSrv.confirmDialog(msg);
        dialog.afterClosed().subscribe(() => {
          if (dialog.componentInstance.isConfirm) {
            this.onCopy.emit(id);
          }
        });
      });
  }//_onCopy

  private getLitName(id: string) {
    for (let idx = 0, len = this.imgs.length; idx < len; idx++) {
      if (this.imgs[idx].id === id) {
        return this.imgs[idx].name ? this.imgs[idx].name : '';
      }
    }
  }//getLitName

  private transLitId(id?: string) {
    if (!id || this.blankId === id) {
      return "";
    }
    for (let item of this.NglitIds) {
      if (item === id)
        return '';
    }
    return id;
  }

}
