import { Injectable, TemplateRef, ComponentFactoryResolver } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { environment } from '@env/environment';
import { MatDialog, MatDialogRef } from '@angular/material';
import { IDialogOption } from '../interfaces/i-dialog-option';
import { ISimpleConfirmDialogOption } from '../interfaces/i-simple-confirm-dialog-option';
import { SimpleConfirmDialogPlateComponent } from '../components/dialog-plate/simple-confirm-dialog-plate/simple-confirm-dialog-plate.component';
import { LazyModuleConfirmDialogPlateComponent } from '../components/dialog-plate/lazy-module-confirm-dialog-plate/lazy-module-confirm-dialog-plate.component';
import { WindowService } from 'scaffold-app-core';

@Injectable()
export class DialogFactoryService {

  dialogGap = 25;
  constructor(protected dialog: MatDialog, protected windowSrv: WindowService) {

  }//constructor

  /**
   * 简单打开对话框
   * @param componentOrTemplateRef 
   * @param config 
   */
  open<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: IDialogOption): MatDialogRef<T> {
    if (!config)
      config = {};
    config.disableClose = true;

    let wd = this.windowSrv.screenWidth;
    let wh = this.windowSrv.screenHeight;

    if (!config.width)
      config.width = environment.dialogMed.width;
    if (!config.height)
      config.height = environment.dialogMed.height;
    /**
     * 根据屏幕尺寸调整对话框宽度高度数据
     * 调整规则:
     * 不管什么屏幕尺寸,对话框和屏幕直接的间隔都是25px
     * 1:以px单位的对话框,在屏幕尺寸小于对话框的宽度时候,按之前长宽比列缩放(间距为dialogGap)
     *   
     */
    let regx = new RegExp("^(([0-9]{1,}[.]?[0-9]*)|([0-9]{1,}[.]?[0-9]*px))$");
    let bPixed = regx.test(config.width);
    if (bPixed) {
      let orgw = Number.parseInt(config.width);
      let orgh = Number.parseInt(config.height);
      let curw = orgw;
      let curh = orgh;
      if (orgw >= wd) {
        curw = wd - this.dialogGap;
        config.width = curw + 'px';
      }
      if (orgh >= wh) {
        curh = (curw) / (orgw / orgh);
        config.height = (curh < wh ? curh : (wh - this.dialogGap)) + 'px';
      }
    }
    return this.dialog.open(componentOrTemplateRef, config);
  }//pureDialog

  /**
 * 模版类型对话框
 * @param title 
 * @param componentOrTemplateRef 
 * @param option 
 */
  tplsConfirm<T=any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, title?: string, option?: ISimpleConfirmDialogOption) {
    if (!title)
      title = 'tips.DeleteConfirm';
    if (!option)
      option = {};
    if (!option.height)
      option.height = environment.dialogMin.height;
    if (!option.width)
      option.width = environment.dialogMin.width;
    let data = option && option.data ? { tpls: componentOrTemplateRef, title: title, ...option.data } : { tpls: componentOrTemplateRef, title: title };
    return this.open(SimpleConfirmDialogPlateComponent, { disableClose: true, width: option && option.width ? option.width : '0', height: option && option.height ? option.height : '0', data: data });
  }//tplsConfirm

  lazyModelEntryConfirm<T=any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, componentFactoryResolver: ComponentFactoryResolver, title?: string, option?: ISimpleConfirmDialogOption) {
    if (!option)
      option = { data: {} }
    if (!option.data)
      option.data = {};
    option.data.component = componentOrTemplateRef;
    option.data.componentFactoryResolver = componentFactoryResolver;
    return this.tplsConfirm(LazyModuleConfirmDialogPlateComponent, title, option);
  }//lazyModelEntryConfirm

}
