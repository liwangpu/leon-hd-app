import { Iasset } from "./iasset";
import { EntityBase } from "./entitybase";
export class Material extends EntityBase implements Iasset {
    folderId: string;
    categoryId: string;
    description: string;
    icon: string;
    iconAssetId: string;
    createTime: string;
    modifyTime: string;
    /// <summary>
    /// 原始文件路径
    /// </summary>
    url: string;
    /// <summary>
    /// 原始文件md5
    /// </summary>
    md5: string
    /// <summary>
    /// 文件大小
    /// </summary>
    size: number;
    /// <summary>
    /// 扩展名，比如.jpg, .png, .fbx
    /// </summary>
    fileExt: string;
    /// <summary>
    /// 原始文件上传时本地路径
    /// </summary>
    localPath: string;
    /// <summary>
    /// 资源上传时间
    /// </summary>
    uploadTime: string;
    staticMeshId: string;
    fileAssetId: string;
}
