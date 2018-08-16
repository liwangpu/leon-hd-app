import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { EventListener } from '../../../../../node_modules/@angular/core/src/debug/debug_node';

export class OEditBaseComponent implements OnInit {

  detailForm: FormGroup;
  afterSave: EventEmitter<{ parentId: string, id: string, oldId: string, value: string }> = new EventEmitter();
  currentNode: { parentId: string, id: string, value: string }
  constructor(protected formBuilder: FormBuilder) {

    this.detailForm = this.formBuilder.group({
      parentId: [''],
      oldId: [''],
      value: ['', [Validators.required]],
      nodeType: [''],
      uuid: [''],
      nameTranslateKey: ['', [Validators.required]],
      icon: [''],
      url: [''],
      permission: ['']
    });

  }//constructor

  ngOnInit() {
    this.refreshData(this.currentNode);
  }//ngOnInit

  submit() {
    let data = this.detailForm.value;
    data['id'] = `${data.nodeType}@${data.uuid}||${data.nameTranslateKey}||${data.icon}||${data.url}||${data.permission}`;
    this.afterSave.next(data);
    this.refreshData(data);
  }//submit

  refreshData(data: { parentId: string, id: string, value: string }) {
    this.detailForm.reset();

    let model = {};
    if (data && data.id) {
      let arr = data.id.split('||');
      //解析id
      if (arr.length >= 1) {
        let gidArr = arr[0].split('@');
        model['nodeType'] = gidArr[0];
        model['uuid'] = gidArr[1];
      }
      //解析name translate Key
      if (arr.length >= 2) {
        model['nameTranslateKey'] = arr[1] != ' ' ? arr[1] : '';
      }
      //解析icon
      if (arr.length >= 3) {
        model['icon'] = arr[2] != ' ' ? arr[2] : '';
      }
      //解析url
      if (arr.length >= 4) {
        model['url'] = arr[3] != ' ' ? arr[3] : '';
      }
      //解析权限点
      if (arr.length >= 5) {
        model['permission'] = arr[4] != ' ' ? arr[4] : '';
      }
    }

    if (data) {
      model['oldId'] = data.id;
      model['value'] = data.value;
      model['parentId'] = data.parentId;
    }

    this.detailForm.patchValue(model);
    return model;
  }//refreshData

}
