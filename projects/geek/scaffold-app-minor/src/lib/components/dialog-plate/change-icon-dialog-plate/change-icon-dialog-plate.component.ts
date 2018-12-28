import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ConfirmDialogBase } from '../../../objects/confirm-dialog-base';
import { HttpHeaders } from '@angular/common/http';
import { Path } from '@geek/scaffold-app-core';

@Component({
  selector: 'app-change-icon-dialog-plate',
  templateUrl: './change-icon-dialog-plate.component.html',
  styleUrls: ['./change-icon-dialog-plate.component.scss']
})
export class ChangeIconDialogPlateComponent extends ConfirmDialogBase implements OnInit, OnDestroy {
  iconUrl: string = '#';
  manageButtons = [
    { icon: 'open_in_browser', name: 'button.Select', onClick: () => { this.selectICon(); } }
  ];
  @ViewChild('fileInputCt') fileInputCt: ElementRef;
  constructor() {
    super();
  }//constructor

  ngOnInit() {
    super.ngOnInit();
    this.satisfyConfirm$.next(false);
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

  onFileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.iconUrl = e.target.result;
        this.satisfyConfirm$.next(true);
      };
    }
    else
      this.satisfyConfirm$.next(false);
  }//onFileChange

  clearFile() {
    this.fileInputCt.nativeElement.value = '';
  }//clearFile

  selectICon() {
    this.clearFile();
    this.fileInputCt.nativeElement.click();
  }//selectICon

  getIconFormData(): { formData: FormData, header: HttpHeaders } {
    let fileBrowser = this.fileInputCt.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      let formData = new FormData();
      let file = fileBrowser.files[0];
      let header = new HttpHeaders({
        "fileExt": Path.getFileExtension(file.name)
      });
      formData.append("file", file);
      return { formData: formData, header: header };
    }

    return { formData: null, header: null };
  }//getIconFormData

}

