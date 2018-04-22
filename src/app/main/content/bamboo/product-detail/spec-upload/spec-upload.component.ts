import { Component, OnInit, AfterContentInit, Input, Output, Inject } from '@angular/core';
import { ConfigService } from "../../../../toolkit/config/config.service";
import { FileAsset } from "../../../../toolkit/models/fileasset";
import { ProductSpecService } from '../../../../toolkit/server/webapi/productSpec.service';
import { ProductSpec } from '../../../../toolkit/models/productspec';
import { StaticMesh } from '../../../../toolkit/models/staticmesh';
import { IUpload } from '../../../../toolkit/common/components/uploader/panel/panel.component';
import { StaticmeshService } from '../../../../toolkit/server/webapi/staticmesh.service';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { Material } from '../../../../toolkit/models/material';
import { MaterialService } from '../../../../toolkit/server/webapi/material.service';
import { ChartletService } from '../../../../toolkit/server/webapi/chartlet.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-spec-upload',
  templateUrl: './spec-upload.component.html',
  styleUrls: ['./spec-upload.component.scss']
})
export class SpecUploadComponent implements OnInit {
  productSpec: ProductSpec = new ProductSpec();
  meshFiles: Array<StaticMesh> = [];
  materialFiles: Array<Material> = [];
  iconFiles: Array<FileAsset> = [];
  chartletFiles: Array<FileAsset> = [];
  fileUrl: string = `${this.configSrv.serverBase}/files/upload`;
  serverBase: string = `${this.configSrv.serverBase}`;
  private staticMeshId: string;
  private isMeshSatisfy: boolean;
  private isMaterialSatisfy: boolean;
  constructor(private configSrv: ConfigService, private productSpeServ: ProductSpecService, private meshSrv: StaticmeshService, private snackbarSrv: SnackbarService, private translate: TranslateService, private materialSrv: MaterialService, private chartletSrv: ChartletService, @Inject(MAT_DIALOG_DATA) private data: any) {
    // this.materialFiles = [];
    // this.mes
    console.log(111, 'get product spec id', this.data.productSpecId);
    this.productSpec.id = this.data.productSpecId;
  }

  ngOnInit() {
    // let id = 'G6U786658EA398';
    this.productSpeServ.getById(this.productSpec.id).subscribe(res => {

      console.log(111, 'get spec data', res);

      this.productSpec = res;
      //用if减少赋值次数,减少OnChange触发次数
      if (res.staticMeshes && res.staticMeshes.length)
        this.meshFiles = res.staticMeshes ? res.staticMeshes : [];
      // if (res.icon)
      //   this.iconFiles = [res.icon];
      if (res.charlets && res.charlets.length)
        this.chartletFiles = res.charlets;
      if (this.meshFiles.length) {
        this.staticMeshId = this.meshFiles[0].id;
        this.meshSrv.getById(this.staticMeshId).subscribe(mas => {
          this.materialFiles = mas.materials ? mas.materials : [];
        });
      }
    });
  }//ngOnInit

  /**
   * 模型文件上传完整
   */
  onMeshSatisfy() {
    this.isMeshSatisfy = true;
  }

  /**
   * 模型文件上传不完整
   */
  onMeshNotSatisfy() {
    this.isMeshSatisfy = false;
  }

  onMaterialSatisfy() {
    this.isMaterialSatisfy = true;
    console.log(111, 'material file satisfy');
  }
  /**
   * 上传模型
   * @param file 
   */
  onUploadMesh(file: IUpload) {
    let mesh = file.asset as StaticMesh;
    mesh.fileAssetId = file.asset.id;
    mesh.id = '';
    mesh.productSpecId = this.productSpec.id;
    mesh.name = file.fileName;
    this.meshSrv.create(mesh).subscribe(ass => {
      this.staticMeshId = ass.id;
      this.translate.get('message.UploadSuccessfully', { value: file.fileName }).subscribe((msg) => {
        this.snackbarSrv.simpleBar(msg);
      })
    });
  }//onUploadMess

  /**
   * 删除模型
   * @param id 
   */
  onDeleteMesh(id: string) {
    this.meshSrv.delete(id).subscribe(() => {
      this.translate.get('message.DeleteSuccessfully').subscribe(msg => {
        this.snackbarSrv.simpleBar(msg);
      });
    }, err => {
      this.snackbarSrv.simpleBar(err);
    });
  }//onDeleteMesh

  /**
   * 上传材质
   * @param file 
   */
  onUploadMaterial(file: IUpload) {
    let material = file.asset as Material;
    material.fileAssetId = file.asset.id;
    material.id = '';
    material.staticMeshId = this.staticMeshId;
    material.name = file.fileName;
    this.materialSrv.create(material).subscribe(ass => {
      this.translate.get('message.UploadSuccessfully', { value: file.fileName }).subscribe((msg) => {
        this.snackbarSrv.simpleBar(msg);
      })
    });
  }//onUploadMaterial

  /**
   * 删除材质
   * @param id 
   */
  onDeleteMaterial(id: string) {
    this.materialSrv.delete(id).subscribe(() => {
      this.translate.get('message.DeleteSuccessfully').subscribe(msg => {
        this.snackbarSrv.simpleBar(msg);
      });
    }, err => {
      this.snackbarSrv.simpleBar(err);
    });
  }//onDeleteMaterial

  onUploadICon(file: IUpload) {
    let durl = 'productSpec/ChangeICon';
    this.chartletSrv.UploadICon(durl, this.productSpec.id, file.asset.id).subscribe(() => {
      this.translate.get('message.UploadSuccessfully').subscribe(msg => {
        this.snackbarSrv.simpleBar(msg);
      });
    }, err => {
      this.snackbarSrv.simpleBar(err);
    });
  }//onUploadICon

  onDeleteICon(id: string) {
    let durl = 'productSpec/ChangeICon';
    this.chartletSrv.UploadICon(durl, this.productSpec.id, '').subscribe(() => {
      this.translate.get('message.DeleteSuccessfully').subscribe(msg => {
        this.snackbarSrv.simpleBar(msg);
      });
    }, err => {
      this.snackbarSrv.simpleBar(err);
    });
  }//onDeleteICon

  onUploadChartlet(file: IUpload) {
    let durl = 'productSpec/UploadChartlet';
    this.chartletSrv.UploadChartlet(durl, this.productSpec.id, file.asset.id).subscribe(() => {
      this.translate.get('message.UploadSuccessfully').subscribe(msg => {
        this.snackbarSrv.simpleBar(msg);
      });
    }, err => {
      this.snackbarSrv.simpleBar(err);
    });
  }

  onDeleteChartlet(id: string) {
    let durl = 'productSpec/DeleteChartlet';
    this.chartletSrv.DeleteChartlet(durl, this.productSpec.id, id).subscribe(() => {
      this.translate.get('message.DeleteSuccessfully').subscribe(msg => {
        this.snackbarSrv.simpleBar(msg);
      });
    }, err => {
      this.snackbarSrv.simpleBar(err);
    });
  }

  onUploadError(fileName: string) {
    console.log(555, 'file upload error:', fileName);
  }//onUploadError
}