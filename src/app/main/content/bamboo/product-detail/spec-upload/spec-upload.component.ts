import { Component, OnInit, Inject } from '@angular/core';
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
import {  MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-product-detail-spec-upload',
  templateUrl: './spec-upload.component.html',
  styleUrls: ['./spec-upload.component.scss']
})
export class SpecUploadComponent implements OnInit {
  isCharletChange: boolean;
  productSpec: ProductSpec = new ProductSpec();
  meshFiles: Array<StaticMesh> = [];
  materialFiles: Array<Material> = [];
  iconFiles: Array<FileAsset> = [];
  chartletFiles: Array<FileAsset> = [];
  latestChartlet: FileAsset;//最新的贴图
  fileUrl: string;
  serverBase: string;
  staticMeshId: string;
  isMeshSatisfy: boolean;
  isMaterialSatisfy: boolean;
  constructor(private configSrv: ConfigService, private productSpeServ: ProductSpecService, private meshSrv: StaticmeshService, private snackbarSrv: SnackbarService, private translate: TranslateService, private materialSrv: MaterialService, private chartletSrv: ChartletService, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.productSpec.id = this.data.productSpecId;
    this.serverBase = this.configSrv.serverBase;
    this.fileUrl = this.configSrv.serverBase + "/files/UploadFormFile";
  }

  ngOnInit() {
    this.productSpeServ.getById(this.productSpec.id).subscribe(res => {
      this.productSpec = res;
      //用if减少赋值次数,减少OnChange触发次数
      if (res.staticMeshes && res.staticMeshes.length)
        this.meshFiles = res.staticMeshes ? res.staticMeshes : [];
      if (res.iconAsset)
        this.iconFiles = [res.iconAsset];
      if (res.album && res.album.length)
        this.chartletFiles = res.album;
      if (this.meshFiles && this.meshFiles.length) {
        this.staticMeshId = this.meshFiles[0].id;
        this.materialFiles = this.meshFiles[0].materials ? this.meshFiles[0].materials : [];
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
  }
  /**
   * 上传模型
   * @param file 
   */
  onUploadMesh(file: IUpload) {
    let mesh = file.asset as StaticMesh;
    mesh.fileAssetId = file.asset.id;
    mesh.id = '';
    //TODO:实体里面移除了这儿字段,需要验证这个字段是否在别的地方使用
    // mesh.productSpecId = this.productSpec.id;
    mesh.name = file.fileName;
    let updateMeshAsync = () => {
      return new Promise((resolve, reject) => {
        this.meshSrv.update(mesh).subscribe(resMesh => {
          this.staticMeshId = resMesh.id;
          resMesh.fileAssetId = file.asset.id;
          resolve(resMesh);
        }, err => {
          reject(err);
        });
      });//Promise
    };//updateMeshAsync

    let updateSpecAsync = (resMesh) => {
      return new Promise((resolve, reject) => {
        this.productSpeServ.uploadMesh({ productSpecId: this.productSpec.id, staticMeshId: resMesh.id }).subscribe(() => {
          resolve({ k: 'message.UploadSuccessfully' });
        }, err => {
          reject({ k: 'message.OperationError', v: err });
        });
      });//Promise 
    };//updateSpecAsync

    let transAsync = (msgObj: { k: string, v: string }) => {
      return new Promise((resolve, reject) => {
        this.translate.get(msgObj.k, msgObj.v).subscribe(msg => {
          resolve(msg);
        });
      });//Promise 
    };//transAsync

    updateMeshAsync().then(updateSpecAsync).then(transAsync).then((msg: string) => {
      this.snackbarSrv.simpleBar(msg);
    });


  }//onUploadMess

  /**
   * 删除模型
   * @param id 
   */
  onDeleteMesh(id: string) {
    let deleteSpecMeshAsync = () => {
      return new Promise((resolve, reject) => {
        this.productSpeServ.deleteMesh({ productSpecId: this.productSpec.id, staticMeshId: id }).subscribe(() => {
          resolve({ k: 'message.UploadSuccessfully' });
        }, err => {
          reject({ k: 'message.OperationError', v: err });
        });
      });
    };//deleteSpecMeshAsync

    let transAsync = (msgObj: { k: string, v: string }) => {
      return new Promise((resolve, reject) => {
        this.translate.get(msgObj.k, msgObj.v).subscribe(msg => {
          resolve(msg);
        });
      });//Promise 
    };//transAsync

    deleteSpecMeshAsync().then(transAsync).then((msg: string) => {
      this.snackbarSrv.simpleBar(msg);
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

    let uploadMaterialAsync = () => {
      return new Promise((resolve, reject) => {
        this.materialSrv.create(material).subscribe(resMaterial => {
          resolve(resMaterial);
        }, err => {
          reject(err);
        });
      });
    };//uploadMaterialAsync

    let updateMaterialAsync = (resMaterial) => {
      return new Promise((resolve, reject) => {
        this.productSpeServ.uploadMaterial({ productSpecId: this.productSpec.id, materialId: resMaterial.id, staticMeshId: this.staticMeshId }).subscribe(() => {
          resolve({ k: 'message.UploadSuccessfully' });
        }, err => {
          reject({ k: 'message.OperationError', v: err });
        });
      });//Promise 
    };//updateMaterialAsync


    let transAsync = (msgObj: { k: string, v: string }) => {
      return new Promise((resolve, reject) => {
        this.translate.get(msgObj.k, msgObj.v).subscribe(msg => {
          resolve(msg);
        });
      });//Promise 
    };//transAsync

    uploadMaterialAsync().then(updateMaterialAsync).then(transAsync).then((msg: string) => {
      this.snackbarSrv.simpleBar(msg);
    });
  }//onUploadMaterial

  /**
   * 删除材质
   * @param id 
   */
  onDeleteMaterial(id: string) {

    let deleteMaterialAsync = () => {
      return new Promise((resolve, reject) => {
        this.productSpeServ.deleteMaterial({ productSpecId: this.productSpec.id, materialId: id, staticMeshId: this.staticMeshId }).subscribe(() => {
          resolve({ k: 'message.UploadSuccessfully' });
        }, err => {
          reject({ k: 'message.OperationError', v: err });
        });
      });//Promise 
    };//deleteMaterialAsync

    let transAsync = (msgObj: { k: string, v: string }) => {
      return new Promise((resolve, reject) => {
        this.translate.get(msgObj.k, msgObj.v).subscribe(msg => {
          resolve(msg);
        });
      });//Promise 
    };//transAsync

    deleteMaterialAsync().then(transAsync).then((msg: string) => {
      this.snackbarSrv.simpleBar(msg);
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
    let durl = 'productSpec/UploadAlbum';
    this.chartletSrv.UploadAlbum(durl, this.productSpec.id, file.asset.id).subscribe((resData) => {
      this.translate.get('message.UploadSuccessfully').subscribe(msg => {
        this.snackbarSrv.simpleBar(msg);
        this.isCharletChange = true;
        this.latestChartlet = file.asset;
      });
    }, err => {
      this.snackbarSrv.simpleBar(err);
    });
  }

  onDeleteChartlet(id: string) {
    let durl = 'productSpec/DeleteAlbum';
    this.chartletSrv.DeleteAlbum(durl, this.productSpec.id, id).subscribe(() => {
      this.translate.get('message.DeleteSuccessfully').subscribe(msg => {
        this.snackbarSrv.simpleBar(msg);
        this.isCharletChange = true;
      });
    }, err => {
      this.snackbarSrv.simpleBar(err);
    });
  }

  onUploadError(fileName: string) {
    console.log(555, 'file upload error:', fileName);
  }//onUploadError
}
