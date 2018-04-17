import { Iasset } from "./iasset";
export class Material implements Iasset {
    folderId: string;
    categoryId: string;
    description: string;
    icon: string;
    createTime: string;
    modifyTime: string;
    id: string;
    name: string;
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
