import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { WindowService } from '../object/window.service';
import { ConfigService } from '../../config/config.service';
import { SimpleMessageContentComponent } from './dialog-template/simple-message-content/simple-message-content.component';
import { SimpleConfirmDialogTplsComponent } from './dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { SimpleCsvUploadComponent } from './dialog-template/simple-csv-upload/simple-csv-upload.component';
import { environment } from "../../../../../environments/environment";
@Injectable()
export class DialogFactoryService {

  dialogGap = 25;
  constructor(protected dialog: MatDialog, protected windowSrv: WindowService, protected configSrv: ConfigService) {

  }//constructor

  /**
   * 简单打开对话框
   * @param componentOrTemplateRef 
   * @param config 
   */
  open<T, D = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T> {
    let wd = this.windowSrv.screenWidth;
    let wh = this.windowSrv.screenHeight;

    if (!config.width)
      config.width = this.configSrv.dialog_med.width;
    if (!config.height)
      config.height = this.configSrv.dialog_med.height;
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
   * 简单确认对话框
   * @param content 
   * @param title 
   * @param option 
   */
  simpleConfirm(content: string, title?: string, option?: simpleConfirmOption) {
    if (!option)
      option = {};
    if (!option.height)
      option.height = '250px';
    if (!option.width)
      option.width = '400px';
    option.data = { content: content };
    return this.tplsConfirm(SimpleMessageContentComponent, title ? title : 'tips.DeleteConfirm', option);
  }//simpleConfirm

  /**
   * 模版类型对话框
   * @param title 
   * @param componentOrTemplateRef 
   * @param option 
   */
  tplsConfirm<T=any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, title?: string, option?: simpleConfirmOption) {
    if (!title)
      title = 'tips.DeleteConfirm';
    if (!option)
      option = {};
    if (!option.height)
      option.height = environment.dialogMin.height;
    if (!option.width)
      option.width = environment.dialogMin.width;

    let data = option && option.data ? { tpls: componentOrTemplateRef, title: title, ...option.data } : { tpls: componentOrTemplateRef, title: title };
    return this.open(SimpleConfirmDialogTplsComponent, { disableClose: true, width: option && option.width ? option.width : '0', height: option && option.height ? option.height : '0', data: data });
  }//tplsConfirm

  /**
   * 简单CSV上传
   * @param title 
   * @param option 
   */
  simpleCsvUpload(title: string, option: SimpleCsvUploadOption) {
    option.data = { uploadUrl: option.uploadUrl, templateCsvUrl: option.templateCsvUrl };
    return this.tplsConfirm(SimpleCsvUploadComponent, title, option);
  }//simpleCsvUpload

}

/**
 * 简单对话框参数
 */
interface simpleConfirmOption {
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  data?: Object;
  [propName: string]: any;
}

interface SimpleCsvUploadOption extends simpleConfirmOption {
  uploadUrl: string;
  templateCsvUrl: string;
}
