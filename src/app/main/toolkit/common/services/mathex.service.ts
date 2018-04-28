import { Injectable } from '@angular/core';

@Injectable()
export class MathexService {

  constructor() {

  }

  /**
   * 获取数组的最大值
   * @param array 
   */
  arrayMax(array) {
    return array.reduce(function (a, b) {
      return Math.max(a, b);
    });
  }//arrayMax

  /**
   * 获取数组的最小值
   * @param array 
   */
  arrayMin(array) {
    return array.reduce(function (a, b) {
      return Math.min(a, b);
    });
  }//arrayMin
}
