import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FileAsset } from "../../../models/fileasset";
import { ProductSpecService } from '../../../server/webapi/productSpec.service';
import { ProductSpec } from '../../../models/productspec';
import { StaticMesh } from '../../../models/staticmesh';
import { IUpload } from '../../../common/components/uploader/panel/panel.component';
import { StaticmeshService } from '../../../server/webapi/staticmesh.service';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { Material } from '../../../models/material';
import { MaterialService } from '../../../server/webapi/material.service';
import { ChartletService } from '../../../server/webapi/chartlet.service';

@Component({
  selector: 'app-product-spec-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() productSpec: ProductSpec;
  meshFiles: Array<StaticMesh> = [];
  materialFiles: Array<Material> = [];
  iconFiles: Array<FileAsset> = [];
  chartletFiles: Array<FileAsset> = [];
  fileUrl: string = `${this.configSrv.serverBase}/files/upload`;
  serverBase: string = `${this.configSrv.serverBase}`;
   staticMeshId: string;
   isMeshSatisfy: boolean;
   isMaterialSatisfy: boolean;
  constructor(private configSrv: ConfigService, private productSpeServ: ProductSpecService, private meshSrv: StaticmeshService, private snackbarSrv: SnackbarService, private translate: TranslateService, private materialSrv: MaterialService, private chartletSrv: ChartletService) {
    // this.materialFiles = [];
    // this.mes
  }

  ngOnInit() {
    let id = 'G6U786658EA398';
    this.productSpeServ.getById(id).subscribe(res => {

      console.log(111, 'get spec data', res);

      this.productSpec = res;
      //用if减少赋值次数,减少OnChange触发次数
      if (res.staticMeshes && res.staticMeshes.length)
        this.meshFiles = res.staticMeshes ? res.staticMeshes : [];
      // if (res.icon)
      //   this.iconFiles = [res.icon];
      if (res.album && res.album.length)
        this.chartletFiles = res.album;
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
    this.materialSrv.create(material).subscribe(() => {
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

  onDeleteICon() {
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
    this.chartletSrv.UploadAlbum(durl, this.productSpec.id, file.asset.id).subscribe(() => {
      this.translate.get('message.UploadSuccessfully').subscribe(msg => {
        this.snackbarSrv.simpleBar(msg);
      });
    }, err => {
      this.snackbarSrv.simpleBar(err);
    });
  }

  onDeleteChartlet(id: string) {
    let durl = 'productSpec/DeleteChartlet';
    this.chartletSrv.DeleteAlbum(durl, this.productSpec.id, id).subscribe(() => {
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
