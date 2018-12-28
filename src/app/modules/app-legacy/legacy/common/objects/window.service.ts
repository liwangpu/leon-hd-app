import { Injectable } from '@angular/core';

/**
 * global window service
 */
@Injectable()
export class WindowService {

  constructor() {

  }//constructor

  /**
   * 获取window实例
   */
  get nativeWindow(): any {
    return getWindow();
  }//nativeWindow

  /**
   * 获取屏幕宽度
   */
  get screenWidth(): number {
    let windowObj = this.nativeWindow;
    return windowObj.innerWidth;
  }//screenWidth

  /**
   * 获取屏幕高度
   */
  get screenHeight(): number {
    let windowObj = this.nativeWindow;
    return windowObj.innerHeight;
  }//screenHeight
}


function getWindow(): any {
  return window;
}
