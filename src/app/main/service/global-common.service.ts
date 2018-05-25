import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * 全局通用服务,用于提供一些通用操作
 * 使用该服务一定要注意:
 * 在页面的destroy请自行取消订阅
 */
@Injectable()
export class GlobalCommonService {

  keyworkSearch$: Subject<string> = new Subject();//按关键字搜索
  constructor() { }

}
